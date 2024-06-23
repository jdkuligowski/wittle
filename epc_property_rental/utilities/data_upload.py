from ..models import Property
from epc_favourites.models import Favourite
from django.db import transaction
from django.utils import timezone
from epc_property_rental.utilities.rental_email_confirmation import send_daily_upload_confirmation_email, send_weekly_upload_confirmation_email
from epc_property_rental.utilities.updating_fields import update_controller
from concurrent.futures import ThreadPoolExecutor


# this is a function to handle the daily data downloads, which will allow us to upload new data and edit anything that has changed
def upload_data_to_db(new_records, updated_records, raw_data):
    print('started rental upload')

    # Bulk create new records
    if new_records:
        new_property_instances = [Property(**record) for record in new_records]
        print('Creating new rental property instances ->', len(new_property_instances))
        Property.objects.bulk_create(new_property_instances)

    # Update existing records
    if updated_records:
        with transaction.atomic():
            update_controller(updated_records)

    # send email confirming actions
    send_daily_upload_confirmation_email(raw_data, new_records, updated_records)

    print('completed rental upload')



# this function allows us to do the same as above, but also set the properties that aren;t in the weekly download to 'off market'
def upload_full_data_to_db(new_records, updated_records, all_rightmove_ids, extracted_rightmove_ids, raw_data, live_rightmove_ids):
    print('started rental upload')

    # Bulk create new records
    if new_records:
        new_property_instances = [Property(**record) for record in new_records]
        print('Creating new rental property instances ->', len(new_property_instances))
        Property.objects.bulk_create(new_property_instances)


    if updated_records:
        batch_size = 50  # Adjust batch size based on your data and system resources
        batches = [updated_records[i:i + batch_size] for i in range(0, len(updated_records), batch_size)]
        
        with ThreadPoolExecutor(max_workers=15) as executor:  # Adjust number of workers based on your system capabilities
            executor.map(update_controller, batches)

    # Update properties as 'Live' and 'Off Market' based on the extract
    with transaction.atomic():
        ids_to_mark_live = all_rightmove_ids.intersection(extracted_rightmove_ids)
        if ids_to_mark_live:
            Property.objects.filter(rightmove_id__in=ids_to_mark_live).update(status='Live', week_taken_off_market=None)
            print(f'Marked {len(ids_to_mark_live)} properties as Live')

        ids_to_mark_off_market = live_rightmove_ids.difference(extracted_rightmove_ids)
        current_date = timezone.now().date()
        if ids_to_mark_off_market:
            Property.objects.filter(rightmove_id__in=ids_to_mark_off_market).update(status='Off Market', week_taken_off_market=current_date)
            print(f'Marked {len(ids_to_mark_off_market)} properties as Off Market')

        # # After property updates, sync status to Favourites
        # properties_to_sync = Property.objects.filter(rightmove_id__in=all_rightmove_ids)
        # for prop in properties_to_sync:
        #     Favourite.objects.filter(rightmove_id=prop.rightmove_id).update(market_status=prop.status)
        # print(f'Updated market status in Favourite for {properties_to_sync.count()} properties')


    # send email confirming actions
    send_weekly_upload_confirmation_email(raw_data, new_records, updated_records, ids_to_mark_live, ids_to_mark_off_market)

    print('completed full rental upload')


# # this function allows us to do the same as above, but also set the properties that aren;t in the weekly download to 'off market'
# def upload_full_data_to_db(new_records, updated_records, all_rightmove_ids, extracted_rightmove_ids, raw_data, live_rightmove_ids):
#     print('started rental upload')

#     # Bulk create new records
#     if new_records:
#         new_property_instances = [Property(**record) for record in new_records]
#         print('Creating new rental property instances ->', len(new_property_instances))
#         Property.objects.bulk_create(new_property_instances)

#     if updated_records:
#         with transaction.atomic():
#             update_controller(updated_records)

#     # Update existing records as 'Live' if they are in the extract
#     ids_to_mark_live = all_rightmove_ids.intersection(extracted_rightmove_ids)
#     if ids_to_mark_live:
#         Property.objects.filter(rightmove_id__in=ids_to_mark_live).update(status='Live', week_taken_off_market=None)
#         print(f'Marked {len(ids_to_mark_live)} properties as Live')

#     # Set 'status' to 'Off Market' for records in the database but not in the extract
#     ids_to_mark_off_market = live_rightmove_ids.difference(extracted_rightmove_ids)
#     current_date = timezone.now().date()

#     if ids_to_mark_off_market:
#         Property.objects.filter(rightmove_id__in=ids_to_mark_off_market).update(status='Off Market', week_taken_off_market=current_date)
#         print(f'Marked {len(ids_to_mark_off_market)} properties as Off Market')

#     # send email confirming actions
#     send_weekly_upload_confirmation_email(raw_data, new_records, updated_records, ids_to_mark_live, ids_to_mark_off_market)

#     print('completed full rental upload')