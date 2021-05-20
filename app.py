import pandas as pd
import subprocess
import sys
import pendulum
import urllib.request

from collections import OrderedDict

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from flask import Flask, jsonify


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False # Preventing Jsonify to reorder the dictionario elements by the keys
#################################################
# Flask Routes
#################################################


@app.route("/")
def index():
    """Index - Landing Page"""
    return (
        f"<h1>Index Page</h1>"
    )

@app.route("/update_data")
def get_datasets():
    """gets the most updated data from https://ourworldindata.org/us-states-vaccinations"""
    file_name = f"maryland_vaccinations.csv"
    url = "https://opendata.arcgis.com/datasets/89c9c1236ca848188d93beb5928f4162_0.csv"
    urllib.request.urlretrieve(url, f"./Resources/{file_name}")
    print(file_name,"Downloaded")
    return ("<h2>Data has been updated</h2>")

if __name__ == "__main__":
    app.run(debug=True  )