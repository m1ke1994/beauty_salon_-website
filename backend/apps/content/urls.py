from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    PageViewSet,
    ReviewViewSet,
    PriceCategoryViewSet,
    PortfolioItemViewSet,
    BookingRequestViewSet,
)

router = DefaultRouter()
router.register("pages", PageViewSet, basename="pages")
router.register("reviews", ReviewViewSet, basename="reviews")
router.register("price-categories", PriceCategoryViewSet, basename="price-categories")
router.register("portfolio-items", PortfolioItemViewSet, basename="portfolio-items")
router.register("booking-requests", BookingRequestViewSet, basename="booking-requests")

urlpatterns = [
    path("", include(router.urls)),
]
