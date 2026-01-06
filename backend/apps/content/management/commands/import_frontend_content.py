from django.core.management.base import BaseCommand
from apps.content.importer import import_content
from apps.content.models import Page, Section, SectionItem, Review, PriceCategory, PriceItem, PortfolioItem
from apps.site_settings.models import SiteSettings


def _has_question_mark(value) -> bool:
    if isinstance(value, str):
        return "?" in value
    if isinstance(value, dict):
        return any(_has_question_mark(key) or _has_question_mark(val) for key, val in value.items())
    if isinstance(value, (list, tuple, set)):
        return any(_has_question_mark(item) for item in value)
    return False


def _purge_corrupted_records() -> int:
    deleted = 0
    models = (
        SiteSettings,
        Page,
        Section,
        SectionItem,
        Review,
        PriceCategory,
        PriceItem,
        PortfolioItem,
    )
    for model in models:
        ids = []
        for obj in model.objects.all():
            for field in obj._meta.fields:
                if _has_question_mark(getattr(obj, field.name)):
                    ids.append(obj.pk)
                    break
        if ids:
            model.objects.filter(pk__in=ids).delete()
            deleted += len(ids)
    return deleted


class Command(BaseCommand):
    help = "Импортировать контент из фронтенда и обновить записи"

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Полностью очистить контент перед импортом",
        )
        parser.add_argument(
            "--no-fixture",
            action="store_true",
            help="Не сохранять данные в fixtures",
        )
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Удалить текущий контент и переимпортировать из фронтенда",
        )

    def handle(self, *args, **options):
        if options["reset"]:
            deleted = _purge_corrupted_records()
            import_content(clear=True, write_fixture=not options["no_fixture"])
            self.stdout.write(
                self.style.SUCCESS(
                    f"Удалено записей с '?': {deleted}. Контент импортирован заново."
                )
            )
            return

        import_content(clear=options["clear"], write_fixture=not options["no_fixture"])
        self.stdout.write(self.style.SUCCESS("Контент импортирован."))
