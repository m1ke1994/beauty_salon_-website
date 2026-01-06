from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="SiteSettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("site_name", models.CharField(default="Belleza", max_length=200, verbose_name="Название сайта")),
                ("phone", models.CharField(blank=True, max_length=50, verbose_name="Телефон (сырой)")),
                (
                    "phone_display",
                    models.CharField(blank=True, max_length=50, verbose_name="Телефон (для отображения)"),
                ),
                ("address", models.CharField(blank=True, max_length=300, verbose_name="Адрес")),
                (
                    "address_note",
                    models.CharField(blank=True, max_length=200, verbose_name="Примечание к адресу"),
                ),
                (
                    "work_hours",
                    models.CharField(blank=True, max_length=200, verbose_name="График работы"),
                ),
                (
                    "work_hours_note",
                    models.CharField(blank=True, max_length=200, verbose_name="Примечание к графику"),
                ),
                ("footer_text", models.TextField(blank=True, verbose_name="Текст футера")),
                ("instagram_url", models.CharField(blank=True, max_length=300, verbose_name="Instagram")),
                ("telegram_url", models.CharField(blank=True, max_length=300, verbose_name="Telegram")),
                ("whatsapp_url", models.CharField(blank=True, max_length=300, verbose_name="WhatsApp")),
                (
                    "map_place_url",
                    models.CharField(blank=True, max_length=500, verbose_name="Ссылка на карту"),
                ),
                (
                    "map_route_url",
                    models.CharField(blank=True, max_length=500, verbose_name="Ссылка на маршрут"),
                ),
                (
                    "map_iframe_src",
                    models.CharField(blank=True, max_length=500, verbose_name="Ссылка для iframe"),
                ),
                ("navigation_links", models.JSONField(blank=True, default=list, verbose_name="Навигация")),
                ("footer_links", models.JSONField(blank=True, default=list, verbose_name="Ссылки в футере")),
                ("social_links", models.JSONField(blank=True, default=list, verbose_name="Соцсети")),
                ("extra", models.JSONField(blank=True, default=dict, verbose_name="Дополнительные данные")),
            ],
            options={
                "verbose_name": "Настройки сайта",
                "verbose_name_plural": "Настройки сайта",
            },
        ),
    ]
