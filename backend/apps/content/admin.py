from django.contrib import admin
from .models import (
    Page,
    Section,
    SectionItem,
    Review,
    PriceCategory,
    PriceItem,
    PortfolioItem,
    BookingRequest,
)


class SectionInline(admin.TabularInline):
    model = Section
    extra = 0
    fields = ("title", "subtitle", "slug", "order")
    ordering = ("order",)


class SectionItemInline(admin.TabularInline):
    model = SectionItem
    extra = 0
    fields = ("title", "subtitle", "order")
    ordering = ("order",)


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("title", "slug")
    ordering = ("order",)
    inlines = [SectionInline]


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("title", "page", "slug", "order")
    list_filter = ("page",)
    search_fields = ("title", "slug", "page__title")
    ordering = ("page", "order")
    inlines = [SectionItemInline]


@admin.register(SectionItem)
class SectionItemAdmin(admin.ModelAdmin):
    list_display = ("title", "section", "order")
    list_filter = ("section", "section__page")
    search_fields = ("title", "subtitle", "text")
    ordering = ("section", "order")


class PriceItemInline(admin.TabularInline):
    model = PriceItem
    extra = 0
    fields = ("name", "price", "duration", "is_popular", "order")
    ordering = ("order",)


@admin.register(PriceCategory)
class PriceCategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "order")
    ordering = ("order",)
    inlines = [PriceItemInline]


@admin.register(PriceItem)
class PriceItemAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "price", "duration", "is_popular", "order")
    list_filter = ("category",)
    search_fields = ("name",)
    ordering = ("category", "order")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("name", "service", "rating", "date", "order")
    search_fields = ("name", "text", "service")
    ordering = ("order",)


@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "order")
    list_filter = ("category",)
    search_fields = ("title",)
    ordering = ("order",)


@admin.register(BookingRequest)
class BookingRequestAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "service", "date", "time", "created_at")
    search_fields = ("name", "phone", "service", "comment")
    ordering = ("-created_at",)
