from ..models import Property

def upload_data_to_db(new_data):
    # Remove 'id' key from new_data if it exists to avoid conflicts
    for record in new_data:
        record.pop('id', None)

    # First, find out which 'rightmove_id's already exist in the database
    existing_ids = set(Property.objects.filter(
        rightmove_id__in=[record['rightmove_id'] for record in new_data]
    ).values_list('rightmove_id', flat=True))

    # Filter out the data that already exists
    new_records = [record for record in new_data if record['rightmove_id'] not in existing_ids]
    print('new records->', len(new_records))

    # Create Property instances for all new_data
    property_instances = [Property(**record) for record in new_records]
    print('property instances->', len(property_instances))

    # Bulk create new records, this time we know none of them should conflict
    created_instances = Property.objects.bulk_create(property_instances)

    print(f"Inserted {len(created_instances)} new sales records.")
