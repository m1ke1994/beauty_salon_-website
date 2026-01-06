from rest_framework import serializers
from .models import SiteSettings


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = (
            "id",
            "site_name",
            "phone",
            "phone_display",
            "address",
            "address_note",
            "work_hours",
            "work_hours_note",
            "footer_text",
            "instagram_url",
            "telegram_url",
            "whatsapp_url",
            "map_place_url",
            "map_route_url",
            "map_iframe_src",
            "navigation_links",
            "footer_links",
            "social_links",
            "extra",
        )
