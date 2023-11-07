import re
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
import environ

env = environ.Env()


def extract_epc_values(image_url):
    # Skip if the URL doesn't include 'rightmove', or is a .gif or .pdf file
    if 'rightmove' not in image_url or image_url.endswith(('.gif', '.pdf')):
        print(f'Skipped URL: {image_url}')
        return None, None
    

    print('extracting epc values')

    endpoint = env('AZURE_OCR_ENDPOINT')
    subscription_key = env('AZURE_OCR_SUBSCRIPTION')

    # Authenticate the client
    computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))
    print('loaded computervision')

    # Perform OCR on the image from the URL
    read_results = computervision_client.read(url=image_url, raw=True)
    print('results read')

    # Get the operation location (URL with an ID at the end)
    operation_location_remote = read_results.headers["Operation-Location"]
    operation_id = operation_location_remote.split("/")[-1]
    print('ocr id extracted')

    # Call the "GET" API and wait for it to retrieve the results
    while True:
        get_printed_text_results = computervision_client.get_read_result(operation_id)
        if get_printed_text_results.status.lower() not in ['notstarted', 'running']:
            break

    # Initialize variables
    two_digit_values = []
    environmental_present = False
    current_epc = None
    potential_epc = None
    values_with_x_coords = []

    # Check the OCR results
    if get_printed_text_results.status == OperationStatusCodes.succeeded:
        for text_result in get_printed_text_results.analyze_result.read_results:
            for line in text_result.lines:
                if 'environmental' in line.text.lower():
                    environmental_present = True
                    break  # Break the inner loop, not the outer loop

    # If 'environmental' is present, process only the left side of the image
    if environmental_present:
        for text_result in get_printed_text_results.analyze_result.read_results:
            for line in text_result.lines:
                # Get the x-coordinate (use the first x-coordinate of the bounding box)
                x_coord = line.bounding_box[0]
                matches = re.findall(r'(?<![\d+\-()/])\b\d{2}\b(?![\d+\-()/])', line.text)
                for match in matches:
                    # Add the number and its x-coordinate to the list
                    values_with_x_coords.append((int(match), x_coord))

        # Sort by x-coordinate, then by the number itself
        values_with_x_coords.sort(key=lambda x: (x[1], x[0]))

        # Take the two left-most values as 'Current' and 'Potential'
        if len(values_with_x_coords) >= 2:
            current_epc, potential_epc = values_with_x_coords[0][0], values_with_x_coords[1][0]
        elif len(values_with_x_coords) == 1:
            current_epc = potential_epc = values_with_x_coords[0][0]
    else:
        # For images without 'environmental', use the original logic
        for text_result in get_printed_text_results.analyze_result.read_results:
            for line in text_result.lines:
                matches = re.findall(r'(?<![\d+\-()/])\b\d{2}\b(?![\d+\-()/])', line.text)
                for match in matches:
                    # Add the match to our list of values
                    two_digit_values.append(int(match))  # Convert to int to facilitate comparison

        # Sort the list and assign the first value to 'Current' and the second to 'Potential'
        two_digit_values.sort()
        if len(two_digit_values) >= 2:
            current_epc, potential_epc = two_digit_values[:2]
        elif len(two_digit_values) == 1:
            current_epc = potential_epc = two_digit_values[0]

        # print('OCR -', 'Current:', current_epc, 'Potential:', potential_epc)

    return current_epc, potential_epc