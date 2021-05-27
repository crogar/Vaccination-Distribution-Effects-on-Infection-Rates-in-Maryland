import pandas as pd
import subprocess
import sys
import pendulum
import urllib.request
import populate_db
from collections import OrderedDict

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from flask import Flask, jsonify, render_template


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
    return render_template("index.html")

@app.route("/update_data")
def get_datasets():
    """gets the most updated data from https://ourworldindata.org/us-states-vaccinations"""
    file_name = f"maryland_vaccinations.csv"
    url = "https://opendata.arcgis.com/datasets/89c9c1236ca848188d93beb5928f4162_0.csv"
    urllib.request.urlretrieve(url, f"./Resources/{file_name}")
    file_name = "maryland_covid19-cases.csv"
    url = "https://opendata.arcgis.com/datasets/0573e90adab5434f97b082590c503bc1_0.csv"
    urllib.request.urlretrieve(url, f"./Resources/{file_name}")
    file_name = "maryland_covid19-gender_vaccination.csv"
    url = "https://opendata.arcgis.com/datasets/b84df3e7c3b3470e8f961b0989e20be4_0.csv"
    urllib.request.urlretrieve(url, f"./Resources/{file_name}")
    populate_db.populate_sql()
    return ("<h2>Data has been updated</h2>")

if __name__ == "__main__":
    app.run(debug=True  )