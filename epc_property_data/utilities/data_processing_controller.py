# data_processing_controller.py
from epc_property_data.utilities.data_extraction import extract_data_from_api
from epc_property_data.utilities.data_pre_cleanse_check import pre_cleanse_check
from epc_property_data.utilities.data_cleansing import cleanse_new_data
from epc_property_data.utilities.data_upload import upload_data_to_db
from epc_property_data.utilities.data_upload import upload_full_data_to_db
from ..models import Property


# ? Process 1 for daily data that will allow us to update the data with the mkost recent properties

def process_daily_sales_data(defaultDatasetId):
    
    # data_extraction script
    raw_data = extract_data_from_api(defaultDatasetId)

    # data_pre_cleanse_check script
    data_to_process = pre_cleanse_check(raw_data)

    new_records = [record for record in data_to_process if 'requires_full_processing' in record]
    updated_records = [record for record in data_to_process if 'requires_additional_processing' in record]

    print('new sales records to process ->', len(new_records))
    print('sales records to update ->', len(updated_records))


    cleansed_new_data = cleanse_new_data(new_records) if new_records else []
    recleansed_data = cleanse_new_data(updated_records) if updated_records else []


    upload_data_to_db(cleansed_new_data, recleansed_data)



# ? Process 2 is run weekly and chcks on the latest properties while also checking propereties that have come off the market

def process_weekly_sales_data(defaultDatasetId):
    # Extract data from the API
    raw_data = extract_data_from_api(defaultDatasetId)

    # Pre-process data to determine which records need processing
    data_to_process = pre_cleanse_check(raw_data)
    
    new_records = [record for record in data_to_process if 'requires_full_processing' in record]
    updated_records = [record for record in data_to_process if 'requires_additional_processing' in record]

    # Fetch all existing rightmove_id's from the database
    all_rightmove_ids = set(Property.objects.values_list('rightmove_id', flat=True))

    print('new records to process ->', len(new_records))
    print('records to update ->', len(updated_records))

    # Cleanse new and updated data
    cleansed_new_data = cleanse_new_data(new_records) if new_records else []
    recleansed_data = cleanse_new_data(updated_records) if updated_records else []

    # Upload data to the database
    upload_full_data_to_db(cleansed_new_data, recleansed_data, all_rightmove_ids)



