import pandas as pd
import ast
import json
from epc_property_data.utilities.data_upload import upload_data_to_db


def cleanse_new_data(data):
    # Convert data to DataFrame
    rightmove_data = pd.DataFrame(data)

    # Combine two postcode columns together
    rightmove_data['postcode'] = rightmove_data['outcode'] + rightmove_data['incode']

    # Remove initial columns that we don't want
    rightmove_data = rightmove_data.drop(columns=['agentPhone', 'councilTaxBand', 'description', 'descriptionHtml', 'features', 'sizeSqFeetMin', 
                          'countryCode', 'deliveryPointId', 'ukCountry', 'secondaryPrice', 'outcode', 'incode'])

    # Convert the string representation of lists into actual lists
    rightmove_data['images'] = rightmove_data['images'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

    # Extract the first image
    rightmove_data['images'] = rightmove_data['images'].apply(lambda x: x[0] if isinstance(x, list) and len(x) > 0 else None)

    # Parse the string representation of coordinates into an actual dictionary and then extract latitude and longitude
    rightmove_data['coordinates'] = rightmove_data['coordinates'].apply(lambda x: json.loads(x) if isinstance(x, str) else x)
    rightmove_data['latitude'] = rightmove_data['coordinates'].apply(lambda x: x.get('latitude') if x else None)
    rightmove_data['longitude'] = rightmove_data['coordinates'].apply(lambda x: x.get('longitude') if x else None)

    # Drop the original 'coordinates' column as it's no longer needed
    rightmove_data = rightmove_data.drop(columns=['coordinates'])

    # sort data - rename columns and order
    rightmove_data = rightmove_data.rename(columns={'sizeSqFeetMax': 'size', 'id': 'rightmove_id'})
    # 'coordinates.latitude': 'latitude', 'coordinates.longitude': 'longitude',

    print('rightmove pre clean->', len(rightmove_data))

    print(list(rightmove_data))

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

    print(rightmove_cleaned.head(10))

    # Convert cleansed DataFrame back to list of dictionaries
    cleansed_data = rightmove_cleaned.to_dict(orient='records')
    upload_data_to_db(cleansed_data)
    # return cleansed_data