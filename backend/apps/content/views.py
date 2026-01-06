from rest_framework import viewsets
from .models import Page, Review, PriceCategory, PortfolioItem
from .serializers import (
    PageSerializer,
    ReviewSerializer,
    PriceCategorySerializer,
    PortfolioItemSerializer,
)


class PageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = (
        Page.objects.filter(is_active=True)
        .prefetch_related("sections__items")
        .order_by("order")
    )
    serializer_class = PageSerializer
    lookup_field = "slug"


class ReviewViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Review.objects.all().order_by("order")
    serializer_class = ReviewSerializer


class PriceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PriceCategory.objects.all().prefetch_related("items").order_by("order")
    serializer_class = PriceCategorySerializer


class PortfolioItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PortfolioItem.objects.all().order_by("order")
    serializer_class = PortfolioItemSerializer
