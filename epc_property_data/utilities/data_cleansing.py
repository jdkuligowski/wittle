import pandas as pd
import ast

def cleanse_new_data(data):
    # Convert data to DataFrame
    df = pd.DataFrame(data)
    
    # combine two postcode columns together
    df['postcode'] = df['outcode'] + df['incode']

    # remove initial columns that we don't want
    rightmove_data = df.drop(columns=['Unnamed: 0', 'agentPhone', 'councilTaxBand', 'description', 'descriptionHtml', 'features', 'sizeSqFeetMin', 
                                                  'countryCode', 'deliveryPointId', 'ukCountry', 'secondaryPrice', 'letAvailableDate', 'deposit', 'minimumTermInMonths', 
                                                  'letType', 'furnishType', 'outcode', 'incode'], axis=1)

    # Convert the string representation of lists into actual lists
    rightmove_data['images'] = rightmove_data['images'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

    # Extract the first image
    rightmove_data['images'] = rightmove_data['images'].apply(lambda x: x[0] if isinstance(x, list) and len(x) > 0 else None)

    # sort data - rename columns and order
    rightmove_data = rightmove_data.rename(columns={'coordinates.latitude': 'latitude', 'coordinates.longitude': 'longitude', 'sizeSqFeetMax': 'size', 'id': 'rightmove_id'})

    print('rightmove pre clean->', len(rightmove_data))

    # Drop rows where more than half of the values are missing
    threshold = len(rightmove_data.columns) / 2

    rightmove_cleaned = rightmove_data.dropna(thresh=threshold)

    # remove any incorrect data
    rightmove_cleaned = rightmove_cleaned[rightmove_cleaned['rightmove_id'].notnull()]
    rightmove_cleaned = rightmove_cleaned[rightmove_cleaned['displayAddress'].notnull()]
    rightmove_cleaned = rightmove_cleaned[rightmove_cleaned['rightmove_id'].apply(lambda x: len(str(x)) > 5)]
    rightmove_cleaned = rightmove_cleaned[rightmove_cleaned['rightmove_id'].apply(lambda x: len(str(x)) < 15)]

    # drop rows where there is clear erroneous data in the id column

    print('rightmove post clean->', len(rightmove_cleaned))

    # finalise data
    rightmove_cleaned = rightmove_cleaned.reset_index()
    rightmove_cleaned = rightmove_cleaned.drop(columns=['index'], axis=1)

    # Convert cleansed DataFrame back to list of dictionaries
    cleansed_data = rightmove_cleaned.to_dict(orient='records')
    return cleansed_data