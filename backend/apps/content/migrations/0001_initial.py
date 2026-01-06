from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Page",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200, verbose_name="????????")),
                ("slug", models.SlugField(max_length=200, unique=True, verbose_name="????")),
                ("description", models.TextField(blank=True, verbose_name="????????")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="???????")),
                ("is_active", models.BooleanField(default=True, verbose_name="???????")),
            ],
            options={
                "verbose_name": "????????",
                "verbose_name_plural": "????????",
                "ordering": ["order", "title"],
            },
        ),
        migrations.CreateModel(
            name="PortfolioItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("category", models.CharField(max_length=100, verbose_name="?????????")),
                ("title", models.CharField(max_length=200, verbose_name="????????")),
                ("image_url", models.CharField(max_length=500, verbose_name="???????? (URL)")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="???????")),
            ],
            options={
                "verbose_name": "?????? ?????????",
                "verbose_name_plural": "?????????",
                "ordering": ["order", "title"],
            },
        ),
        migrations.CreateModel(
            name="PriceCategory",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200, verbose_name="?????????")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="???????")),
            ],
            options={
                "verbose_name": "????????? ??????",
                "verbose_name_plural": "????????? ??????",
                "ordering": ["order", "title"],
            },
        ),
        migrations.CreateModel(
            name="Review",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120, verbose_name="???")),
                ("avatar_url", models.CharField(blank=True, max_length=500, verbose_name="?????? (URL)")),
                ("rating", models.PositiveIntegerField(default=5, verbose_name="??????")),
                ("text", models.TextField(verbose_name="????? ??????")),
                ("service", models.CharField(blank=True, max_length=200, verbose_name="??????")),
                ("date", models.CharField(blank=True, max_length=100, verbose_name="????")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="???????")),
            ],
            options={
                "verbose_name": "?????",
                "verbose_name_plural": "??????",
                "ordering": ["order", "name"],
            },
        ),
        migrations.CreateModel(
            name="Section",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200, verbose_name="?????????")),
                ("subtitle", models.CharField(blank=True, max_length=200, verbose_name="????????????")),
                ("description", models.TextField(blank=True, verbose_name="????????")),
                ("slug", models.SlugField(max_length=200, verbose_name="????/?????")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="???????")),
                ("extra", models.JSONField(blank=True, default=dict, verbose_name="?????????????? ??????")),
                (
                    "page",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="sections", to="content.page"),
                ),
            ],
            options={
                "verbose_name": "??????",
                "verbose_name_plural": "??????",
                "ordering": ["order", "title"],
                "unique_together": {("page", "slug")},
            },
        ),
        migrations.CreateModel(
            name="SectionItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(blank=True, max_length=200, verbose_name="?????????")),
                ("subtitle", models.CharField(blank=True, max_length=200, verbose_name="????????????")),
                ("text", models.TextField(blank=True, verbose_name="?????")),
                ("image_url", models.CharField(blank=True, max_length=500, verbose_name="????????/URL")),
                ("icon", models.CharField(blank=True, max_length=100, verbose_name="??????")),
                ("button_text", models.CharField(blank=True, max_length=200, verbose_name="????? ??????")),
                ("button_url", models.CharField(blank=True, max_length=500, verbose_name="?????? ??????")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="???????")),
                ("meta", models.JSONField(blank=True, default=dict, verbose_name="??????????")),
                (
                    "section",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="items", to="content.section"),
                ),
            ],
            options={
                "verbose_name": "????????/???????",
                "verbose_name_plural": "????????/????????",
                "ordering": ["order", "title"],
            },
        ),
        migrations.CreateModel(
            name="PriceItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200, verbose_name="????????")),
                ("price", models.CharField(max_length=100, verbose_name="????")),
                ("duration", models.CharField(blank=True, max_length=100, verbose_name="????????????")),
                ("is_popular", models.BooleanField(default=False, verbose_name="???")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="???????")),
                (
                    "category",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="items", to="content.pricecategory"),
                ),
            ],
            options={
                "verbose_name": "??????? ??????",
                "verbose_name_plural": "??????? ??????",
                "ordering": ["order", "name"],
            },
        ),
    ]
