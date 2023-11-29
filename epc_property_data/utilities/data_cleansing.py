import pandas as pd
import numpy as np
import ast
import json
import datetime
import re 
from epc_property_data.utilities.data_upload import upload_data_to_db
from epc_property_data.utilities.epc_ocr_extraction import extract_epc_values



def cleanse_new_data(data):
    # Convert data to DataFrame
    rightmove_data = pd.DataFrame(data)

    # Combine two postcode columns together
    rightmove_data['postcode'] = rightmove_data['outcode'] + rightmove_data['incode']

    # Remove initial columns that we don't want
    columns_to_drop = ['agentPhone', 'councilTaxBand', 'description', 'descriptionHtml', 'features', 'sizeSqFeetMin', 
                          'countryCode', 'deliveryPointId', 'ukCountry', 'secondaryPrice']

    for column in columns_to_drop:
        if column in rightmove_data.columns:
            rightmove_data.drop(columns=[column], inplace=True)

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

    print('rightmove sales pre clean->', len(rightmove_data))

    # Drop rows where more than half of the values are missing
    threshold = len(rightmove_data.columns) / 2

    rightmove_cleaned = rightmove_data.dropna(thresh=threshold)

    # remove any incorrect data
    rightmove_cleaned = rightmove_cleaned[rightmove_cleaned['rightmove_id'].notnull()]
    rightmove_cleaned = rightmove_cleaned[rightmove_cleaned['displayAddress'].notnull()]
    rightmove_cleaned = rightmove_cleaned[rightmove_cleaned['rightmove_id'].apply(lambda x: len(str(x)) > 5)]
    rightmove_cleaned = rightmove_cleaned[rightmove_cleaned['rightmove_id'].apply(lambda x: len(str(x)) < 15)]

    # drop rows where there is clear erroneous data in the id column

    print('sales post clean->', len(rightmove_cleaned))

    # Remove duplicate rows based on 'rightmove_id'
    rightmove_cleaned = rightmove_cleaned.drop_duplicates(subset='rightmove_id', keep='first')
    print('rightmove sales after removing duplicates->', len(rightmove_cleaned))

    rightmove_cleaned['date_added_db'] = datetime.date.today()

    # Add column for status
    rightmove_cleaned['status'] = 'Live'

    # Initialize 'added_revised' with default values (e.g., original 'addedOn' values)
    rightmove_cleaned['added_revised'] = rightmove_cleaned['addedOn']

    # create new column for added date
    rightmove_cleaned['added_revised'] = np.where(rightmove_cleaned['addedOn'].str.contains('Added today'), datetime.datetime.now().strftime('%d/%m/%Y'),
                                      np.where(rightmove_cleaned['addedOn'].str.contains('Added yesterday'), (datetime.datetime.now() - datetime.timedelta(days=1)).strftime('%d/%m/%Y'),
                                      np.where(rightmove_cleaned['addedOn'].str.contains('Reduced'), None, rightmove_cleaned['addedOn'])))

    # create new column for reduced date
    rightmove_cleaned['reduced_revised'] = np.where(rightmove_cleaned['addedOn'].str.contains('Reduced today'), datetime.datetime.now().strftime('%d/%m/%Y'),
                                          np.where(rightmove_cleaned['addedOn'].str.contains('Reduced yesterday'), (datetime.datetime.now() - datetime.timedelta(days=1)).strftime('%d/%m/%Y'),
                                          np.where(rightmove_cleaned['addedOn'].str.contains('Reduced on'), rightmove_cleaned['addedOn'].str.replace('Reduced on', ''),
                                          np.where(rightmove_cleaned['addedOn'].str.contains('Reduced '), rightmove_cleaned['addedOn'].str.replace('Reduced ', ''), None))))


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

    # Apply price conversion to create price_numeric column
    rightmove_cleaned['price_numeric'] = rightmove_cleaned['price'].apply(convert_price_to_int)

    # finalise data
    rightmove_cleaned = rightmove_cleaned.reset_index()

    # Drop 'requires_full_processing' if it exists
    if 'requires_full_processing' in rightmove_cleaned.columns:
        rightmove_cleaned.drop(columns=['requires_full_processing'], inplace=True)

    # Drop 'requires_additional_processing' if it exists
    if 'requires_additional_processing' in rightmove_cleaned.columns:
        rightmove_cleaned.drop(columns=['requires_additional_processing'], inplace=True)

    # Drop 'index' if it exists
    if 'index' in rightmove_cleaned.columns:
        rightmove_cleaned.drop(columns=['index'], inplace=True)

    print('sales columns ->', list(rightmove_cleaned))

    # Convert cleansed DataFrame back to list of dictionaries
    cleansed_data = rightmove_cleaned.to_dict(orient='records')
    print('sales cleansing complete')
    # upload_data_to_db(cleansed_data)
    return cleansed_data




def convert_price_to_int(price_str):
    if price_str and isinstance(price_str, str):
        # Remove '£' symbol, commas, 'pcm', and other non-numeric characters
        numeric_price = re.sub(r'[£,pcm]', '', price_str)
        # Remove any remaining non-digit characters
        numeric_price = re.sub(r'[^0-9]', '', numeric_price)
        return int(numeric_price) if numeric_price.isdigit() else None
    return None