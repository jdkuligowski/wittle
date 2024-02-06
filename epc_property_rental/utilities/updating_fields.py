import pandas as pd
import numpy as np
import ast
import json
import datetime
import re 
from epc_property_rental.utilities.epc_ocr_extraction import extract_epc_values
from ..models import Property


def update_controller(updated_records):
    # Initialize counters
    count_added_revised = 0
    count_reduced_revised = 0
    count_price_updates = 0
    count_epc_updates = 0

    for record in updated_records:

      
        if isinstance(record, dict):  # Ensure that record is a dictionary
            type_of_processing = record.get('type_of_processing')

            if type_of_processing == 'added_revised':
                update_added(record)
                count_added_revised += 1


            elif type_of_processing == 'reduced_revised':
                update_revised(record)
                count_reduced_revised += 1


            elif type_of_processing == 'price':
                update_price(record)
                count_price_updates += 1

            elif type_of_processing == 'EPC':
                update_epc(record)
                count_epc_updates += 1

        else:
          print(f"Expected a dict, but got: {record}")


def update_epc(data):
    # for record in data:
        rightmove_id = data.get('id')
        if rightmove_id is not None:
            try:
                image_url = data['epc']
                current_epc, potential_epc, current_letter, potential_letter = extract_epc_values(image_url)
                print(current_epc, potential_epc, current_letter, potential_letter)
                
                # Update only the EPC related fields in the database
                Property.objects.filter(rightmove_id=rightmove_id).update(
                    image_url=image_url,  
                    current_epc=current_epc,
                    potential_epc=potential_epc,
                    current_letter=current_letter,
                    potential_letter=potential_letter
                )

            except Exception as e:
                print(f"Error processing OCR for image URL {image_url}: {e}")



def update_added(data):
    # for record in data:
        rightmove_id = data.get('id')
        added_on = data.get('addedOn')
        if rightmove_id is not None and added_on is not None:
            
            added_revised = calculate_added_revised(added_on)
            # Update only the 'added_revised' field in the database
            Property.objects.filter(rightmove_id=rightmove_id).update(
                added_revised=added_revised
            )

def update_revised(data):
    # for record in data:
        rightmove_id = data.get('id')
        added_on = data.get('addedOn')
        if rightmove_id is not None and added_on is not None:
            counter = 0

            reduced_revised = calculate_reduced_revised(added_on)
            # Update only the 'reduced_revised' field in the database
            Property.objects.filter(rightmove_id=rightmove_id).update(
                reduced_revised=reduced_revised
            )
            counter += 1
            print('complete reduced ->', counter)



def update_price(data):
    # for record in data:
        rightmove_id = data.get('id')
        price = data.get('price')
        if rightmove_id is not None and price is not None:
            price_numeric = convert_price_to_int(price)

            # Update only the 'price' and 'price_numeric' fields in the database
            Property.objects.filter(rightmove_id=rightmove_id).update(
                price=price,
                price_numeric=price_numeric
            )


def convert_price_to_int(price_str):
    if price_str and isinstance(price_str, str):
        # Remove '£' symbol, commas, 'pcm', and other non-numeric characters
        numeric_price = re.sub(r'[£,pcm]', '', price_str)
        # Remove any remaining non-digit characters
        numeric_price = re.sub(r'[^0-9]', '', numeric_price)
        return int(numeric_price) if numeric_price.isdigit() else None
    return None



def calculate_reduced_revised(added_on):
    # Get the current date and yesterday's date
    today = datetime.datetime.now().strftime('%d/%m/%Y')
    yesterday = (datetime.datetime.now() - datetime.timedelta(days=1)).strftime('%d/%m/%Y')

    # Calculate 'reduced_revised' based on 'addedOn' content
    if 'Reduced today' in added_on:
        reduced_revised = today
    elif 'Reduced yesterday' in added_on:
        reduced_revised = yesterday
    elif 'Reduced on' in added_on:
        reduced_revised = added_on.replace('Reduced on', '').strip()
    elif 'Reduced ' in added_on:
        reduced_revised = added_on.replace('Reduced ', '').strip()
    else:
        reduced_revised = None

    return reduced_revised


def calculate_added_revised(added_on):
    # Get the current date and yesterday's date
    today = datetime.datetime.now().strftime('%d/%m/%Y')
    yesterday = (datetime.datetime.now() - datetime.timedelta(days=1)).strftime('%d/%m/%Y')

    # Calculate 'added_revised' based on 'addedOn' content
    if 'Added today' in added_on:
        added_revised = today
    elif 'Added yesterday' in added_on:
        added_revised = yesterday
    elif 'Reduced' in added_on:
        added_revised = None
    else:
        added_revised = added_on  # Default case: use the date as is

    return added_revised