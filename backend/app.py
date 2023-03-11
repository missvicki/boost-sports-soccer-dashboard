from flask import Flask, jsonify, abort, request
from flask_cors import CORS
import boto3
import pandas as pd
import os

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

    s3_client = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    )

    try:
        objects = s3_client.list_objects_v2(Bucket=AWS_S3_BUCKET)["Contents"]

        # read each CSV file into a pandas DataFrame and store it in a dictionary
        dataframes = {}
        for obj in objects:
            # get the object key (file path) for the CSV file
            file_path = obj["Key"]

            # get a unique name for the DataFrame based on the file path
            df_name = file_path.split("/")[-1].split(".")[0]

            # read the CSV file into a pandas DataFrame
            if df_name != "sample_results":
                obj = s3_client.get_object(Bucket=AWS_S3_BUCKET, Key=file_path)
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
        return jsonify({"message": "There are no standings"}), 404

    if gender and year and week:
        table_name = f"dashboard_{gender.lower()}s_{year}"
        if table_name not in data:
            return jsonify({"message": f"No data for {gender} {year}"}), 404
        return jsonify(data[table_name].to_dict(orient="records")), 200
    

    # return jsonify(data["dashboard_womens_2022"].to_dict(orient="records")), 200
    return jsonify({"message": "Please select ALL dropdown fields for year, gender and week to view standings"}), 404
