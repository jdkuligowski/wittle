import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import openai

@csrf_exempt  # Temporarily disable CSRF protection for demo purposes
def generate_property_listing(request):
    if request.method == "POST":
        details = json.loads(request.body.decode('utf-8'))["details"]
        print(details)
        # Your API Key for OpenAI
        openai.api_key = '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'

        # Constructing messages
        messages = [
            {"role": "system", "content": "You are a helpful assistant that generates property listings."},
            {"role": "user", "content": f"Generate a descriptive, concise, and easy-to-read property listing for a flat located in London, with ONLY 2 paragraphs using ONLY the following details, NOT including any additional features or assumptions, WITHOUT repeating anything and ONLY including the elements that create a positive message:\n"
                f"Location: {details['location']}\n"
                f"Size: {details['size']}\n"
                f"Type: {details['property_type']}\n"
                f"Bedrooms: {details['bedrooms']}\n"
                f"Bathrooms: {details['bathrooms']}\n"
                f"Amenities: {details['amenities']}\n"
                f"Channel: {details['channel']}\n"
                f"Additional info: {details['additional_info']}\n"
                f"Price: £{details['price']}\n"
                f"Restaurants: {details['restaurants']}\n"
                f"Pubs: {details['pubs']}\n"
                f"Tube Stations: {details['tube']}\n"
                f"Train Stations: {details['trains']}\n"
                f"Parks: {details['parks']}\n"
                f"Gyms: {details['parks']}\n"
                f"EV Charging: {details['evs']}\n"
            }
        ]

        # Making API request
        response = openai.ChatCompletion.create(
            # model="gpt-3.5-turbo",
            model="gpt-4",
            messages=messages,
            max_tokens=350,
            temperature=0.3
        )

        # Extracting the assistant’s reply from the response
        output = response['choices'][0]['message']['content'].strip()
        
        return JsonResponse({"message": output})

    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)



# @csrf_exempt  # Temporarily disable CSRF protection for demo purposes
# def generate_property_listing(request):
#     if request.method == "POST":
#         details = json.loads(request.body.decode('utf-8'))["details"]
#         print(details)
#         # Your API Key for OpenAI
#         openai.api_key = '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'

#         # Constructing messages
#         prompt = (f"Generate a descriptive, concise, and easy-to-read property listing for a flat located in London, with ONLY 2 paragraphs using ONLY the following details...\n"
#                   f"Location: {details['location']}\n"
#                   f"Size: {details['size']}\n"
#                   f"Type: {details['property_type']}\n"
#                   f"Bedrooms: {details['bedrooms']}\n"
#                   f"Bathrooms: {details['bathrooms']}\n"
#                   f"Amenities: {details['amenities']}\n"
#                   f"Channel: {details['channel']}\n"
#                   f"Additional info: {details['additional_info']}\n"
#                   f"Price: £{details['price']}\n"
#                   f"Restaurants: {details['restaurants']}\n"
#                   f"Pubs: {details['pubs']}\n"
#                   f"Tube Stations: {details['tube']}\n"
#                   f"Parks: {details['parks']}\n"
#                   f"Gyms: {details['gyms']}\n"  # Changed from 'parks' to 'gyms'
#                   f"EV Charging: {details['evs']}\n")

#         # Making API request
#         response = openai.Completion.create(
#             model="davinci-002",
#             prompt=prompt,
#             max_tokens=250,
#             temperature=0.3
#         )

#         # Extracting the assistant’s reply from the response
#         output = response.choices[0].text.strip()
#         return JsonResponse({"message": output})

#     return JsonResponse({"error": "Only POST requests are allowed"}, status=405)
