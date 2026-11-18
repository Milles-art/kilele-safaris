from django.contrib import admin
from django.urls import path

from enquiries.views import create_enquiry, health

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/enquiries', create_enquiry),
    path('api/health', health),
]
