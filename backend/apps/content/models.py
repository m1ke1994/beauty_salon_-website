from django.db import models


class Page(models.Model):
    title = models.CharField("Заголовок", max_length=200)
    slug = models.SlugField("Слаг", max_length=200, unique=True)
    description = models.TextField("Описание", blank=True)
    order = models.PositiveIntegerField("Порядок", default=0)
    is_active = models.BooleanField("Активно", default=True)

    class Meta:
        ordering = ["order", "title"]
        verbose_name = "Страница"
        verbose_name_plural = "Страницы"

    def __str__(self) -> str:
        return self.title


class Section(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name="sections")
    title = models.CharField("Заголовок", max_length=200)
    subtitle = models.CharField("Подзаголовок", max_length=200, blank=True)
    description = models.TextField("Описание", blank=True)
    slug = models.SlugField("Слаг/якорь", max_length=200)
    order = models.PositiveIntegerField("Порядок", default=0)
    extra = models.JSONField("Дополнительные данные", default=dict, blank=True)

    class Meta:
        ordering = ["order", "title"]
        verbose_name = "Раздел"
        verbose_name_plural = "Разделы"
        unique_together = ("page", "slug")

    def __str__(self) -> str:
        return f"{self.page.title}: {self.title}"


class SectionItem(models.Model):
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name="items")
    title = models.CharField("Заголовок", max_length=200, blank=True)
    subtitle = models.CharField("Подзаголовок", max_length=200, blank=True)
    text = models.TextField("Текст", blank=True)
    image_url = models.CharField("Изображение/URL", max_length=500, blank=True)
    icon = models.CharField("Иконка", max_length=100, blank=True)
    button_text = models.CharField("Текст кнопки", max_length=200, blank=True)
    button_url = models.CharField("Ссылка кнопки", max_length=500, blank=True)
    order = models.PositiveIntegerField("Порядок", default=0)
    meta = models.JSONField("Метаданные", default=dict, blank=True)

    class Meta:
        ordering = ["order", "title"]
        verbose_name = "Элемент/карточка"
        verbose_name_plural = "Элементы/карточки"

    def __str__(self) -> str:
        return self.title or f"Элемент #{self.pk}"


class Review(models.Model):
    name = models.CharField("Имя", max_length=120)
    avatar_url = models.CharField("Аватар (URL)", max_length=500, blank=True)
    rating = models.PositiveIntegerField("Рейтинг", default=5)
    text = models.TextField("Текст отзыва")
    service = models.CharField("Услуга", max_length=200, blank=True)
    date = models.CharField("Дата", max_length=100, blank=True)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"

    def __str__(self) -> str:
        return self.name


class PriceCategory(models.Model):
    title = models.CharField("Название", max_length=200)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        ordering = ["order", "title"]
        verbose_name = "Категория прайса"
        verbose_name_plural = "Категории прайса"

    def __str__(self) -> str:
        return self.title


class PriceItem(models.Model):
    category = models.ForeignKey(PriceCategory, on_delete=models.CASCADE, related_name="items")
    name = models.CharField("Название", max_length=200)
    price = models.CharField("Цена", max_length=100)
    duration = models.CharField("Длительность", max_length=100, blank=True)
    is_popular = models.BooleanField("Популярное", default=False)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Позиция прайса"
        verbose_name_plural = "Позиции прайса"

    def __str__(self) -> str:
        return self.name


class PortfolioItem(models.Model):
    category = models.CharField("Категория", max_length=100)
    title = models.CharField("Название", max_length=200)
    image_url = models.CharField("Изображение (URL)", max_length=500)
    order = models.PositiveIntegerField("Порядок", default=0)

    class Meta:
        ordering = ["order", "title"]
        verbose_name = "Элемент портфолио"
        verbose_name_plural = "Элементы портфолио"

    def __str__(self) -> str:
        return self.title


class BookingRequest(models.Model):
    name = models.CharField("Имя", max_length=200)
    phone = models.CharField("Телефон", max_length=50)
    service = models.CharField("Услуга", max_length=200)
    date = models.CharField("Дата", max_length=100)
    time = models.CharField("Время", max_length=50)
    comment = models.TextField("Комментарий", blank=True)
    created_at = models.DateTimeField("Создано", auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Заявка на запись"
        verbose_name_plural = "Заявки на запись"

    def __str__(self) -> str:
        return f"{self.name} — {self.service}"
