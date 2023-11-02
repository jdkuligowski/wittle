# utilities/data_combination.py
from ..models import Property
from epc_property_data.utilities.data_upload import upload_data_to_db

def combine_with_current_data(cleansed_data):
    current_data_list = list(Property.objects.values())
    combined_data = current_data_list + cleansed_data
    upload_data_to_db(combined_data)
