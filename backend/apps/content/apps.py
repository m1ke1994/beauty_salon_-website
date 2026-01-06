from django.apps import AppConfig
from django.db.models.signals import post_migrate


def _import_initial_content(sender, **kwargs):
    if sender.label != "content":
        return
    from django.db import connection
    if "site_settings_sitesettings" not in connection.introspection.table_names():
        return
    from .models import Page
    if Page.objects.exists():
        return
    from .importer import import_content

    import_content(clear=False)


class ContentConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.content"
    verbose_name = "??????? ?????"

    def ready(self):
        post_migrate.connect(_import_initial_content, sender=self)
