import pandas as pd
pd.options.mode.chained_assignment = None  # default='warn'
import numpy as np
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from config import password

connection_string = f"udxenurz:{password}@batyr.db.elephantsql.com/udxenurz"
engine = create_engine(f'postgres://{connection_string}')

# list of counties and their coordinates
counties = [{'county':"Allegany","coordinates":[39.6255251,-78.6114999]},{'county':"Anne_Arundel","coordinates":[38.9530109,-76.5488232]},{'county':"Baltimore","coordinates":[39.4647665,-76.7336521]},{'county':"Baltimore_City","coordinates":[39.2903848,-76.6121893]},{'county':"Calvert","coordinates":[38.49495030000001,-76.5025742]},{'county':"Caroline","coordinates":[38.9105018,-75.8533954]},{'county':"Carroll","coordinates":[39.5423418,-77.0564464]},{'county':"Cecil","coordinates":[39.5739403,-75.94632399999999]},{'county':"Charles","coordinates":[38.5221781,-77.10249019999999]},{'county':"Dorchester","coordinates":[38.4152819,-76.17837390000001]},{'county':"Frederick","coordinates":[39.3844507,-77.4701972]},{'county':"Garrett","coordinates":[39.5681243,-79.29021329999999]},{'county':"Harford","coordinates":[39.5838964,-76.3637285]},{'county':"Howard","coordinates":[39.2873463,-76.964306]},{'county':"Kent","coordinates":[39.2713804,-76.1319953]},{'county':"Montgomery","coordinates":[39.1547426,-77.2405153]},{'county':"Prince_Georges","coordinates":[38.78492110000001,-76.8720961]},{'county':"Queen_Annes","coordinates":[39.0263572,-76.1319953]},{'county':"Somerset","coordinates":[38.0862333,-75.8533954]},{'county':"St_Marys","coordinates":[38.1060259,-76.3637285]},{'county':"Talbot","coordinates":[38.7803973,-76.1319953]},{'county':"Washington","coordinates":[39.641762,-77.719993]},{'county':"Wicomico","coordinates":[38.3941813,-75.667356]},{'county':"Worcester","coordinates":[38.1584227,-75.4344727]},]

def get_cases(date):
    date = '2021-05-22'
    df =pd.read_sql_query('select * from cases', con=engine)
    # Converting Date column from String to Dates
    df['DATE'] = pd.to_datetime(df['DATE'])
    last_date = df[df['DATE'] == date]

    # Populating Counties with number of cases for that specific date
    for county in counties:
        temp = last_date[last_date['County'] == county['county']]['Confirmed_cases'].item()
        county['fully_vaccinated'] = temp