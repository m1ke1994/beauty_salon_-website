from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="SiteSettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("site_name", models.CharField(default="Belleza", max_length=200, verbose_name="???????? ?????")),
                ("phone", models.CharField(blank=True, max_length=50, verbose_name="??????? (raw)")),
                (
                    "phone_display",
                    models.CharField(blank=True, max_length=50, verbose_name="??????? (???????????)"),
                ),
                ("address", models.CharField(blank=True, max_length=300, verbose_name="?????")),
                (
                    "address_note",
                    models.CharField(blank=True, max_length=200, verbose_name="?????????? ? ??????"),
                ),
                (
                    "work_hours",
                    models.CharField(blank=True, max_length=200, verbose_name="?????? ??????"),
                ),
                (
                    "work_hours_note",
                    models.CharField(blank=True, max_length=200, verbose_name="?????????? ? ???????"),
                ),
                ("footer_text", models.TextField(blank=True, verbose_name="????? ??????")),
                ("instagram_url", models.CharField(blank=True, max_length=300, verbose_name="Instagram")),
                ("telegram_url", models.CharField(blank=True, max_length=300, verbose_name="Telegram")),
                ("whatsapp_url", models.CharField(blank=True, max_length=300, verbose_name="WhatsApp")),
                (
                    "map_place_url",
                    models.CharField(blank=True, max_length=500, verbose_name="?????? ?? ??????.?????"),
                ),
                (
                    "map_route_url",
                    models.CharField(blank=True, max_length=500, verbose_name="?????? ?? ???????"),
                ),
                (
                    "map_iframe_src",
                    models.CharField(blank=True, max_length=500, verbose_name="?????? ??? iframe"),
                ),
                ("navigation_links", models.JSONField(blank=True, default=list, verbose_name="?????????")),
                ("footer_links", models.JSONField(blank=True, default=list, verbose_name="?????? ? ??????")),
                ("social_links", models.JSONField(blank=True, default=list, verbose_name="???????")),
                ("extra", models.JSONField(blank=True, default=dict, verbose_name="?????????????? ??????")),
            ],
            options={
                "verbose_name": "?????????? ?????????",
                "verbose_name_plural": "?????????? ?????????",
            },
        ),
    ]
