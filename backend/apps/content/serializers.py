from rest_framework import serializers
from .models import Page, Section, SectionItem, Review, PriceCategory, PriceItem, PortfolioItem


class SectionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionItem
        fields = (
            "id",
            "title",
            "subtitle",
            "text",
            "image_url",
            "icon",
            "button_text",
            "button_url",
            "order",
            "meta",
        )


class SectionSerializer(serializers.ModelSerializer):
    items = SectionItemSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = (
            "id",
            "title",
            "subtitle",
            "description",
            "slug",
            "order",
            "extra",
            "items",
        )


class PageSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = Page
        fields = ("id", "title", "slug", "description", "order", "sections")


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("id", "name", "avatar_url", "rating", "text", "service", "date", "order")


class PriceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceItem
        fields = ("id", "name", "price", "duration", "is_popular", "order")


class PriceCategorySerializer(serializers.ModelSerializer):
    items = PriceItemSerializer(many=True, read_only=True)

    class Meta:
        model = PriceCategory
        fields = ("id", "title", "order", "items")


class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioItem
        fields = ("id", "category", "title", "image_url", "order")
