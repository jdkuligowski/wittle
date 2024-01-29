from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from epc_property_rental.models import Property as RentalProperty
from epc_property_rental.serializers.common import RentalSerializer
from epc_property_data.serializers.common import EPCPropertySerializer
from epc_property_data.models import Property as SalesProperty
from white_primary_details.models import PrimaryDetail
from white_primary_details.serializers.common import PrimaryDetailSerializer
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
from django.shortcuts import get_object_or_404
from geopy.distance import geodesic





from .models import PersonaDetails
from .serializers.common import PersonaSerializer


# ? Rental properties
@api_view(['GET'])
def combined_rental(request):
    area = request.GET.get('area')
    property_type = request.GET.get('propertyType')
    garden = request.GET.get('garden')
    size_min = request.GET.get('size')
    bedrooms_min = request.GET.get('bedrooms_min')
    bedrooms_max = request.GET.get('bedrooms_max')
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
    rightmove_data = RentalProperty.objects.filter(status='Live', postcode__in=filtered_postcodes)
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
        property_data = RentalSerializer(property).data
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


# ? Sales properties

@api_view(['GET'])
def combined_sales(request):
    area = request.GET.get('area')
    property_type = request.GET.get('propertyType')
    garden = request.GET.get('garden')
    size_min = request.GET.get('size')
    bedrooms_min = request.GET.get('bedrooms_min')
    bedrooms_max = request.GET.get('bedrooms_max')
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



class SafeJSONEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, float):
            if math.isinf(obj) or math.isnan(obj):
                return None  # Convert NaN or infinity to None
        return super().default(obj)
    


# @api_view(['GET'])
# def sales_properties_near_school(request):
#     school_id = request.GET.get('school_id')
#     max_distance_miles = 1

#     school = get_object_or_404(PrimaryDetail, id=school_id)
#     school_location = (school.latitude, school.longitude)

#     nearby_properties_info = []
#     persona_data_list = set()  # To avoid duplicate persona entries

#     for property in SalesProperty.objects.filter(status='Live'):
#         property_location = (property.latitude, property.longitude)
#         distance_miles = geodesic(school_location, property_location).miles

#         if distance_miles <= max_distance_miles:
#             distance_meters = distance_miles * 1609.34
#             property_data = EPCPropertySerializer(property).data
#             property_data['distance_to_school_m'] = distance_meters
            
#             persona = PersonaDetails.objects.filter(postcode=property.postcode).first()
#             if persona:
#                 persona_data_list.add(persona)

#             nearby_properties_info.append(property_data)

#     # Manual validation and replacement of invalid floats
#     for property_info in nearby_properties_info:
#         for key, value in property_info.items():
#             if isinstance(value, float) and (math.isinf(value) or math.isnan(value)):
#                 property_info[key] = None

#     # Serialize the persona data
#     serialized_persona_data = [PersonaSerializer(persona).data for persona in persona_data_list]

#     response_data = {
#         'school': PrimaryDetailSerializer(school).data,
#         'property_data': nearby_properties_info,
#         'persona_data_list': serialized_persona_data
#     }

#     # Manually encode the response data
#     encoded_data = json.dumps(response_data, cls=SafeJSONEncoder)

#     # Create the Response with the encoded data
#     return Response(json.loads(encoded_data))

def clean_floats(data):
    if isinstance(data, list):
        return [clean_floats(item) for item in data]
    elif isinstance(data, dict):
        return {k: (None if isinstance(v, float) and (math.isnan(v) or math.isinf(v)) else clean_floats(v)) for k, v in data.items()}
    else:
        return data


@api_view(['GET'])
def sales_properties_near_school(request):
    school_id = request.GET.get('school_id')
    max_distance_miles = 1

    school = get_object_or_404(PrimaryDetail, id=school_id)
    school_serialized = PrimaryDetailSerializer(school).data
    school_location = (school.latitude, school.longitude)

    combined_data = []

    for property in SalesProperty.objects.filter(status='Live'):
        property_location = (property.latitude, property.longitude)
        distance_miles = geodesic(school_location, property_location).miles

        if distance_miles <= max_distance_miles:
            persona = PersonaDetails.objects.filter(postcode=property.postcode).first()
            persona_serialized = PersonaSerializer(persona).data if persona else None
            property_serialized = EPCPropertySerializer(property).data
            property_serialized['distance_to_school_m'] = distance_miles * 1609.34

            combined_entry = {
                'property_data': property_serialized,
                'school': school_serialized,
                'persona_data_list': persona_serialized,             
                'distance_meters': distance_miles * 1609.34  # For sorting purposes

            }
            combined_data.append(combined_entry)

    # Sort the combined_data list by distance in meters
    cleaned_data = clean_floats(combined_data)
    sorted_data = sorted(cleaned_data, key=lambda x: x['distance_meters'])

    return Response(sorted_data)
