from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

admin.site.site_header = "Админ-панель Belleza"
admin.site.site_title = "Belleza — панель администратора"
admin.site.index_title = "Управление сайтом и контентом"

urlpatterns = [
    path("", lambda request: HttpResponse("Backend is running.")),
    path("admin/", admin.site.urls),
    path("api/v1/", include("apps.content.urls")),
    path("api/v1/", include("apps.site_settings.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
