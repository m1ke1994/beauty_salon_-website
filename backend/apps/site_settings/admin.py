from django.contrib import admin
from .models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Основное", {"fields": ("site_name", "phone", "phone_display")}),
        (
            "Контакты",
            {
                "fields": (
                    "address",
                    "address_note",
                    "work_hours",
                    "work_hours_note",
                    "instagram_url",
                    "telegram_url",
                    "whatsapp_url",
                )
            },
        ),
        (
            "Навигация и ссылки",
            {
                "fields": (
                    "navigation_links",
                    "footer_links",
                    "social_links",
                )
            },
        ),
        (
            "Карта",
            {
                "fields": (
                    "map_place_url",
                    "map_route_url",
                    "map_iframe_src",
                )
            },
        ),
        ("Футер", {"fields": ("footer_text",)}),
        ("Дополнительно", {"fields": ("extra",)}),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()
