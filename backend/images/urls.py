from django.urls import path
from .views import ImageSearchView, SourceStatusView

urlpatterns = [
    path('search/', ImageSearchView.as_view(), name='image-search'),
    path('sources/', SourceStatusView.as_view(), name='source-status'),
]