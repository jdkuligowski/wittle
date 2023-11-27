from ..models import Property
from django.db import transaction
from django.utils import timezone



# this is a function to handle the daily data downloads, which will allow us to upload new data and edit anything that has changed
def upload_data_to_db(new_records, updated_records):
    print('started sales upload')

    # Bulk create new records
    if new_records:
        new_property_instances = [Property(**record) for record in new_records]
        print('Creating new sales property instances ->', len(new_property_instances))
        Property.objects.bulk_create(new_property_instances)

    # Update existing records
    if updated_records:
        with transaction.atomic():
            for record in updated_records:
                rightmove_id = record.get('rightmove_id')

                if rightmove_id is not None:
                    # Update all fields from the record
                    updated_fields = {k: v for k, v in record.items() if k != 'revised_added'}

                    # Update 'revised_added' only if it's not None/Null
                    if 'revised_added' in record and record['revised_added'] is not None:
                        updated_fields['revised_added'] = record['revised_added']

                    # Update 'date_added_db' only if it's not None/Null
                    if 'date_added_db' in record and record['date_added_db'] is None:
                        updated_fields['date_added_db'] = record['date_added_db']

                    Property.objects.filter(rightmove_id=rightmove_id).update(**updated_fields)
                    print(f'Updated record for rightmove_id: {rightmove_id}')

    print('completed sales upload')




# this function allows us to do the same as above, but also set the properties that aren;t in the weekly download to 'off market'
def upload_full_data_to_db(new_records, updated_records, all_rightmove_ids, extracted_rightmove_ids):
    print('started full sales upload')

    # Bulk create new records
    if new_records:
        new_property_instances = [Property(**record) for record in new_records]
        print('Creating new sales property instances ->', len(new_property_instances))
        Property.objects.bulk_create(new_property_instances)

    # Update existing records
    updated_rightmove_ids = set(record.get('rightmove_id') for record in updated_records if record.get('rightmove_id') is not None)
    if updated_records:
        with transaction.atomic():
            for record in updated_records:
                rightmove_id = record.get('rightmove_id')
                if rightmove_id is not None:
                    updated_fields = {k: v for k, v in record.items() if k != 'revised_added'}
                    if 'revised_added' in record and record['revised_added'] is not None:
                        updated_fields['revised_added'] = record['revised_added']
                    Property.objects.filter(rightmove_id=rightmove_id).update(**updated_fields)
                    print(f'Updated record for rightmove_id: {rightmove_id}')

    # Update existing records as 'Live' if they are in the extract
    ids_to_mark_live = all_rightmove_ids.intersection(extracted_rightmove_ids)
    if ids_to_mark_live:
        Property.objects.filter(rightmove_id__in=ids_to_mark_live).update(status='Live')
        print(f'Marked {len(ids_to_mark_live)} properties as Live')

    # Set 'status' to 'Off Market' for records in the database but not in the extract
    ids_to_mark_off_market = all_rightmove_ids.difference(extracted_rightmove_ids)
    current_date = timezone.now().date()

    if ids_to_mark_off_market:
        Property.objects.filter(rightmove_id__in=ids_to_mark_off_market).update(status='Off Market', week_taken_off_market=current_date)
        print(f'Marked {len(ids_to_mark_off_market)} properties as Off Market')


    print('completed full sales upload')