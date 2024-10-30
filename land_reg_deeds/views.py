from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests

class PropertyDescriptionSearchView(APIView):
    def post(self, request):
        # Extract data from the request
        user_id = request.data.get("user_id", "BGUser001")
        password = request.data.get("password", "landreg001")
        message_id = request.data.get("message_id", "default_message_id")
        external_reference = request.data.get("external_reference", "default_external_reference")
        customer_reference = request.data.get("customer_reference", "default_customer_reference")
        building_number = request.data.get("building_number", "99")
        postcode = request.data.get("postcode", "TQ56 4HY")
        
        # Construct the XML data
        xml_data = f"""
        <RequestSearchByPropertyDescriptionV2_0 xmlns="http://www.oscre.org/ns/eReg-Final/2011/RequestSearchByPropertyDescriptionV2_0">
            <ID>
                <MessageID>default_message_id</MessageID>
            </ID>
            <Product>
                <ExternalReference>
                    <Reference>default_external_reference</Reference>
                    <AllocatedBy>YourCompany</AllocatedBy>
                    <Description>Example Description</Description>
                </ExternalReference>
                <CustomerReference>
                    <Reference>default_customer_reference</Reference>
                    <AllocatedBy>YourCompany</AllocatedBy>
                    <Description>Example Customer Description</Description>
                </CustomerReference>
                <SubjectProperty>
                    <Address>
                        <BuildingNumber>99</BuildingNumber>
                        <PostcodeZone>TQ56 4HY</PostcodeZone>
                    </Address>
                </SubjectProperty>
            </Product>
        </RequestSearchByPropertyDescriptionV2_0>
        """

        headers = {
            "Content-Type": "application/xml",
        }

        # Endpoint URL for the Land Registry API
        url = "https://bgtest.landregistry.gov.uk/b2b/ECBG_StubService/EnquiryByPropertyDescriptionV2_0WebService" 

        # Send the request to the Land Registry API
        response = requests.post(url, headers=headers, data=xml_data)

        if response.status_code == 200:
            return Response(response.text, status=status.HTTP_200_OK)
        else:
            return Response(response.text, status=response.status_code)


