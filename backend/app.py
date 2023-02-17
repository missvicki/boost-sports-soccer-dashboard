from flask import Flask, jsonify, abort, request

import boto3
import pandas as pd
import os

app = Flask(__name__)


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
        response = s3_client.get_object(
            Bucket=AWS_S3_BUCKET, Key="sample_results.csv"
        )

        status = response.get("ResponseMetadata", {}).get("HTTPStatusCode")
    except Exception as e:
        print(e, "Ooooppsss something happened")

    if status == 200:
        print(f"Successful S3 get_object response. Status - {status}")
        standings = pd.read_csv(response.get("Body"))
        return standings
    else:
        print(
            f"Unsuccessful S3 get_object response. Status - {status}"
        )
        return None


@app.route("/")
def hello_world():
    return "<p>Welcome to boost dashboard</p>"


# get products and add products
@app.route("/api/standings", methods=["GET"])
def fetch_standings():
    """returns all standings"""
    standings_df = get_data().to_dict(orient="records")
    
    if standings_df:
        return jsonify({"standings": standings_df}), 200
    else:
        return jsonify({"message": "There are no standings"}), 404
