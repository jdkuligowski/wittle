
import requests
import json
import environ

from epc_property_data.utilities.data_cleansing import cleanse_new_data
from epc_property_data.utilities.data_combination import combine_with_current_data



def extract_data_from_api(defaultDatasetId):
    env = environ.Env()
    API_TOKEN = env('APIFY_API_KEY')
    base_url = 'https://api.apify.com/v2/datasets/'
    specific_url = f"{base_url}{defaultDatasetId}/items?token={API_TOKEN}"
    
    response = requests.get(specific_url)
    
    if response.status_code != 200:
        raise Exception("Failed to fetch data from the API.")
    
    new_data = json.loads(response.text)
    cleansed_data = cleanse_new_data(new_data)
    combine_with_current_data(cleansed_data)
