from ..models import Property
from django.db import transaction


def upload_data_to_db(new_data):
    print('started rental upload')
    # Remove 'id' key from new_data if it exists to avoid conflicts
    for record in new_data:
        record.pop('id', None)

    # First, find out which 'rightmove_id's already exist in the database
    existing_ids = set(Property.objects.filter(
        rightmove_id__in=[record['rightmove_id'] for record in new_data]
    ).values_list('rightmove_id', flat=True))

    # Filter out the data that already exists
    new_records = [
        record for record in new_data if record['rightmove_id'] not in existing_ids]
    print('new rental records->', len(new_records))

    # Create Property instances
    property_instances = [Property(**record) for record in new_records]
    print('Rental property instances ->', len(property_instances))

    try:
        # Attempt to bulk create new records
        Property.objects.bulk_create(property_instances)
        print(f"Inserted {len(property_instances)} new rental records.")
    except Exception as e:
        print(f"Bulk insert failed: {e}")
        print("Inserting records individually...")

        # Insert records individually
        for instance in property_instances:
            try:
                with transaction.atomic():
                    instance.save()
            except Exception as e:
                print(f"Failed to insert record: {e} - {instance}")

        # Optionally, count and print the number of successfully inserted records
        success_count = Property.objects.filter(
            rightmove_id__in=[record['rightmove_id'] for record in new_records]
        ).count()
        print(f"Successfully inserted {success_count} records individually.")
