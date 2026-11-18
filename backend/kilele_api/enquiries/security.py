"""Spam protection helpers for the enquiry endpoint."""

import logging

from django.conf import settings
from django.core.cache import cache

logger = logging.getLogger('enquiries')


def client_ip(request):
    """Get the real visitor IP, honouring the reverse proxy / Vite proxy header."""
    forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
    if forwarded:
        return forwarded.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR', 'unknown')


def rate_limit_key(ip):
    return f'enquiry_rl:{ip}'


def is_rate_limited(request):
    """True if this IP has exceeded the allowed enquiries per window."""
    key = rate_limit_key(client_ip(request))
    count = cache.get(key, 0)
    if count >= settings.RATE_LIMIT_MAX:
        logger.warning('Rate limit hit for %s (%d requests)', client_ip(request), count)
        return True
    cache.set(key, count + 1, settings.RATE_LIMIT_WINDOW_SECONDS)
    return False


def is_honeypot_filled(serializer):
    """Bots fill the hidden 'website' field; real users leave it empty."""
    return bool(serializer.validated_data.get('website'))
