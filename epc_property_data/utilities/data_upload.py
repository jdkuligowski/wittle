from ..models import Property

def upload_data_to_db(combined_data):
    for record in combined_data:
        Property.objects.update_or_create(defaults=record, id=record['id'])  
