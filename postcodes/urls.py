from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import PostcodesListView, PostcodeSingleView

# any request getting through to this point is prefixed with the /albums/ endpoint

# example: http://localhost:8000/albums/
# id example: http://localhost:8000/albums/1/

urlpatterns = [
    path('', PostcodeSingleView.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
    # path('', PostcodesListView.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
]