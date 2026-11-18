import logging

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Enquiry
from .security import client_ip, is_honeypot_filled, is_rate_limited
from .serializers import EnquirySerializer

logger = logging.getLogger('enquiries')


TRIP_LABELS = {
    'great-migration': 'The Great Migration',
    'roof-of-africa': 'Roof of Africa',
    'stars-and-spice': 'Stars & Spice',
    'big-five-classic': 'Big Five Classic',
    'zanzibar-escape': 'Zanzibar Escape',
    'southern-wilds': 'Southern Wilds',
}


def trip_label(slug):
    if not slug:
        return 'Not sure yet — help me choose'
    return TRIP_LABELS.get(slug, slug)


def date_range(enquiry):
    start = enquiry.arrival_date.strftime('%d %b %Y') if enquiry.arrival_date else None
    end = enquiry.departure_date.strftime('%d %b %Y') if enquiry.departure_date else None
    if start and end:
        return f'{start} – {end}'
    return start or end or 'Flexible'


def send_templated_email(subject, plain, template, context, to, reply_to=None):
    msg = EmailMultiAlternatives(
        subject=subject,
        body=plain,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[to],
        reply_to=[reply_to] if reply_to else None,
    )
    from django.template.loader import render_to_string
    msg.attach_alternative(render_to_string(template, context), 'text/html')
    msg.send(fail_silently=False)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def create_enquiry(request):
    if is_rate_limited(request):
        return Response(
            {'detail': 'Too many enquiries. Please try again later.'},
            status=status.HTTP_429_TOO_MANY_REQUESTS,
        )

    serializer = EnquirySerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if is_honeypot_filled(serializer):
        logger.warning('Honeypot triggered from %s', client_ip(request))
        return Response({'ok': True, 'id': None}, status=status.HTTP_201_CREATED)

    data = serializer.validated_data
    ip = client_ip(request)

    try:
        enquiry = Enquiry.objects.create(
            trip=data.get('trip') or None,
            arrival_date=data.get('arrivalDate'),
            departure_date=data.get('departureDate'),
            adults=data['adults'],
            children=data['children'],
            name=data['name'],
            email=data['email'],
            phone=data.get('phone') or None,
            message=data.get('message') or None,
            ip_address=ip,
        )
    except Exception:
        logger.exception('Failed to save enquiry from %s', ip)
        return Response(
            {'detail': 'Could not save your enquiry. Please try again.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    context = {
        'enquiry': enquiry,
        'trip_name': trip_label(enquiry.trip),
        'date_range': date_range(enquiry),
        'admin_url': f'{settings.ADMIN_SITE_URL}/admin/enquiries/enquiry/{enquiry.id}/change/',
        'contact_phone': settings.CONTACT_PHONE,
    }

    try:
        send_templated_email(
            subject=f'New enquiry from {enquiry.name}',
            plain=(
                f'Name: {enquiry.name}\nEmail: {enquiry.email}\nPhone: {enquiry.phone or "-"}\n'
                f'Trip: {context["trip_name"]}\nDates: {context["date_range"]}\n'
                f'Guests: {enquiry.adults} adults, {enquiry.children} children\n'
                f'Message: {enquiry.message or "-"}\nIP: {ip}\n'
                f'Admin: {context["admin_url"]}'
            ),
            template='emails/new_enquiry.html',
            context=context,
            to=settings.ADMIN_EMAIL,
            reply_to=enquiry.email,
        )
        send_templated_email(
            subject='We received your Kilele Safaris enquiry',
            plain=(
                f'Asante, {enquiry.name}!\n\nWe received your enquiry about {context["trip_name"]}. '
                f'A local trip designer will reply within 24 hours.\n\n'
                f'Your reference is {enquiry.id}.\n\n'
                f'WhatsApp: {settings.CONTACT_PHONE}\n\nKaribu,\nKilele Safaris'
            ),
            template='emails/enquiry_confirmation.html',
            context=context,
            to=enquiry.email,
        )
        logger.info('Enquiry %s saved; HTML emails sent (%s)', enquiry.id, ip)
    except Exception:
        logger.exception('Enquiry %s saved but email failed', enquiry.id)

    return Response({'ok': True, 'id': enquiry.id}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([AllowAny])
def health(request):
    return Response({'ok': True})
