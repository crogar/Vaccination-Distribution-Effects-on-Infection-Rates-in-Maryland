import pandas as pd
pd.options.mode.chained_assignment = None  # default='warn'
import numpy as np
from sqlalchemy import create_engine
from config import password
import json
import requests

connection_string = f"udxenurz:{password}@batyr.db.elephantsql.com/udxenurz"
engine = create_engine(f'postgres://{connection_string}')

#list of counties and their total population
county_pop = [
    {'county': "Allegany", 'population': 75300},
    {'county': "Anne Arundel", 'population': 556100},
    {'county': "Baltimore", 'population': 842600},
    {'county': "Baltimore City", 'population': 620961},
    {'county': "Calvert", 'population': 100450},
    {'county': "Caroline", 'population': 40300},
    {'county': "Carroll", 'population': 197400},
    {'county': "Cecil", 'population': 130350},
    {'county': "Charles", 'population': 177200},
    {'county': "Dorchester", 'population': 36300},
    {'county': "Frederick", 'population': 287900},
    {'county': "Garrett", 'population': 31600},
    {'county': "Harford", 'population': 276500},
    {'county': "Howard", 'population': 312900},
    {'county': "Kent", 'population': 22200},
    {'county': "Montgomery", 'population': 1075000},
    {'county': "Prince George's", 'population': 921900},
    {'county': "Queen Anne's", 'population': 55650},
    {'county': "St. Mary's", 'population': 130100},
    {'county': "Somerset", 'population': 28300},
    {'county': "Talbot", 'population': 40050},
    {'county': "Washington", 'population': 170950},
    {'county': "Wicomico", 'population': 107450},
    {'county': "Worcester", 'population': 56250},
]

def get_vaccines(date):
    # date = '2021-05-22'
    # reading SQL 
    dfv =pd.read_sql_query('select * from vaccinations', con=engine)
    # Converting Date column from String to Dates
    dfv['DATE'] = dfv['DATE'].astype(str)
    last_date = dfv[dfv['DATE'] == date]

    # Populating county_pop with number of vaccines for that specific date
    for index,county in enumerate(county_pop):
        dates = date
        vaccines = last_date[last_date['County'] == county['county']]['FullVaccinatedCumulative'].item()
        county_pop[index]['date'] = dates
        county_pop[index]['FullVaccinatedCumulative'] = vaccines
   
    # Appending cases and coordinates to Geojson data for Maryland Counties

    # Build the endpoint URL
    target_url = 'https://opendata.arcgis.com/datasets/4c172f80b626490ea2cff7b699febedb_1.geojson'
    # generating request and converting to json
    geo_data = requests.get(target_url).json()
    # Appending Coordinates, date and confirmed cases to our GeoJson Data
    for county in range(0,len(geo_data['features'])):
        # Setting the coordinates
        geo_data['features'][county]['properties']['coordinates'] = county_pop[county]['coordinates']
        # setting confirmed cases and dates
        geo_data['features'][county]['properties']['date'] = county_pop[county]['date']
        geo_data['features'][county]['properties']['confirmed_cases'] = county_pop[county]['Confirmed_cases']
    return json.dumps(geo_data)