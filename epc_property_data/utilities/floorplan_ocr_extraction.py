import re
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
import requests
import io
from PIL import Image
import environ



env = environ.Env()

endpoint = env('AZURE_OCR_ENDPOINT')
subscription_key = env('AZURE_OCR_SUBSCRIPTION')
# image_url = 'https://media.rightmove.co.uk/251k/250814/86360079/250814_RX295400_FLP_00_0000.gif'


def extract_floorplans(image_url):
    
    # Skip if the URL doesn't include 'rightmove', or is a .gif or .pdf file
    if image_url.endswith(('.gif')):
        return extract_gif(image_url)
    else:
        return extract_png_jpeg(image_url)
        



def extract_largest_floor_area(ocr_text):
    # Define a regex pattern for square footage
    sq_ft_pattern = re.compile(r'(\d+(?:\.\d+)?)\s*(sq\.ft|sq\. ft|sq. feet|sq ft|sqft|square ft|ft|feet)', re.IGNORECASE)

    largest_floor_area = 0
    largest_floor_area_line = None

    for line in ocr_text.split('\n'):
        if 'ft' in line.lower() or 'feet' in line.lower():
            matches = sq_ft_pattern.findall(line)
            for match in matches:
                area = float(match[0])
                if area > largest_floor_area:
                    largest_floor_area = area
                    largest_floor_area_line = line

    return largest_floor_area_line, largest_floor_area



def extract_png_jpeg(image_url):
    # Authenticate the client
    computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))

    # Perform OCR on the image from the URL
    read_results = computervision_client.read(url=image_url, raw=True)

    # Get the operation location (URL with an ID at the end)
    operation_location_remote = read_results.headers["Operation-Location"]
    operation_id = operation_location_remote.split("/")[-1]

    # Call the "GET" API and wait for it to retrieve the results
    while True:
        get_printed_text_results = computervision_client.get_read_result(operation_id)
        if get_printed_text_results.status.lower() not in ['notstarted', 'running']:
            break

    # Initialize an empty string to store OCR results
    ocr_text = ""

    # Process the text extracted by OCR
    if get_printed_text_results.status == OperationStatusCodes.succeeded:
        for text_result in get_printed_text_results.analyze_result.read_results:
            for line in text_result.lines:
                ocr_text += line.text + "\n"

    # print(ocr_text)
    # Extract the largest floor area
    _, largest_floor_area = extract_largest_floor_area(ocr_text)
    return largest_floor_area


def extract_gif(image_url): 

    # Authenticate the client
    computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))

    # Download the image content
    response = requests.get(image_url)
    if response.status_code != 200:
        print("Failed to download the floorplan image gif")
        return None, None

    # Load the image using PIL
    image = Image.open(io.BytesIO(response.content))

    # Convert GIF to PNG
    if image.format == 'GIF':
        image = image.convert('RGB')

    # Convert the image to a byte stream
    image_stream = io.BytesIO()
    image.save(image_stream, format='PNG')
    image_stream.seek(0)

    # Perform OCR using Azure Computer Vision API
    read_results = computervision_client.read_in_stream(image_stream, raw=True)

    # Get the operation location (URL with an ID at the end)
    operation_location_remote = read_results.headers["Operation-Location"]
    operation_id = operation_location_remote.split("/")[-1]

    # Call the "GET" API and wait for it to retrieve the results
    while True:
        get_printed_text_results = computervision_client.get_read_result(operation_id)
        if get_printed_text_results.status.lower() not in ['notstarted', 'running']:
            break

    # Initialize an empty string to store OCR results
    ocr_text = ""

    # Process the text extracted by OCR
    if get_printed_text_results.status == OperationStatusCodes.succeeded:
        for text_result in get_printed_text_results.analyze_result.read_results:
            for line in text_result.lines:
                ocr_text += line.text + "\n"

    # print(ocr_text)
    # Extract the largest floor area
    _, largest_floor_area = extract_largest_floor_area(ocr_text)
    return largest_floor_area








