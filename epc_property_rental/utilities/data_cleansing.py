import pandas as pd
import ast
import json
import datetime
from epc_property_rental.utilities.data_upload import upload_data_to_db
from epc_property_rental.utilities.epc_ocr_extraction import extract_epc_values


def cleanse_new_data(data):
    # Convert data to DataFrame
    rightmove_data = pd.DataFrame(data)

    # Combine two postcode columns together
    rightmove_data['postcode'] = rightmove_data['outcode'] + rightmove_data['incode']

    # Remove initial columns that we don't want
    rightmove_data = rightmove_data.drop(columns=['agentPhone', 'councilTaxBand', 'description', 'descriptionHtml', 'features', 'sizeSqFeetMin', 
                          'countryCode', 'deliveryPointId', 'ukCountry', 'outcode', 'incode', 'minimumTermInMonths'])

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
    rightmove_data = rightmove_data.rename(columns={'sizeSqFeetMax': 'size', 'id': 'rightmove_id', 'letAvailableDate': 'let_available_date', 
                                                    'letType' : 'let_type', 'furnishType' : 'furnish_type'})

    print('rightmove rental pre clean->', len(rightmove_data))

    # Drop rows where more than half of the values are missing
    threshold = len(rightmove_data.columns) / 2

    rightmove_cleaned = rightmove_data.dropna(thresh=threshold)

    # remove any incorrect data
    rightmove_cleaned = rightmove_cleaned[rightmove_cleaned['rightmove_id'].notnull()]
    rightmove_cleaned = rightmove_cleaned[rightmove_cleaned['displayAddress'].notnull()]
    rightmove_cleaned = rightmove_cleaned[rightmove_cleaned['rightmove_id'].apply(lambda x: len(str(x)) > 5)]
    rightmove_cleaned = rightmove_cleaned[rightmove_cleaned['rightmove_id'].apply(lambda x: len(str(x)) < 15)]

    # drop rows where there is clear erroneous data in the id column

    print('rightmove rental post clean->', len(rightmove_cleaned))

    # add column to determine the date the data was added
    rightmove_cleaned['date_added_db'] = datetime.date.today()

    # Add column for status
    rightmove_cleaned['status'] = 'Live'

    # Add columns for EPC values with default None
    rightmove_cleaned['current_epc'] = None
    rightmove_cleaned['potential_epc'] = None

    for index, row in rightmove_cleaned[rightmove_cleaned['epc'].notnull()].iterrows():
        image_url = row['epc']
        
        try:
            # Attempt to extract EPC values using the utility function
            current_epc, potential_epc = extract_epc_values(image_url)
            rightmove_cleaned.at[index, 'current_epc'] = current_epc
            rightmove_cleaned.at[index, 'potential_epc'] = potential_epc
        except Exception as e:
            print(f"Error processing OCR for image URL {image_url}: {e}")
            # Optionally, log the error or take other actions like notifying or retrying

    print('rental columns ->', list(rightmove_data))


    # finalise data
    rightmove_cleaned = rightmove_cleaned.reset_index()
    rightmove_cleaned = rightmove_cleaned.drop(columns=['index'], axis=1)

    # Convert cleansed DataFrame back to list of dictionaries
    cleansed_data = rightmove_cleaned.to_dict(orient='records')
    print('completed rental cleansing')
    upload_data_to_db(cleansed_data)
    # return cleansed_data