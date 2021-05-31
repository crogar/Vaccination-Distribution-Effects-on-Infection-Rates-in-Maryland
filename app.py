import json
import pandas as pd
import numpy as np
import subprocess
import sys
import pendulum
import urllib.request
import populate_db
from collections import OrderedDict
import gen_json, gen_vacc_json

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from flask import Flask, jsonify, render_template
from flask_cors import CORS


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
app.config["JSON_SORT_KEYS"] = False # Preventing Jsonify to reorder the dictionario elements by the keys
CORS(app)
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

@app.route("/gen_cases/<date>")
def gen_geojson(date):
    """Index - Landing Page"""
    parsed = json.loads(gen_json.get_cases(date))
    return jsonify(parsed)

@app.route("/gen_cases_heat/<date>")
def gen_heat_cases(date):
    parsed = json.loads(gen_json.get_cases_heatmap(date))
    return jsonify(parsed)

@app.route("/get_cases_dates")
def cases_dates():
    """Index - Landing Page"""
    parsed = json.loads(gen_json.gen_cases_dates())
    return jsonify(parsed)

# Returns a list with dates since first day to last for vaccines data table
@app.route("/get_vaccination_dates")
def vacinnation_dates():
    parsed = json.loads(gen_json.gen_vaccination_dates())
    return jsonify(parsed)

# Returns a Json File containing vaccination data by date
@app.route("/gen_vaccines/<date>")
def gen_vacc(date):
    """Index - Landing Page"""
    parsed = json.loads(gen_vacc_json.get_vaccines(date))
    return jsonify(parsed)

# Returns a Json File containing vaccination data by date
@app.route("/gen_vaccines_gender/<date>")
def gen_gender(date):
    """Index - Landing Page"""
    parsed = json.loads(gen_json.get_vaccines_gender(date))
    return jsonify(parsed)

if __name__ == "__main__":
    app.run(debug=True  )