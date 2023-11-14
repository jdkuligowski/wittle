from ..models import Property
from django.db.models import F
import datetime

from epc_property_rental.utilities.data_cleansing import cleanse_new_data
import logging

logger = logging.getLogger(__name__)


def pre_cleanse_check(data):
    print('started pre cleanse')

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

                # Check and flag 'epc' for additional processing if changed
                if 'epc' in record and record['epc'] != existing_record.epc:
                    record['requires_additional_processing'] = True

                # Check and flag 'addedOn' for additional processing if changed
                if 'addedOn' in record and record['addedOn'] != existing_record.addedOn:
                    record['requires_additional_processing'] = True

                # Check and flag 'price' for additional processing if changed
                if 'price' in record and record['price'] != existing_record.price:
                    record['requires_additional_processing'] = True

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
      
    print('finished pre cleanse')
    return records_to_process