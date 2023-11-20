# pylint: disable=import-error

import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from openai import OpenAI
import environ




@csrf_exempt 
def generate_property_listing(request):
    if request.method == "POST":
        details = json.loads(request.body.decode('utf-8'))["details"]
        print(details)
        # Your API Key for OpenAI
        env = environ.Env()
        # openai.api_key = env('OPEN_AI_KEY')

        client = OpenAI(
          api_key=env('OPEN_AI_KEY')
, 
        )

        # Constructing messages
        messages = [
            {"role": "system", "content": "You are a property expert that generates property listings."},
            {"role": "user", "content": f"Generate a descriptive, concise, and easy-to-read property listing for a flat located in London, with ONLY 2 paragraphs. The first paragraph should focus exclusively on the property details including location, size, type, bedrooms, bathrooms, amenities, channel, additional info, price and MUST include the phrases somewhere. The second paragraph should focus solely on the area details such as restaurants, pubs, tube stations, train stations, parks, gyms, and EV charging. Use ONLY the following details, NOT including any additional features or assumptions, WITHOUT repeating anything and ONLY including the elements that create a positive message:\n"
                f"Location: {details['location']}\n"
                f"Size: {details['size']}\n"
                f"Type: {details['property_type']}\n"
                f"Bedrooms: {details['bedrooms']}\n"
                f"Bathrooms: {details['bathrooms']}\n"
                f"Amenities: {details['amenities']}\n"
                f"Channel: {details['channel']}\n"
                f"Phrases: {details['phrases']}\n"
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

        # prompt = "\n".join([f"{message['role']}: {message['content']}" for message in messages])


        # Making API request
        completion = client.chat.completions.create(
            # model="gpt-3.5-turbo",
            model="gpt-4",
            messages=messages,
            # prompt=prompt,
            max_tokens=400,
            temperature=0.4
        )
        print(completion)

        # Extracting the assistant’s reply from the response
        # output = completion['choices'][0]['message']['content'].strip()

        # return JsonResponse({"message": output})
        if completion and completion.choices:
            # Access the first Choice object
            choice = completion.choices[0]
            # Access the ChatCompletionMessage object
            chat_message = choice.message
            # Access the content attribute
            output = chat_message.content
        else:
            output = "No response received."

        return JsonResponse({"message": output})

    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)
