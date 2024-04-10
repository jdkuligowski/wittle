from django.urls import path
from .views import TemplateList, TemplateAdd, TemplateEdit, GeneratePDFView, TemplateDelete, TestPostLetterAPI

urlpatterns = [
    path('', TemplateList.as_view()),
    path('add/', TemplateAdd.as_view()),
    path('edit/<int:template_id>/', TemplateEdit.as_view()),
    path('delete/<int:template_id>/', TemplateDelete.as_view()),
    path('generate-pdf/', GeneratePDFView.as_view()),
    path('test-send-pdf/', TestPostLetterAPI.as_view()),
]
