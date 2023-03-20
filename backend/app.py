from flask import Flask, jsonify, abort, request
from flask_cors import CORS
import boto3
import pandas as pd
import os
from pprint import pprint

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


def rename_columns(df):
    df.rename(
        columns={
            "team_market.x": "team_name",
        },
        inplace=True,
    )
    return df


def get_data():
    AWS_S3_BUCKET = os.environ.get("AWS_S3_BUCKET")
    AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
    ENVIRONMENT = os.environ.get("ENVIRONMENT")

    if ENVIRONMENT == "dev":
        data = {}
        mens_2020 = pd.read_csv("data/dashboard_mens_2020.csv")
        mens_2021 = pd.read_csv("data/dashboard_mens_2021.csv")
        mens_2022 = pd.read_csv("data/dashboard_mens_2022.csv")
        womens_2020 = pd.read_csv("data/dashboard_womens_2020.csv")
        womens_2021 = pd.read_csv("data/dashboard_womens_2021.csv")
        womens_2022 = pd.read_csv("data/dashboard_womens_2022.csv")
        data["dashboard_mens_2020"] = mens_2020
        data["dashboard_mens_2021"] = mens_2021
        data["dashboard_mens_2022"] = mens_2022
        data["dashboard_womens_2020"] = womens_2020
        data["dashboard_womens_2021"] = womens_2021
        data["dashboard_womens_2022"] = womens_2022
        for key, df in data.items():
            df = rename_columns(df)

        return data

    else:
        s3_client = boto3.client(
            "s3",
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        )
        try:
            objects = s3_client.list_objects_v2(Bucket=AWS_S3_BUCKET)[
                "Contents"
            ]

            # read each CSV file into a pandas DataFrame and store it in a dictionary
            dataframes = {}
            for obj in objects:
                # get the object key (file path) for the CSV file
                file_path = obj["Key"]

                # get a unique name for the DataFrame based on the file path
                df_name = file_path.split("/")[-1].split(".")[0]

                # read the CSV file into a pandas DataFrame
                if df_name != "sample_results":
                    obj = s3_client.get_object(
                        Bucket=AWS_S3_BUCKET, Key=file_path
                    )
                    df = pd.read_csv(obj["Body"])
                    rename_columns(df)

                    # add the DataFrame to the dictionary with the unique name as the key
                    dataframes[df_name] = df

            return dataframes

        except Exception as e:
            print(e, "Ooooppsss something happened")


@app.route("/")
def hello_world():
    return "<p>Welcome to boost dashboard</p>"


# get products and add products
@app.route("/api/standings", methods=["GET"])
def fetch_standings():
    """returns all standings"""
    gender = request.args.get("gender")
    year = request.args.get("year")
    week = request.args.get("week")

    data = get_data()

    if len(data) == 0:
        return jsonify({"message": "There is no data"}), 404

    if gender and year and week:
        table_name = f"dashboard_{gender.lower()}s_{year}"
        if table_name not in data:
            return jsonify({"message": f"No data for {gender} {year}"}), 404
        filtered_df = data[table_name].copy()
        filtered_df = filtered_df[
            filtered_df[f"Poll_Ranking_{week}"].notnull()
        ].sort_values(f"Poll_Ranking_{week}")

        data = filtered_df[
            [
                f"Poll_Ranking_{week}",
                "number_matches",
                "wins",
                "losses",
                "draws",
                "total_goals",
                "team_name",
            ]
        ].to_dict(orient="records")
        return jsonify(data)

    return (
        jsonify(
            {
                "message": "Please select ALL dropdown fields for year, gender and week to view standings"
            }
        ),
        404,
    )


def preprocess_rating_rankings(df):
    poll_ranking_columns = [
        column
        for column in list(df.columns)
        if column.startswith("Poll_Ranking")
    ]
    poll_rating_columns = [
        column
        for column in list(df.columns)
        if column.startswith("Poll_Rating")
    ]
    # melt poll_ranking columns
    ranking_df = pd.melt(
        df,
        id_vars=["team_name"],
        value_vars=poll_ranking_columns,
        var_name="column",
    )
    ranking_df["week"] = (
        ranking_df["column"].str.extract("(\d+)", expand=False).astype(int)
    )
    ranking_df = ranking_df.rename(columns={"value": "ranking"})[
        ["team_name", "week", "ranking"]
    ]

    # melt poll_rating columns
    rating_df = pd.melt(
        df,
        id_vars=["team_name"],
        value_vars=poll_rating_columns,
        var_name="column",
    )
    rating_df["week"] = (
        rating_df["column"].str.extract("(\d+)", expand=False).astype(int)
    )
    rating_df = rating_df.rename(columns={"value": "rating"})[
        ["team_name", "week", "rating"]
    ]

    # merge ranking and rating dataframes
    result_df = pd.merge(ranking_df, rating_df, on=["team_name", "week"])

    # rating change to two decimals
    result_df["rating"] = result_df["rating"].round(2)
    return result_df


@app.route("/api/team-performance", methods=["GET"])
def fetch_performances():
    """return all team performances"""
    team = request.args.get("team")
    gender = request.args.get("gender")
    year = request.args.get("year")

    data = get_data()

    if len(data) == 0:
        return jsonify({"message": "There is no data"}), 404

    if gender and year and team:
        table_name = f"dashboard_{gender.lower()}s_{year}"
        if table_name not in data:
            return jsonify({"message": f"No data for {gender} {year}"}), 404
        df = data[table_name].copy()

        df = preprocess_rating_rankings(df)  # preprocess data

        if team in list(df["team_name"]):
            df = df[df["team_name"] == team]
            df = df[df.ranking.notnull()]
            df = df.to_dict(orient="records")
            final = {"data": df, "status": 200}
        else:
            final = {
                "message": f"No data found for this team for this {year} {gender}",
                "status": 404,
            }

    return jsonify(final), final["status"]
