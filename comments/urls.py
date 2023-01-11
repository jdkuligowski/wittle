from django.urls import path
# views for our Comments
from .views import CommentListView, CommentDetailView

# default path for this conf file is: /comments/

urlpatterns = [
    path('', CommentListView.as_view()),
    path('<int:pk>/', CommentDetailView.as_view())
]