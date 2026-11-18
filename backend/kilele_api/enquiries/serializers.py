from rest_framework import serializers

VALID_TRIPS = [
    'great-migration', 'roof-of-africa', 'stars-and-spice',
    'big-five-classic', 'zanzibar-escape', 'southern-wilds',
]


class EnquirySerializer(serializers.Serializer):
    trip = serializers.ChoiceField(choices=VALID_TRIPS, required=False, allow_blank=True)
    arrivalDate = serializers.DateField(required=False, allow_null=True)
    departureDate = serializers.DateField(required=False, allow_null=True)
    adults = serializers.IntegerField(min_value=1, default=2)
    children = serializers.IntegerField(min_value=0, default=0)
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=40, required=False, allow_blank=True)
    message = serializers.CharField(max_length=2000, required=False, allow_blank=True)
    # Honeypot: hidden in the form. Humans leave it empty; bots fill it in.
    website = serializers.CharField(max_length=200, required=False, allow_blank=True, write_only=True)

    def validate(self, data):
        """Extra checks across multiple fields."""
        arrival = data.get('arrivalDate')
        departure = data.get('departureDate')
        if arrival and departure and departure < arrival:
            raise serializers.ValidationError('Departure must be on or after arrival.')
        return data
        