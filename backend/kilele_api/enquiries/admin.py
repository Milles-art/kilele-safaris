from django.contrib import admin
from .models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'trip', 'adults', 'ip_address', 'created_at')
    list_filter = ('trip', 'created_at')
    search_fields = ('name', 'email')