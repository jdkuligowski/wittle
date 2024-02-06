from ..models import Property
from django.db.models import F
import datetime

from epc_property_rental.utilities.data_cleansing import cleanse_new_data
import logging

logger = logging.getLogger(__name__)


def pre_cleanse_check(data):
    print('started pre cleanse for sales')
    # Initialize counters for each type of processing
    count_epc_updates = 0
    count_added_revised_updates = 0
    count_reduced_revised_updates = 0
    count_price_updates = 0


    try:
        # extract the existing properties from the db
        existing_properties = Property.objects.in_bulk(field_name='rightmove_id')
        records_to_process = []


        for record in data:
            # set the list of rightmove_ids
            
            rightmove_id = record['id']
            is_existing_record = rightmove_id in existing_properties

            # logic for if the record exists in the database, what action to take
            if is_existing_record:
                # print('exists')

                existing_record = existing_properties[rightmove_id]
                record['requires_additional_processing'] = False
                record['type_of_processing'] = None

                # Check and flag 'epc' for additional processing if changed
                if 'epc' in record and record['epc'] != existing_record.epc and record['epc'] is not None:
                    record['requires_additional_processing'] = True
                    record['type_of_processing'] = 'EPC'
                    # print('epc_update_required')
                    count_epc_updates += 1


                # Check and flag 'addedOn' for additional processing if changed
                if 'addedOn' in record and 'Reduced' not in record['addedOn'] and existing_record.added_revised is None:
                    record['requires_additional_processing'] = True
                    # print('addedOn new added value','new->', record['addedOn'], 'existing added ->', existing_record.added_revised, 'existing reduced ->', existing_record.reduced_revised)
                    record['type_of_processing'] = 'added_revised'
                    count_added_revised_updates += 1


                # Check and flag 'addedOn' for additional processing if changed
                if 'addedOn' in record and 'Reduced' in record['addedOn'] and existing_record.reduced_revised is None:
                    record['requires_additional_processing'] = True
                    # print('reduced_update_required','new->', record['addedOn'], 'existing ->', existing_record.reduced_revised)
                    record['type_of_processing'] = 'reduced_revised'
                    count_reduced_revised_updates += 1

                # Check and flag 'price' for additional processing if changed
                if 'price' in record and record['price'] != existing_record.price:
                    record['requires_additional_processing'] = True
                    # print('price_update_required')
                    record['type_of_processing'] = 'price'
                    count_price_updates += 1


                # If no further processing is required, skip this record
                if not record['requires_additional_processing']:
                    continue
            else:
                # print('doesnt exist')

                # Flag new records for full processing
                record['requires_full_processing'] = True

            records_to_process.append(record)

    except Exception as e:
        logger.error(f"Error during data processing: {e}")

        # print(f"Error in pre_cleanse_check: {e}")  
    print(f"EPC updates required: {count_epc_updates}")
    print(f"Added revised updates required: {count_added_revised_updates}")
    print(f"Reduced revised updates required: {count_reduced_revised_updates}")
    print(f"Price updates required: {count_price_updates}")

    print('finished pre cleanse')
    # print(records_to_process)
    return records_to_process