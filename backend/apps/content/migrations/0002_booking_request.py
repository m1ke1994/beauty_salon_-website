from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="BookingRequest",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200, verbose_name="Имя")),
                ("phone", models.CharField(max_length=50, verbose_name="Телефон")),
                ("service", models.CharField(max_length=200, verbose_name="Услуга")),
                ("date", models.CharField(max_length=100, verbose_name="Дата")),
                ("time", models.CharField(max_length=50, verbose_name="Время")),
                ("comment", models.TextField(blank=True, verbose_name="Комментарий")),
                ("created_at", models.DateTimeField(auto_now_add=True, verbose_name="Создано")),
            ],
            options={
                "verbose_name": "Заявка на запись",
                "verbose_name_plural": "Заявки на запись",
                "ordering": ["-created_at"],
            },
        ),
    ]
