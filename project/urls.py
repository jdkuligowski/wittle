"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""


from django.contrib import admin
from django.urls import path, include, re_path 
from .views import index
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('jwt_auth.urls')),
    # path('api/properties/', include('properties.urls')),
    path('api/areas/', include('areas.urls')),
    path('api/favourites/', include('favourites_properties.urls')),
    path('api/property-search/', include('property_search_details.urls')),
    path('api/tubes/', include('tubes.urls')),
    path('api/trains/', include('trains.urls')),
    path('api/locations/', include('postcode_locations.urls')),
    path('api/living/', include('living_details.urls')),
    path('api/restaurants/', include('white_restaurants_list.urls')),
    path('api/supermarkets/', include('living_supermarkets.urls')),
    path('api/gyms/', include('living_gyms.urls')),
    path('api/pubs/', include('white_pubs_list.urls')),
    # path('api/takeaways/', include('living_takeaways.urls')),
    path('api/primaries/', include('white_primary_details.urls')),
    path('api/secondaries/', include('wittle_secondary_details.urls')),
    # path('api/colleges/', include('living_colleges.urls')),
    path('api/living-details/', include('living_master.urls')),
    path('api/emails/', include('living_emails.urls')),
    path('api/waitlist/', include('waitlist.urls')),
    path('api/agentsignup/', include('agent_signup.urls')),
    path('api/postcodes/', include('postcodes.urls')),
    path('api/evs/', include('white_ev_list.urls')),
    path('api/boroughs/', include('borough_summary.urls')),
    path('api/wards/', include('ward_summary.urls')),
    path('api/white_properties/', include('white_properties.urls')),
    path('api/epc/', include('epc.urls')),
    path('api/usage/', include('account_details.urls')),
    path('api/generate_listing/', include('ai_listing_generator.urls')),
    path('api/epc_favourite/', include('epc_favourites.urls')),
    path('api/listing_favourites/', include('listing_favourites.urls')),
    path('api/epc_properties/', include('epc_property_data.urls')),
    path('api/epc_properties_rental/', include('epc_property_rental.urls')),
    path('api/lead_gen_details/', include('lead_gen_details.urls')),
    path('api/personas/', include('postcode_personas.urls')),
    re_path(r'^.*$', index) # <-- have this come last using re path.
] 

