from ..models import Property
from epc_favourites.models import Favourite
from django.db import transaction
from django.utils import timezone
from epc_property_rental.utilities.rental_email_confirmation import send_daily_upload_confirmation_email, send_weekly_upload_confirmation_email
from epc_property_rental.utilities.updating_fields import update_controller
from concurrent.futures import ThreadPoolExecutor
import time


# this is a function to handle the daily data downloads, which will allow us to upload new data and edit anything that has changed
def upload_data_to_db(new_records, updated_records, raw_data):
    print('started rental upload')

    # Bulk create new records
    # if new_records:
    #     new_property_instances = [Property(**record) for record in new_records]
    #     print('Creating new rental property instances ->', len(new_property_instances))
    #     Property.objects.bulk_create(new_property_instances)
    # Bulk create new records
    # Process new records in chunks and batches
    if new_records:
        new_property_instances = [Property(**record) for record in new_records]
        print('Creating new rental property instances ->', len(new_property_instances))

        chunk_size = 500  # Break data into smaller chunks
        batch_size = 100   # Control batch size per bulk_create operation
        for i in range(0, len(new_property_instances), chunk_size):
            chunk = new_property_instances[i:i + chunk_size]
            try:
                Property.objects.bulk_create(chunk, batch_size=batch_size)
                print(f"Successfully uploaded chunk {i // chunk_size + 1}")
            except Exception as e:
                print(f"Error during bulk create for chunk {i // chunk_size + 1}: {e}")

    # Update existing records within a transaction
    if updated_records:
        with transaction.atomic():
            update_controller(updated_records)

    # Send confirmation email
    send_daily_upload_confirmation_email(raw_data, new_records, updated_records)

    print('completed rental upload')





# Retry function for handling transient errors during bulk create
def bulk_create_with_retries(instances, batch_size=100, retries=3):
    for attempt in range(retries):
        try:
            Property.objects.bulk_create(instances, batch_size=batch_size)
            print("Batch successfully uploaded")
            return  # Exit after a successful upload
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            time.sleep(2 ** attempt)  # Exponential backoff
    print("Failed after all retries.")

# Main upload function with chunking and batching
def upload_full_data_to_db(new_records, updated_records, all_rightmove_ids, extracted_rightmove_ids, raw_data, live_rightmove_ids):
    print('started rental upload')

    # Bulk create new records in chunks with retry
    if new_records:
        new_property_instances = [Property(**record) for record in new_records]
        print('Creating new rental property instances ->', len(new_property_instances))

        chunk_size = 1000  # Divide new records into chunks
        batch_size = 100   # Batch size per bulk_create operation
        for i in range(0, len(new_property_instances), chunk_size):
            chunk = new_property_instances[i:i + chunk_size]
            print(f"Uploading chunk {i // chunk_size + 1}")
            bulk_create_with_retries(chunk, batch_size=batch_size, retries=3)  # Retry function for each chunk

    # Process updated records in batches with multithreading
    if updated_records:
        batch_size = 250  # Size of each batch for updated records
        batches = [updated_records[i:i + batch_size] for i in range(0, len(updated_records), batch_size)]
        
        # Execute update in parallel using ThreadPoolExecutor
        with ThreadPoolExecutor(max_workers=10) as executor:  # Adjust workers based on system capability
            executor.map(update_controller, batches)

    # Update properties as 'Live' and 'Off Market' in a transaction block
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

    # Send confirmation email
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