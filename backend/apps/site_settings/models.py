from django.db import models


class SiteSettings(models.Model):
    site_name = models.CharField("Название сайта", max_length=200, default="Belleza")
    phone = models.CharField("Телефон (сырой)", max_length=50, blank=True)
    phone_display = models.CharField("Телефон (для отображения)", max_length=50, blank=True)
    address = models.CharField("Адрес", max_length=300, blank=True)
    address_note = models.CharField("Примечание к адресу", max_length=200, blank=True)
    work_hours = models.CharField("График работы", max_length=200, blank=True)
    work_hours_note = models.CharField("Примечание к графику", max_length=200, blank=True)
    footer_text = models.TextField("Текст футера", blank=True)
    instagram_url = models.CharField("Instagram", max_length=300, blank=True)
    telegram_url = models.CharField("Telegram", max_length=300, blank=True)
    whatsapp_url = models.CharField("WhatsApp", max_length=300, blank=True)
    map_place_url = models.CharField("Ссылка на карту", max_length=500, blank=True)
    map_route_url = models.CharField("Ссылка на маршрут", max_length=500, blank=True)
    map_iframe_src = models.CharField("Ссылка для iframe", max_length=500, blank=True)
    navigation_links = models.JSONField("Навигация", default=list, blank=True)
    footer_links = models.JSONField("Ссылки в футере", default=list, blank=True)
    social_links = models.JSONField("Соцсети", default=list, blank=True)
    extra = models.JSONField("Дополнительные данные", default=dict, blank=True)

    class Meta:
        verbose_name = "Настройки сайта"
        verbose_name_plural = "Настройки сайта"

    def __str__(self) -> str:
        return "Настройки сайта"
