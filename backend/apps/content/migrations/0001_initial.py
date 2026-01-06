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
                ("title", models.CharField(max_length=200, verbose_name="Заголовок")),
                ("slug", models.SlugField(max_length=200, unique=True, verbose_name="Слаг")),
                ("description", models.TextField(blank=True, verbose_name="Описание")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Порядок")),
                ("is_active", models.BooleanField(default=True, verbose_name="Активно")),
            ],
            options={
                "verbose_name": "Страница",
                "verbose_name_plural": "Страницы",
                "ordering": ["order", "title"],
            },
        ),
        migrations.CreateModel(
            name="PortfolioItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("category", models.CharField(max_length=100, verbose_name="Категория")),
                ("title", models.CharField(max_length=200, verbose_name="Название")),
                ("image_url", models.CharField(max_length=500, verbose_name="Изображение (URL)")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Порядок")),
            ],
            options={
                "verbose_name": "Элемент портфолио",
                "verbose_name_plural": "Элементы портфолио",
                "ordering": ["order", "title"],
            },
        ),
        migrations.CreateModel(
            name="PriceCategory",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200, verbose_name="Название")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Порядок")),
            ],
            options={
                "verbose_name": "Категория прайса",
                "verbose_name_plural": "Категории прайса",
                "ordering": ["order", "title"],
            },
        ),
        migrations.CreateModel(
            name="Review",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=120, verbose_name="Имя")),
                ("avatar_url", models.CharField(blank=True, max_length=500, verbose_name="Аватар (URL)")),
                ("rating", models.PositiveIntegerField(default=5, verbose_name="Рейтинг")),
                ("text", models.TextField(verbose_name="Текст отзыва")),
                ("service", models.CharField(blank=True, max_length=200, verbose_name="Услуга")),
                ("date", models.CharField(blank=True, max_length=100, verbose_name="Дата")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Порядок")),
            ],
            options={
                "verbose_name": "Отзыв",
                "verbose_name_plural": "Отзывы",
                "ordering": ["order", "name"],
            },
        ),
        migrations.CreateModel(
            name="Section",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200, verbose_name="Заголовок")),
                ("subtitle", models.CharField(blank=True, max_length=200, verbose_name="Подзаголовок")),
                ("description", models.TextField(blank=True, verbose_name="Описание")),
                ("slug", models.SlugField(max_length=200, verbose_name="Слаг/якорь")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Порядок")),
                ("extra", models.JSONField(blank=True, default=dict, verbose_name="Дополнительные данные")),
                (
                    "page",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="sections", to="content.page"),
                ),
            ],
            options={
                "verbose_name": "Раздел",
                "verbose_name_plural": "Разделы",
                "ordering": ["order", "title"],
                "unique_together": {("page", "slug")},
            },
        ),
        migrations.CreateModel(
            name="SectionItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(blank=True, max_length=200, verbose_name="Заголовок")),
                ("subtitle", models.CharField(blank=True, max_length=200, verbose_name="Подзаголовок")),
                ("text", models.TextField(blank=True, verbose_name="Текст")),
                ("image_url", models.CharField(blank=True, max_length=500, verbose_name="Изображение/URL")),
                ("icon", models.CharField(blank=True, max_length=100, verbose_name="Иконка")),
                ("button_text", models.CharField(blank=True, max_length=200, verbose_name="Текст кнопки")),
                ("button_url", models.CharField(blank=True, max_length=500, verbose_name="Ссылка кнопки")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Порядок")),
                ("meta", models.JSONField(blank=True, default=dict, verbose_name="Метаданные")),
                (
                    "section",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="items", to="content.section"),
                ),
            ],
            options={
                "verbose_name": "Элемент/карточка",
                "verbose_name_plural": "Элементы/карточки",
                "ordering": ["order", "title"],
            },
        ),
        migrations.CreateModel(
            name="PriceItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200, verbose_name="Название")),
                ("price", models.CharField(max_length=100, verbose_name="Цена")),
                ("duration", models.CharField(blank=True, max_length=100, verbose_name="Длительность")),
                ("is_popular", models.BooleanField(default=False, verbose_name="Популярное")),
                ("order", models.PositiveIntegerField(default=0, verbose_name="Порядок")),
                (
                    "category",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="items", to="content.pricecategory"),
                ),
            ],
            options={
                "verbose_name": "Позиция прайса",
                "verbose_name_plural": "Позиции прайса",
                "ordering": ["order", "name"],
            },
        ),
    ]
