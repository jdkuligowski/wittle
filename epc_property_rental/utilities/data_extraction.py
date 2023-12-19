
import requests
import json
import environ

from epc_property_rental.utilities.data_cleansing import cleanse_new_data

env = environ.Env()

def extract_data_from_api(defaultDatasetId):

    print('extracting rental data from api')

    API_TOKEN = env('APIFY_API_KEY')

    if not API_TOKEN:
        print('issue with API token')

    base_url = 'https://api.apify.com/v2/datasets/'
    specific_url = f"{base_url}{defaultDatasetId}/items?token={API_TOKEN}"
    
    response = requests.get(specific_url)
    print(response)

    if response.status_code != 200:
        raise Exception("Failed to fetch data from the API.")
    
    raw_data = json.loads(response.text)

    # response_data = response.json()  # Directly parse the JSON response

    # # Assuming createdAt is part of this response_data, extract it
    # created_at = response_data.get('createdAt', 'No createdAt in response')


    # print(created_at)

    print('completed data extraction')
    # cleansed_data = cleanse_new_data(new_data)
    return raw_data
