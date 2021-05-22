import pandas as pd
import numpy as np
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from config import password

def populate_sql():
    csv_path = "./Resources/maryland_covid19-cases.csv"

    df = pd.read_csv(csv_path)
    df = df.replace(np.nan,0)


    columnsplit = df['DATE'].str.split(' ',n=1, expand=True)
    # Assigning Column 0 to DATE
    df = df.assign(DATE=columnsplit[0])
    # ### Renaming OBJECTID column
    df.rename(columns={"OBJECTID":"ID"},inplace=True)
    df


    # #### Creating new Data Frame
    new_df = pd.DataFrame(columns=['ID','DATE','County','Confirmed_cases'])
    counties = df.columns[2:26]

    # #### Populating New DataFrame
    # Created new DataFrame to represent data by Date, County, Confirmed Cases
    data =[]
    for county in counties:
        for index,row in df.iterrows():
            data.append({'ID':index,'DATE':row['DATE'],"County":county, "Confirmed_cases":row[county]})

    new_df = pd.DataFrame(data)
    new_df.head()

    # #### Adding Case ID
    new_df['ID'] = np.arange(1,new_df.shape[0]+1)
    new_df

    # ### putting df into vaccinations table in pgadmin server
    # #### Connecting to DB
    connection_string = f"postgres:{password}@localhost:5433/covid19_MD_Data"
    engine = create_engine(f'postgresql://{connection_string}')


    # dropping values that are in any of our tables and resetting the index.
    with engine.connect() as con:
        statement = [text("""Truncate table cases CASCADE""")]
        for query in statement:
            con.execute(query)
    # Populating SQL database
    new_df.to_sql(name='cases', con=engine, if_exists='append', index=False)


    ##############################################################################
    #                                                                           #
    # vaccinations Data                                                        #
    ###########################################################################
    csv_path = "./Resources/maryland_vaccinations.csv"
    df = pd.read_csv(csv_path)

    # #### Dropping rows with missing county data
    df = df.iloc[71:]
    df = df.reset_index(drop=True)
    # #### resetting object ID values

    df["OBJECTID"] = np.arange(1,df.shape[0]+1)

    columnsplit = df['VACCINATION_DATE'].str.split(' ',n=1, expand=True)
    # Assigning Column 0 to DATE

    df = df.assign(VACCINATION_DATE=columnsplit[0])

    # #### Renaming OBJECTID AND Vaccionation_date  columns
    df.rename(columns={"OBJECTID":"ID", "VACCINATION_DATE":"DATE"},inplace=True)

    # #### Replacing NaN values with 0
    df = df.replace(np.nan,0)

    # ### putting df into vaccinations table in pgadmin server
    # dropping values that are in any of our tables and resetting the index.
    with engine.connect() as con:
        statement = [text("""Truncate table vaccinations CASCADE""")]
        for query in statement:
            con.execute(query)
    df.to_sql(name='vaccinations', con=engine, if_exists='append', index=False)