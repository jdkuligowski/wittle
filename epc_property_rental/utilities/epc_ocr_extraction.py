import re
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
import environ
import requests
from pdf2image import convert_from_bytes
from PyPDF2 import PdfReader
import cv2
import numpy as np
import io
from PIL import Image

env = environ.Env()

endpoint = env('AZURE_OCR_ENDPOINT')
subscription_key = env('AZURE_OCR_SUBSCRIPTION')
template_image_url = 'https://media.rightmove.co.uk/81k/80905/141774911/80905_BSL210144_L_EPCGRAPH_00_0000.png'



def extract_epc_values(image_url):
    
    # Skip if the URL doesn't include 'rightmove', or is a .gif or .pdf file
    if 'rightmove' not in image_url or image_url.endswith(('.gif')):
        # print(f'Skipped URL: {image_url}')
        return None, None
    elif image_url.endswith(('.pdf')):
        return process_pdf(image_url)
    else:
        return extract_png_jpeg(image_url)
        



def process_pdf(pdf_url):
    response = requests.get(pdf_url)
    if response.status_code != 200:
        print("Failed to download the PDF")
        return None, None

    # Read the PDF and count the number of pages
    pdf_reader = PdfReader(io.BytesIO(response.content))
    num_pages = len(pdf_reader.pages)

    if num_pages > 1:
        return extract_pdf_values(pdf_url)
        # If the PDF has more than one page, process the first page

    else:
        # If the PDF has only one page, use a different method
        return extract_png_jpeg(pdf_url)




def template_match(source_image, template_image):
    # Convert images to grayscale
    source_gray = cv2.cvtColor(source_image, cv2.COLOR_BGR2GRAY)
    template_gray = cv2.cvtColor(template_image, cv2.COLOR_BGR2GRAY)

    # Apply template matching
    res = cv2.matchTemplate(source_gray, template_gray, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

    # Get the size of the template
    w, h = template_gray.shape[::-1]

    # Draw a rectangle around the matched region
    top_left = max_loc
    bottom_right = (top_left[0] + w, top_left[1] + h)

    shift_amount = 130  # Adjust this value as needed
    shifted_top_left = (top_left[0] + shift_amount, top_left[1])
    shifted_bottom_right = (bottom_right[0] + shift_amount, bottom_right[1])

    # Ensure the shifted coordinates are within the image boundaries
    shifted_top_left = (min(shifted_top_left[0], source_image.shape[1]), shifted_top_left[1])
    shifted_bottom_right = (min(shifted_bottom_right[0], source_image.shape[1]), shifted_bottom_right[1])

    matched_region = source_image[shifted_top_left[1]:shifted_bottom_right[1], shifted_top_left[0]:shifted_bottom_right[0]]
    

    return matched_region    

def extract_pdf_values(pdf_url):
    current_epc, potential_epc = None, None  # Set defaults

    # Authenticate the client
    computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))
    # print('loaded computervision')s

    # URLs of the PDF and the template image
    template_image_url = 'https://media.rightmove.co.uk/81k/80905/141774911/80905_BSL210144_L_EPCGRAPH_00_0000.png'

    # Download and process the PDF
    response = requests.get(pdf_url)
    if response.status_code != 200:
        print("Failed to download the PDF")
    else:
        # Convert the first page of the PDF to an image
        images = convert_from_bytes(response.content, first_page=1, last_page=1)
        if images:
            source_image = images[0]
            # Convert source_image to a format compatible with OpenCV
            source_image_cv = np.array(source_image) 
            source_image_cv = cv2.cvtColor(source_image_cv, cv2.COLOR_RGB2BGR)

            # Download and prepare the template image
            template_response = requests.get(template_image_url)
            if template_response.status_code != 200:
                print("Failed to download the template image")
            else:
                # Convert template image to OpenCV format
                template_image = Image.open(io.BytesIO(template_response.content))
                template_image_cv = np.array(template_image)
                template_image_cv = cv2.cvtColor(template_image_cv, cv2.COLOR_RGB2BGR)

                # Perform template matching (assuming this function is defined as shown earlier)
                matched_region = template_match(source_image_cv, template_image_cv)
                # print('matched regon: ', matched_region )

                # Convert the matched region to a byte array for Azure OCR
                matched_region_pil = Image.fromarray(cv2.cvtColor(matched_region, cv2.COLOR_BGR2RGB))
                img_byte_arr = io.BytesIO()
                matched_region_pil.save(img_byte_arr, format='png')
                img_byte_arr.seek(0)  # Reset stream position to the beginning

                # Perform OCR on the matched region
                read_results = computervision_client.read_in_stream(img_byte_arr, raw=True)
                operation_location_remote = read_results.headers["Operation-Location"]
                operation_id = operation_location_remote.split("/")[-1]
                # Retrieve OCR results
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
                    # print("Line text: ", line.text)
                    # print("Bounding box: ", line.bounding_box)
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

    # print('Current: ', current_epc, 'Potential: ', potential_epc)
    return current_epc, potential_epc






def extract_png_jpeg(image_url):
    current_epc, potential_epc = None, None  # Set defaults

    # Authenticate the client
    computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))
    # print('loaded computervision')

    # Perform OCR on the image from the URL
    read_results = computervision_client.read(url=image_url, raw=True)
    # print('results read')

    # Get the operation location (URL with an ID at the end)
    operation_location_remote = read_results.headers["Operation-Location"]
    operation_id = operation_location_remote.split("/")[-1]
    # print('ocr id extracted')

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

