from django.db import models


class Enquiry(models.Model):
    trip = models.CharField(max_length=50, blank=True, null=True)
    arrival_date = models.DateField(blank=True, null=True)
    departure_date = models.DateField(blank=True, null=True)
    adults = models.PositiveIntegerField(default=2)
    children = models.PositiveIntegerField(default=0)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=40, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"
    class Meta:
        verbose_name_plural = 'Enquiries'