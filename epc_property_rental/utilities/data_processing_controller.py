# data_processing_controller.py
from epc_property_rental.utilities.data_extraction import extract_data_from_api
from epc_property_rental.utilities.data_pre_cleanse_check import pre_cleanse_check
from epc_property_rental.utilities.data_cleansing import cleanse_new_data
# from epc_property_rental.utilities.data_cleansing import recleanse_data
from epc_property_rental.utilities.data_upload import upload_data_to_db
from epc_property_rental.utilities.data_upload import upload_full_data_to_db
from ..models import Property


# ? Process 1 for daily data that will allow us to update the data with the mkost recent properties

def process_daily_rental_data(defaultDatasetId):
    
    # data_extraction script
    raw_data = extract_data_from_api(defaultDatasetId)

    # data_pre_cleanse_check script
    data_to_process = pre_cleanse_check(raw_data)

    new_records = [record for record in data_to_process if 'requires_full_processing' in record]
    updated_records = [record for record in data_to_process if 'requires_additional_processing' in record]

    print('new records to process ->', len(new_records))
    print('records to update ->', len(updated_records))


    cleansed_new_data = cleanse_new_data(new_records) if new_records else []
    recleansed_data = cleanse_new_data(updated_records) if updated_records else []


    upload_data_to_db(cleansed_new_data, recleansed_data, raw_data)

            




# ? Process 2 is run weekly and chcks on the latest properties while also checking propereties that have come off the market

def process_weekly_rental_data(defaultDatasetId):
    # Extract data from the API
    raw_data = extract_data_from_api(defaultDatasetId)

    # Pre-process data to determine which records need processing
    data_to_process = pre_cleanse_check(raw_data)
    
    new_records = [record for record in data_to_process if 'requires_full_processing' in record]
    updated_records = [record for record in data_to_process if 'requires_additional_processing' in record]

    # Fetch all existing rightmove_id's from the database
    all_rightmove_ids = set(Property.objects.values_list('rightmove_id', flat=True))

    # fetch all rightmove ids that are live
    live_rightmove_ids = set(Property.objects.filter(status='Live').values_list('rightmove_id', flat=True))

    # Extract rightmove_ids from raw_data
    extracted_rightmove_ids = set(record.get('id') for record in raw_data if record.get('id') is not None)

    print('raw data ->', len(raw_data))
    print('records in the db ->', len(all_rightmove_ids))
    print('extracted records ->', len(extracted_rightmove_ids))
    print('new records to process ->', len(new_records))
    print('records to update ->', len(updated_records))

    # Cleanse new and updated data
    cleansed_new_data = cleanse_new_data(new_records) if new_records else []
    # recleansed_data = cleanse_new_data(updated_records) if updated_records else []

    # Upload data to the database
    upload_full_data_to_db(cleansed_new_data, updated_records, all_rightmove_ids, extracted_rightmove_ids, raw_data, live_rightmove_ids)







