import pandas as pd
import numpy as np
import ast
import json
import datetime
import re 
import concurrent.futures
from epc_property_data.utilities.data_upload import upload_data_to_db
from epc_property_data.utilities.epc_ocr_extraction import extract_epc_values
from epc_property_data.utilities.floorplan_ocr_extraction import extract_floorplans



def cleanse_new_data(data):
    # Convert data to DataFrame
    rightmove_data = pd.DataFrame(data)

    # Combine two postcode columns together
    rightmove_data['postcode'] = rightmove_data['outcode'] + rightmove_data['incode']

    # creeate subcode column
    rightmove_data['subcode'] = rightmove_data['outcode'] + rightmove_data['incode'].str[0]

    # Remove initial columns that we don't want
    columns_to_drop = ['agentPhone', 'councilTaxBand', 'description', 'descriptionHtml', 'sizeSqFeetMin', 'countryCode', 'deliveryPointId', 
                      'ukCountry', 'secondaryPrice', 'agentDisplayAddress', 'agentLogo', 'brochures', 'nearestStations', 'councilTaxExempt', 'groundRentReviewPeriodInYears','councilTaxIncluded',
                      'councilTaxIncluded', 'annualGroundRent', 'annualGroundRent', 'groundRentPercentageIncrease', 'annualServiceCharge', 'domesticRates', 'groundRentReviewPeriodInYears', 'yearsRemainingOnLease',
                      'published', 'archived', 'sold', 'agentProfileUrl', 'agentListingsUrl', 'agentDescription', 'agentDescriptionHtml', 'tags', 'letAvailableDate', 'deposit', 'minimumTermInMonths', 'letType', 'furnishType',
                      'listingUpdateReason', 'listingUpdateDate', 'firstVisibleDate', 'displayStatus']

    for column in columns_to_drop:
        if column in rightmove_data.columns:
            rightmove_data.drop(columns=[column], inplace=True)

    # Convert the string representation of lists into actual lists
    rightmove_data['images'] = rightmove_data['images'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

    # Extract the first image
    rightmove_data['images'] = rightmove_data['images'].apply(lambda x: x[0] if isinstance(x, list) and len(x) > 0 else None)

    # Convert the string representation of 'features' into actual lists
    rightmove_data['features'] = rightmove_data['features'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

    # Join the features list into a single string separated by commas
    rightmove_data['features'] = rightmove_data['features'].apply(lambda x: ', '.join(x) if isinstance(x, list) else None)


    # Parse the string representation of coordinates into an actual dictionary and then extract latitude and longitude
    rightmove_data['coordinates'] = rightmove_data['coordinates'].apply(lambda x: json.loads(x) if isinstance(x, str) else x)
    rightmove_data['latitude'] = rightmove_data['coordinates'].apply(lambda x: x.get('latitude') if x else None)
    rightmove_data['longitude'] = rightmove_data['coordinates'].apply(lambda x: x.get('longitude') if x else None)

    # Drop the original 'coordinates' column as it's no longer needed
    rightmove_data = rightmove_data.drop(columns=['coordinates'])

    # Convert the string representation of 'floorplan' into actual lists
    rightmove_data['floorplans'] = rightmove_data['floorplans'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

    # Extract the URL of the first floorplan instance
    rightmove_data['floorplan_url'] = rightmove_data['floorplans'].apply(lambda x: x[0]['url'] if isinstance(x, list) and len(x) > 0 and 'url' in x[0] else None)

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
    rightmove_cleaned['current_letter'] = None
    rightmove_cleaned['potential_letter'] = None
 

    def process_epc_batch(batch):
        for index, row in batch.iterrows():
            image_url = row['epc']
            if image_url:  # Check if image_url is not None
                try:
                    current_epc, potential_epc, current_letter, potential_letter = extract_epc_values(image_url)
                    batch.at[index, 'current_epc'] = current_epc
                    batch.at[index, 'potential_epc'] = potential_epc
                    batch.at[index, 'current_letter'] = current_letter
                    batch.at[index, 'potential_letter'] = potential_letter
                except Exception as e:
                    print(f"Error processing OCR for image URL {image_url}: {e}")
            else:
                print(f"Skipping OCR for image URL {image_url} as it is None")
        return batch

    batch_size = 250
    batches = [rightmove_cleaned[i:i + batch_size] for i in range(0, rightmove_cleaned.shape[0], batch_size)]
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(process_epc_batch, batches))

    rightmove_cleaned = pd.concat(results)

    # Process floorplans concurrently
    def process_floorplan_batch(batch):
        for index, row in batch.iterrows():
            floorplan_url = row['floorplan_url']
            if floorplan_url:
                try:
                    floor_area = extract_floorplans(floorplan_url)
                    if floor_area:
                        batch.at[index, 'size'] = floor_area
                except Exception as e:
                    print(f"Error processing OCR for floorplan URL {floorplan_url}: {e}")
            else:
                print(f"Skipping OCR for floorplan URL {floorplan_url} as it is None")
        return batch

    batches = [rightmove_cleaned[i:i + batch_size] for i in range(0, rightmove_cleaned.shape[0], batch_size)]
    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(process_floorplan_batch, batches))
    
    rightmove_cleaned = pd.concat(results)


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

    # Drop 'floorplan' if it exists
    if 'floorplans' in rightmove_cleaned.columns:
        rightmove_cleaned.drop(columns=['floorplans'], inplace=True)

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