import pandas as pd
import subprocess
import sys
import pendulum

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


if __name__ == "__main__":
    app.run(debug=True  )