import pandas as pd
pd.options.mode.chained_assignment = None  # default='warn'
import numpy as np
from sqlalchemy import create_engine
from config import password
import json
import requests

connection_string = f"udxenurz:{password}@batyr.db.elephantsql.com/udxenurz"
engine = create_engine(f'postgres://{connection_string}')

# list of counties and their coordinates
counties = [{'county':"Allegany","coordinates":[39.6255251,-78.6114999]},{'county':"Anne_Arundel","coordinates":[38.9530109,-76.5488232]},{'county':"Baltimore","coordinates":[39.4647665,-76.7336521]},{'county':"Baltimore_City","coordinates":[39.2903848,-76.6121893]},{'county':"Calvert","coordinates":[38.49495030000001,-76.5025742]},{'county':"Caroline","coordinates":[38.9105018,-75.8533954]},{'county':"Carroll","coordinates":[39.5423418,-77.0564464]},{'county':"Cecil","coordinates":[39.5739403,-75.94632399999999]},{'county':"Charles","coordinates":[38.5221781,-77.10249019999999]},{'county':"Dorchester","coordinates":[38.4152819,-76.17837390000001]},{'county':"Frederick","coordinates":[39.3844507,-77.4701972]},{'county':"Garrett","coordinates":[39.5681243,-79.29021329999999]},{'county':"Harford","coordinates":[39.5838964,-76.3637285]},{'county':"Howard","coordinates":[39.2873463,-76.964306]},{'county':"Kent","coordinates":[39.2713804,-76.1319953]},{'county':"Montgomery","coordinates":[39.1547426,-77.2405153]},{'county':"Prince_Georges","coordinates":[38.78492110000001,-76.8720961]},{'county':"Queen_Annes","coordinates":[39.0263572,-76.1319953]},{'county':"Somerset","coordinates":[38.0862333,-75.8533954]},{'county':"St_Marys","coordinates":[38.1060259,-76.3637285]},{'county':"Talbot","coordinates":[38.7803973,-76.1319953]},{'county':"Washington","coordinates":[39.641762,-77.719993]},{'county':"Wicomico","coordinates":[38.3941813,-75.667356]},{'county':"Worcester","coordinates":[38.1584227,-75.4344727]},]

def get_cases(date):
    # date = '2021-05-22'
    # reading SQL 
    df =pd.read_sql_query('select * from cases', con=engine)
    # Converting Date column from String to Dates
    df['DATE'] = df['DATE'].astype(str)
    last_date = df[df['DATE'] == date]

    # Populating Counties with number of cases for that specific date
    for index,county in enumerate(counties):
        dates = date
        cases = last_date[last_date['County'] == county['county']]['Confirmed_cases'].item()
        counties[index]['date'] = dates
        counties[index]['Confirmed_cases'] = cases
    # Appending cases and coordinates to Geojson data for Maryland Counties

    # Build the endpoint URL
    target_url = 'https://opendata.arcgis.com/datasets/4c172f80b626490ea2cff7b699febedb_1.geojson'
    path_to_file = "./Resources/Maryland_Physical_Boundaries_-_County_Boundaries_(Generalized).geojson"
    # generating request and converting to json
    geo_data = None
    with open(path_to_file) as f:
        geo_data = json.load(f)
        # Appending Coordinates, date and confirmed cases to our GeoJson Data
        for county in range(0,len(geo_data['features'])):
            # Setting the coordinates
            geo_data['features'][county]['properties']['coordinates'] = counties[county]['coordinates']
            # setting confirmed cases and dates
            geo_data['features'][county]['properties']['date'] = counties[county]['date']
            geo_data['features'][county]['properties']['confirmed_cases'] = counties[county]['Confirmed_cases']
    return json.dumps(geo_data)
