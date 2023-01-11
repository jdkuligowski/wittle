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
from django.urls import path, include # include method allows us to redirect any endpoint with a specific pattern through to another file

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/properties/', include('properties.urls')),
    path('api/areas/', include('areas.urls')),
    path('api/comments/', include('comments.urls')),
    path('api/favourites/', include('favourites_properties.urls')),
    path('api/property-search/', include('property_search_details.urls')),
    path('api/tubes/', include('tubes.urls')),
    path('api/trains/', include('trains.urls')),
]
