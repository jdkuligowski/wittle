from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from epc_property_rental.models import Property as RentalProperty
from epc_property_rental.serializers.common import RentalSerializer
from epc_property_data.serializers.common import EPCPropertySerializer
from epc_property_data.models import Property as SalesProperty
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from math import isinf, isnan
import math
from django.db.models import Q
from django.core.cache import cache
import re
from django.db import models
from django.db.models import Avg
from django.core.serializers.json import DjangoJSONEncoder
import json



from .models import PersonaDetails
from .serializers.common import PersonaSerializer


# ? Rental properties
@api_view(['GET'])
def combined_rental(request):
    area = request.GET.get('area')
    persona = request.GET.get('persona')
    property_type = request.GET.get('propertyType')
    garden = request.GET.get('garden')
    bedrooms_min = request.GET.get('min_bedrooms')
    bedrooms_max = request.GET.get('max_bedrooms')
    rental_price_min = request.GET.get('rental_price_min')
    rental_price_max = request.GET.get('rental_price_max')


    # Convert bedroom and price parameters to integers, handling 'null' string
    try:
        bedrooms_min = int(bedrooms_min) if bedrooms_min and bedrooms_min != 'null' else None
        bedrooms_max = int(bedrooms_max) if bedrooms_max and bedrooms_max != 'null' else None
        rental_price_min = int(rental_price_min) if rental_price_min and rental_price_min != 'null' else None
        rental_price_max = int(rental_price_max) if rental_price_max and rental_price_max != 'null' else None

    except ValueError:
        return Response({'error': 'Invalid input for bedrooms or price'}, status=400)


    # # Filter properties based on the postcode and status
    # rightmove_data = RentalProperty.objects.filter(status='Live')




    # Filter postcode data based on the area and persona
    persona_query = PersonaDetails.objects.all()
    sorting_criteria = {
        'Young families': '-young_families',
        'Young professional': '-young_professional',
        'Vibes': '-vibes',
        'Commuter convenience': '-commuter_convenience'
    }
    sort_field = sorting_criteria.get(persona)
    if sort_field:
        persona_query = persona_query.order_by(sort_field)

    if area:
        persona_query = persona_query.filter(lsoa=area)

    # Extract postcodes from the first 500 persona_data entries
    
    postcodes = persona_query.values_list('postcode', flat=True)[:2000]
    # postcodes = persona_query.values_list('postcode', flat=True)

    # Filter rightmove_data by these postcodes
    rightmove_data = RentalProperty.objects.filter(
        status='Live', postcode__in=postcodes
    )
    
    # Apply additional filters to rightmove_data
    if bedrooms_min:
        rightmove_data = rightmove_data.filter(bedrooms__gte=bedrooms_min)
    if bedrooms_max:
        rightmove_data = rightmove_data.filter(bedrooms__lte=bedrooms_max)
    if rental_price_min:
        rightmove_data = rightmove_data.filter(price_numeric__gte=rental_price_min)
    if rental_price_max:
        rightmove_data = rightmove_data.filter(price_numeric__lte=rental_price_max)
    if garden:
        rightmove_data = rightmove_data.filter(features__contains='Garden')
    if property_type:
        rightmove_data = rightmove_data.filter(propertyType=property_type)

    combined_data = []

    for property in rightmove_data:
        # Find corresponding entries in persona_data by postcode
        persona_entries = persona_query.filter(postcode=property.postcode)

        # Check and clean any non-compliant float values in property
        for field in property._meta.get_fields():
            if isinstance(field, models.FloatField):
                value = getattr(property, field.name)
                if value is not None and (isnan(value) or isinf(value)):
                    setattr(property, field.name, None)  # or a default value


        # Combine the data
        combined_entry = {
            'property_data': RentalSerializer(property).data,
            'persona_data_list': [PersonaSerializer(persona_entry).data for persona_entry in persona_entries]
        }

        combined_data.append(combined_entry)

    return Response(combined_data)


# ? Sales properties

