import re
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
import environ

env = environ.Env()


# Function to perform OCR and extract EPC values
def extract_epc_values(image_url):
    
    endpoint = env('AZURE_OCR_ENDPOINT')
    subscription_key = env('AZURE_OCR_SUBSCRIPTION')


    # Authenticate the client
    computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))

    # Perform OCR on the image from the URL
    read_results = computervision_client.read(url=image_url, raw=True)
    # ... rest of the OCR logic ...

    # Get the operation location (URL with an ID at the end)
    operation_location_remote = read_results.headers["Operation-Location"]

    # Grab the ID from the URL
    operation_id = operation_location_remote.split("/")[-1]

    # Call the "GET" API and wait for it to retrieve the results
    while True:
        get_printed_text_results = computervision_client.get_read_result(operation_id)
        if get_printed_text_results.status.lower() not in ['notstarted', 'running']:
            break

    # Initialize a list to collect potential two-digit values
    two_digit_values = []

    # Check the OCR results and extract two-digit numbers
    if get_printed_text_results.status == OperationStatusCodes.succeeded:
        for text_result in get_printed_text_results.analyze_result.read_results:
            for line in text_result.lines:
                # Find standalone two-digit numbers that are not adjacent to '+', '/', '-', '(', ')'
                matches = re.findall(r'(?<![\d+\-()/])\b\d{2}\b(?![\d+\-()/])', line.text)
                for match in matches:
                    # Add the match to our list of values
                    two_digit_values.append(int(match))  # Convert to int to facilitate comparison

        # Sort the list and assign the first value to 'Current' and the second to 'Potential'
        two_digit_values.sort()
        if len(two_digit_values) >= 2:
            # 'Current' should be the smaller value, 'Potential' should be the larger (or equal)
            current_value, potential_value = two_digit_values[:2]
        elif len(two_digit_values) == 1:
            # In case there's only one value, we can assume it's both the current and potential value
            current_value = potential_value = two_digit_values[0]

    # Return the 'current_epc' and 'potential_epc' values
    return current_value, potential_value
