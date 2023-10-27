# from django.urls import path # path allows us to set the url pattern with an endpoint and a view
# from .views import PropertyListView, PropertyDetailView, PropertyWittleView, PropertyWittleSingleView

# # any request getting through to this point is prefixed with the /albums/ endpoint

# # example: http://localhost:8000/albums/
# # id example: http://localhost:8000/albums/1/

# urlpatterns = [
#     path('', PropertyListView.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
#     path('<int:pk>/', PropertyDetailView.as_view()),
#     path('results', PropertyWittleView.as_view()),
#     path('results/<int:pk>/', PropertyWittleSingleView.as_view()),
#     # this is known as a captured value
#     # on the left is our path converter. Here we've specified a type of integer
#     # this isn't needed and we could write this like <pk>, but we're being more specific about the type we're expecting
# ]