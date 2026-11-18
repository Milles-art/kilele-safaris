from django.core import mail
from django.core.cache import cache
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Enquiry


class EnquiryModelTests(TestCase):
    def test_string_representation(self):
        enquiry = Enquiry.objects.create(name='Amara Johnson', email='amara@example.com')
        self.assertEqual(str(enquiry), 'Amara Johnson - amara@example.com')

    def test_created_at_is_set_automatically(self):
        enquiry = Enquiry.objects.create(name='Amara', email='amara@example.com')
        self.assertIsNotNone(enquiry.created_at)


class EnquiryAPITests(APITestCase):
    URL = '/api/enquiries'

    def setUp(self):
        # Rate-limit counters live in the shared cache; reset between tests.
        cache.clear()
        mail.outbox = []

    def _post(self, **extra):
        payload = {'name': 'Amara Johnson', 'email': 'amara@example.com', **extra}
        return self.client.post(self.URL, payload, format='json')

    def test_valid_enquiry_is_saved(self):
        response = self._post(adults=2, children=1, trip='great-migration')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['ok'])
        self.assertEqual(Enquiry.objects.count(), 1)
        saved = Enquiry.objects.first()
        self.assertEqual(saved.name, 'Amara Johnson')
        self.assertEqual(saved.trip, 'great-migration')

    def test_invalid_email_is_rejected(self):
        response = self.client.post(self.URL, {'name': 'Amara', 'email': 'bad'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
        self.assertEqual(Enquiry.objects.count(), 0)

    def test_missing_name_is_rejected(self):
        response = self.client.post(self.URL, {'email': 'a@b.com'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)

    def test_unknown_trip_is_rejected(self):
        response = self._post(trip='not-a-real-trip')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('trip', response.data)

    def test_departure_before_arrival_is_rejected(self):
        response = self._post(arrivalDate='2026-07-10', departureDate='2026-07-01')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('non_field_errors', response.data)

    def test_adults_must_be_at_least_one(self):
        response = self._post(adults=0)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('adults', response.data)

    def test_two_emails_are_sent_on_success(self):
        response = self._post()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(mail.outbox), 2)
        self.assertIn('New enquiry from Amara Johnson', mail.outbox[0].subject)
        self.assertEqual(mail.outbox[1].to, ['amara@example.com'])

    def test_emails_include_html_alternative(self):
        self._post(trip='roof-of-africa', message='Hello there')
        for message in mail.outbox:
            self.assertEqual(len(message.alternatives), 1)
            content, mimetype = message.alternatives[0]
            self.assertEqual(mimetype, 'text/html')
            self.assertIn('Kilele Safaris', content)
        self.assertIn('Roof of Africa', mail.outbox[0].alternatives[0][0])

    def test_honeypot_silently_discards_spam(self):
        response = self._post(website='https://spam.example.com')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Enquiry.objects.count(), 0)
        self.assertEqual(len(mail.outbox), 0)

    def test_rate_limit_blocks_excess_requests(self):
        for _ in range(5):
            self.assertEqual(self._post().status_code, status.HTTP_201_CREATED)
        blocked = self._post()
        self.assertEqual(blocked.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
        self.assertEqual(Enquiry.objects.count(), 5)

    def test_x_forwarded_for_is_recorded(self):
        self.client.post(
            self.URL,
            {'name': 'Amara', 'email': 'amara@example.com'},
            format='json',
            HTTP_X_FORWARDED_FOR='203.0.113.42, 10.0.0.1',
        )
        self.assertEqual(Enquiry.objects.first().ip_address, '203.0.113.42')

    def test_get_is_not_allowed(self):
        response = self.client.get(self.URL)
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_health_endpoint(self):
        response = self.client.get('/api/health')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['ok'])