@api_view(['GET'])
def combined_sales(request):
    area = request.GET.get('area')
    property_type = request.GET.get('propertyType')
    garden = request.GET.get('garden')
    size_min = request.GET.get('size')
    bedrooms_min = request.GET.get('min_bedrooms')
    bedrooms_max = request.GET.get('max_bedrooms')
    rental_price_min = request.GET.get('rental_price_min')
    rental_price_max = request.GET.get('rental_price_max')

    # Convert bedroom and price parameters to integers, handling 'null' string
    try:
        bedrooms_min = int(bedrooms_min) if bedrooms_min and bedrooms_min != 'null' else None
        bedrooms_max = int(bedrooms_max) if bedrooms_max and bedrooms_max != 'null' else None
        rental_price_min = int(rental_price_min) if rental_price_min and rental_price_min != 'null' else None
        rental_price_max = int(rental_price_max) if rental_price_max and rental_price_max != 'null' else None
        size_min = float(size_min) if size_min and size_min != 'null' else None
    except ValueError:
        return Response({'error': 'Invalid input for bedrooms or price'}, status=400)

    # Mapping frontend parameters to model fields
    lifestyle_mapping = {
        'parks': 'park_area_percentile',
        'playgrounds': 'play_area_percentile',
        'gyms': 'gym_percentile',
        'restaurants': 'restaurant_percentile',
        'pubs': 'pub_percentile',
        'evs': 'ev_percentile',
        'tubes': 'tube_percentile',
        'secondaries': 'secondary_percentile',
        'primaries': 'primary_percentile',
        'crime': 'crime_percentile',
    }

    # Filter PersonaDetails based on area and get the list of postcodes
    persona_query = PersonaDetails.objects.filter(district=area) if area else PersonaDetails.objects.all()
    filtered_postcodes = persona_query.values_list('postcode', flat=True)

    # Filter rightmove_data based on the provided parameters
    rightmove_data = SalesProperty.objects.filter(status='Live', postcode__in=filtered_postcodes)
    if bedrooms_min:
        rightmove_data = rightmove_data.filter(bedrooms__gte=bedrooms_min)
    if bedrooms_max:
        rightmove_data = rightmove_data.filter(bedrooms__lte=bedrooms_max)
    if rental_price_min:
        rightmove_data = rightmove_data.filter(price_numeric__gte=rental_price_min)
    if rental_price_max:
        rightmove_data = rightmove_data.filter(price_numeric__lte=rental_price_max)
    if garden:
        rightmove_data = rightmove_data.filter(features__icontains='garden')
    if property_type:
        rightmove_data = rightmove_data.filter(propertyType=property_type)
    if size_min is not None:
        rightmove_data = [prop for prop in rightmove_data if prop.size and 'nan' not in prop.size.lower() and float(prop.size.split(',')[0]) >= size_min]

    combined_data = []

    for property in rightmove_data:
        lifestyle_scores = []
        persona_entry = persona_query.filter(postcode=property.postcode).first()

        if persona_entry:
            for frontend_param, model_field in lifestyle_mapping.items():
                element_selected = request.GET.get(frontend_param) == 'true'
                element_score = float(request.GET.get(f'{frontend_param}_score', 0))

                if element_selected:
                    percentile_value = getattr(persona_entry, model_field, None)
                    if percentile_value is not None and not math.isnan(percentile_value) and not math.isinf(percentile_value):
                        calculated_score = element_score * percentile_value
                        lifestyle_scores.append(calculated_score)
                        # print(f"Calculated Score for {frontend_param}: {calculated_score}")  # Debugging print

        overall_lifestyle_score = sum(lifestyle_scores) / len(lifestyle_scores) if lifestyle_scores else 0
        overall_lifestyle_score = 0 if math.isnan(overall_lifestyle_score) or math.isinf(overall_lifestyle_score) else overall_lifestyle_score
        # print(f"Overall Lifestyle Score: {overall_lifestyle_score}")  # Debugging print

        # Prepare property data
        property_data = EPCPropertySerializer(property).data
        for key, value in property_data.items():
            if isinstance(value, float) and (math.isinf(value) or math.isnan(value)):
                property_data[key] = 0

        combined_entry = {
            'property_data': property_data,
            'persona_data_list': [PersonaSerializer(persona_entry).data] if persona_entry else [],
            'overall_lifestyle_score': overall_lifestyle_score
        }

        combined_data.append(combined_entry)

   # Pre-process data to ensure JSON compliance
    cleaned_data = json.loads(json.dumps(combined_data, cls=DjangoJSONEncoder))

    return Response(cleaned_data)
