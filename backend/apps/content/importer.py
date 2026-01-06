from pathlib import Path
import json
import re
from django.core.management import call_command
from django.db import transaction
from .models import Page, Section, SectionItem, Review, PriceCategory, PriceItem, PortfolioItem
from apps.site_settings.models import SiteSettings


def _repo_root() -> Path:
    path = Path(__file__).resolve()
    backend_root = None
    for parent in [path.parent] + list(path.parents):
        if (parent / "package.json").exists() and (parent / "src").exists():
            return parent
        if (parent / "frontend" / "package.json").exists():
            return parent / "frontend"
        if (parent / "manage.py").exists():
            backend_root = parent
    if backend_root is not None:
        return backend_root
    return path.parent


def _read_frontend(rel_path: str) -> str:
    path = _repo_root() / rel_path
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")


def _extract_array(text: str, var_name: str) -> str:
    match = re.search(rf"const {var_name}\\s*=\\s*\\[(.*?)\\];", text, re.S)
    return match.group(1) if match else ""


def _to_json_array(array_body: str):
    if not array_body:
        return []
    json_like = "[" + array_body + "]"
    json_like = re.sub(r"(\\w+)\\s*:", r'"\\1":', json_like)

    def _identifier_to_string(match):
        value = match.group(1)
        if value in {"true", "false", "null"}:
            return f": {value}"
        return f': "{value}"'

    json_like = re.sub(r":\\s*([A-Za-z_][A-Za-z0-9_]*)", _identifier_to_string, json_like)
    json_like = re.sub(r",\\s*([}\]])", r"\\1", json_like)
    return json.loads(json_like)


def _extract_inline_array(text: str, marker: str) -> str:
    match = re.search(marker, text, re.S)
    if not match:
        return ""
    segment = match.group(0)
    start = segment.find("[")
    end = segment.rfind("]")
    if start == -1 or end == -1:
        return ""
    return segment[start + 1 : end]


def _parse_urls(text: str):
    return re.findall(r'"(https?://[^"]+)"', text)


def _fallback_data():
    return {
        "hero": {
            "badge": "Премиум-салон красоты",
            "title": "Искусство красоты",
            "title_highlight": "в каждом штрихе",
            "description": (
                "Маникюр, педикюр, ресницы, брови и уходовые программы - в атмосфере "
                "частного клуба с безупречным сервисом и персональными мастерами."
            ),
            "primary_cta_text": "Записаться онлайн",
            "primary_cta_url": "/booking#booking",
            "secondary_cta_text": "Смотреть услуги",
            "secondary_cta_url": "#services",
            "stats": [
                {"value": "8+", "label": "лет опыта"},
                {"value": "5 000+", "label": "довольных клиентов"},
                {"value": "15+", "label": "авторских услуг"},
            ],
        },
        "services": [
            {
                "icon": "Hand",
                "title": "Маникюр и педикюр",
                "description": (
                    "Аппаратные техники, бережная обработка и стойкое покрытие "
                    "с идеальной архитектурой ногтя."
                ),
                "features": ["Премиальные материалы", "SPA-ритуал для рук", "Стерильные инструменты"],
            },
            {
                "icon": "Sparkles",
                "title": "Наращивание ресниц",
                "description": "От естественной классики до выразительных 2D-5D. Легкие пучки и точная посадка.",
                "features": ["Невесомый эффект", "Подбор изгиба", "Индивидуальная схема"],
            },
            {
                "icon": "Eye",
                "title": "Брови",
                "description": "Коррекция формы, окрашивание и ламинирование для мягкой графики и гармонии лица.",
                "features": ["Точный эскиз", "Деликатные красители", "Долгий эффект"],
            },
            {
                "icon": "Scissors",
                "title": "Стрижки и укладки",
                "description": "Современные формы, укладка под ваш стиль и рекомендации по домашнему уходу.",
                "features": ["Силуэт и текстура", "Термозащита", "Финиш с блеском"],
            },
            {
                "icon": "Heart",
                "title": "Уходовые ритуалы",
                "description": "Восстановление и расслабление: массажи, маски и премиальные уходы для кожи.",
                "features": ["Парафинотерапия", "Глубокое питание", "Результат после первого сеанса"],
            },
        ],
        "features": [
            {
                "icon": "Award",
                "title": "8+ лет опыта",
                "description": "Сильная команда мастеров и стабильный высокий уровень сервиса.",
            },
            {
                "icon": "Shield",
                "title": "Стерильность",
                "description": "Одноразовые расходники и строгий контроль обработки.",
            },
            {
                "icon": "Heart",
                "title": "Премиальные материалы",
                "description": "Только проверенные бренды с деликатными формулами.",
            },
            {
                "icon": "Clock",
                "title": "Гарантия качества",
                "description": "Бесплатная коррекция в течение 7 дней после процедуры.",
            },
        ],
        "steps": [
            {
                "number": "01",
                "icon": "CalendarCheck",
                "title": "Выберите услугу и дату",
                "description": (
                    "Заполните короткую форму и выберите удобное время. "
                    "Мы подтвердим запись в течение часа."
                ),
            },
            {
                "number": "02",
                "icon": "MessageCircle",
                "title": "Подтвердите запись",
                "description": "Мы уточним детали и при необходимости подберем мастера под ваш запрос.",
            },
            {
                "number": "03",
                "icon": "Sparkles",
                "title": "Наслаждайтесь результатом",
                "description": (
                    "Расслабьтесь в уютной атмосфере и получите безупречный результат, "
                    "который подчеркивает ваш стиль."
                ),
            },
        ],
        "price_categories": [
            {
                "title": "Маникюр",
                "items": [
                    {"name": "Классический маникюр", "price": "1 200 ₽", "duration": "60 мин"},
                    {
                        "name": "Маникюр + покрытие гель-лак",
                        "price": "2 500 ₽",
                        "duration": "90 мин",
                        "popular": True,
                    },
                    {"name": "Укрепление + дизайн", "price": "3 000 ₽", "duration": "100 мин"},
                    {"name": "Снятие покрытия", "price": "400 ₽", "duration": ""},
                ],
            },
            {
                "title": "Педикюр",
                "items": [
                    {"name": "Классический педикюр", "price": "2 000 ₽", "duration": "75 мин"},
                    {
                        "name": "Педикюр + покрытие гель-лак",
                        "price": "3 200 ₽",
                        "duration": "105 мин",
                        "popular": True,
                    },
                    {"name": "SPA-педикюр", "price": "4 000 ₽", "duration": "120 мин"},
                ],
            },
            {
                "title": "Ресницы",
                "items": [
                    {"name": "Классическое наращивание", "price": "3 000 ₽", "duration": "120 мин"},
                    {"name": "Эффект 2D", "price": "3 500 ₽", "duration": "150 мин", "popular": True},
                    {"name": "Эффект 3D-5D", "price": "4 500 ₽", "duration": "180 мин"},
                    {"name": "Ламинирование + ботокс", "price": "2 500 ₽", "duration": "60 мин"},
                    {"name": "Снятие ресниц", "price": "500 ₽", "duration": "30 мин"},
                ],
            },
            {
                "title": "Брови",
                "items": [
                    {"name": "Коррекция + окрашивание", "price": "1 200 ₽", "duration": "45 мин"},
                    {"name": "Окрашивание бровей", "price": "800 ₽", "duration": "30 мин"},
                    {
                        "name": "Ламинирование бровей",
                        "price": "1 500 ₽",
                        "duration": "60 мин",
                        "popular": True,
                    },
                    {"name": "Ламинирование + окрашивание", "price": "2 000 ₽", "duration": "60 мин"},
                ],
            },
        ],
        "reviews": [
            {
                "name": "Мария К.",
                "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "rating": 5,
                "text": (
                    "Идеальный маникюр, очень аккуратно и красиво. Атмосфера как в частном клубе, "
                    "мастера - настоящие профессионалы."
                ),
                "service": "Маникюр + покрытие",
                "date": "15 октября 2024",
            },
            {
                "name": "Алина Р.",
                "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
                "rating": 5,
                "text": "Делала ресницы 2D - получился мягкий, естественный эффект. Ничего не утяжеляет, держится идеально.",
                "service": "Эффект 2D",
                "date": "8 октября 2024",
            },
            {
                "name": "Екатерина М.",
                "avatar": "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop",
                "rating": 5,
                "text": "Ламинирование бровей - это любовь. Сразу другой взгляд и ухоженность, без лишнего макияжа.",
                "service": "Ламинирование бровей",
                "date": "1 октября 2024",
            },
            {
                "name": "Ольга Т.",
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
                "rating": 5,
                "text": "SPA-педикюр - настоящее расслабление. Очень комфортно, результат заметен сразу. Вернусь еще.",
                "service": "SPA-педикюр",
                "date": "25 сентября 2024",
            },
        ],
        "portfolio_items": [
            {
                "category": "Маникюр",
                "image": "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop",
                "title": "Нюдовый маникюр с архитектурой",
            },
            {
                "category": "Ресницы",
                "image": "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&h=600&fit=crop",
                "title": "Эффект 2D с мягким изгибом",
            },
            {
                "category": "Маникюр",
                "image": "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=600&fit=crop",
                "title": "Глянцевое покрытие и тонкий дизайн",
            },
            {
                "category": "Брови",
                "image": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=600&fit=crop",
                "title": "Ламинирование и окрашивание бровей",
            },
            {
                "category": "Педикюр",
                "image": "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&h=600&fit=crop",
                "title": "SPA-педикюр с уходом",
            },
            {
                "category": "Маникюр",
                "image": "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop",
                "title": "Френч с современной линией",
            },
        ],
        "portfolio_categories": ["Все", "Маникюр", "Педикюр", "Ресницы", "Брови"],
        "contact_info": [
            {
                "icon": "MapPin",
                "title": "Адрес",
                "content": "г. Москва, ул. Тверская, д. 15, офис 301",
                "subtext": "5 минут от метро Тверская",
            },
            {
                "icon": "Phone",
                "title": "Телефон",
                "content": "+7 (900) 123-45-67",
                "link": "tel:+79001234567",
            },
            {
                "icon": "Clock",
                "title": "График работы",
                "content": "Пн-Сб: 10:00-21:00",
                "subtext": "Вс: 11:00-19:00",
            },
        ],
        "social_links": [
            {"icon": "Instagram", "href": "https://instagram.com/belleza", "label": "Instagram"},
            {"icon": "Send", "href": "https://t.me/belleza", "label": "Telegram"},
            {"icon": "MessageCircle", "href": "https://wa.me/79001234567", "label": "WhatsApp"},
        ],
        "navigation_links": [
            {"href": "#services", "label": "Услуги"},
            {"href": "#prices", "label": "Цены"},
            {"href": "#portfolio", "label": "Портфолио"},
            {"href": "#reviews", "label": "Отзывы"},
            {"href": "#about", "label": "О нас"},
            {"href": "#steps", "label": "Этапы"},
            {"href": "#contacts", "label": "Контакты"},
        ],
        "footer_links": [
            {"href": "/#services", "label": "Услуги"},
            {"href": "/#prices", "label": "Цены"},
            {"href": "/#portfolio", "label": "Портфолио"},
            {"href": "/#reviews", "label": "Отзывы"},
            {"href": "/#about", "label": "О нас"},
            {"href": "/#contacts", "label": "Контакты"},
            {"href": "/booking#booking", "label": "Записаться онлайн"},
        ],
        "booking_services": [
            {"value": "manicure", "label": "Маникюр + покрытие гель-лак"},
            {"value": "pedicure", "label": "Педикюр + покрытие гель-лак"},
            {"value": "lashes-classic", "label": "Наращивание ресниц (классика)"},
            {"value": "lashes-2d", "label": "Наращивание ресниц (2D)"},
            {"value": "lashes-3d", "label": "Наращивание ресниц (3D-5D)"},
            {"value": "brows", "label": "Коррекция и окрашивание бровей"},
            {"value": "brows-lamination", "label": "Ламинирование бровей"},
            {"value": "lash-lamination", "label": "Ламинирование ресниц"},
            {"value": "other", "label": "Другая услуга (укажите в комментарии)"},
        ],
        "booking_times": [
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
        ],
    }


def _parse_frontend():
    data = _fallback_data()

    services_text = _read_frontend("src/components/sections/ServicesSection.tsx")
    services = _to_json_array(_extract_array(services_text, "services"))
    if services:
        data["services"] = services

    about_text = _read_frontend("src/components/sections/AboutSection.tsx")
    features = _to_json_array(_extract_array(about_text, "features"))
    if features:
        data["features"] = features

    steps_text = _read_frontend("src/components/sections/StepsSection.tsx")
    steps = _to_json_array(_extract_array(steps_text, "steps"))
    if steps:
        data["steps"] = steps

    prices_text = _read_frontend("src/components/sections/PricesSection.tsx")
    price_categories = _to_json_array(_extract_array(prices_text, "priceCategories"))
    if price_categories:
        data["price_categories"] = price_categories

    reviews_text = _read_frontend("src/components/sections/ReviewsSection.tsx")
    reviews = _to_json_array(_extract_array(reviews_text, "reviews"))
    if reviews:
        data["reviews"] = reviews

    portfolio_text = _read_frontend("src/components/sections/PortfolioSection.tsx")
    portfolio_items = _to_json_array(_extract_array(portfolio_text, "portfolioItems"))
    if portfolio_items:
        data["portfolio_items"] = portfolio_items
    categories_body = _extract_array(portfolio_text, "categories")
    if categories_body:
        categories = json.loads("[" + categories_body + "]")
        data["portfolio_categories"] = categories

    contact_text = _read_frontend("src/components/sections/ContactsSection.tsx")
    contact_info = _to_json_array(_extract_array(contact_text, "contactInfo"))
    if contact_info:
        data["contact_info"] = contact_info
    social_links = _to_json_array(_extract_array(contact_text, "socialLinks"))
    if social_links:
        data["social_links"] = social_links

    header_text = _read_frontend("src/components/layout/Header.tsx")
    nav_links = _to_json_array(_extract_array(header_text, "navLinks"))
    if nav_links:
        data["navigation_links"] = nav_links

    footer_text = _read_frontend("src/components/layout/Footer.tsx")
    footer_links = _to_json_array(_extract_array(footer_text, "quickLinks"))
    if footer_links:
        data["footer_links"] = footer_links

    booking_text = _read_frontend("src/pages/Booking.tsx")
    booking_services = _to_json_array(_extract_array(booking_text, "services"))
    if booking_services:
        data["booking_services"] = booking_services
    time_slots_body = _extract_array(booking_text, "timeSlots")
    if time_slots_body:
        data["booking_times"] = json.loads("[" + time_slots_body + "]")

    hero_text = _read_frontend("src/components/sections/HeroSection.tsx")
    stats_body = _extract_inline_array(hero_text, r"\\[\\s*{[^]]+}\\s*\\]\\.map")
    stats = _to_json_array(stats_body)
    if stats:
        data["hero"]["stats"] = stats

    links_text = _read_frontend("src/config/links.ts")
    urls = _parse_urls(links_text)
    if urls:
        data["map_place_url"] = urls[0]
        if len(urls) > 1:
            data["map_route_url"] = urls[1]
        if len(urls) > 2:
            data["map_iframe_src"] = urls[2]

    return data


def import_content(clear: bool = False, write_fixture: bool = True) -> None:
    data = _parse_frontend()

    with transaction.atomic():
        if clear:
            SectionItem.objects.all().delete()
            Section.objects.all().delete()
            Page.objects.all().delete()
            Review.objects.all().delete()
            PriceItem.objects.all().delete()
            PriceCategory.objects.all().delete()
            PortfolioItem.objects.all().delete()
            SiteSettings.objects.all().delete()

        settings = SiteSettings.objects.first() or SiteSettings()
        settings.site_name = "Belleza"
        settings.phone = "+79001234567"
        settings.phone_display = "+7 (900) 123-45-67"
        settings.address = "г. Москва, ул. Тверская, д. 15, офис 301"
        settings.address_note = "5 минут от метро Тверская"
        settings.work_hours = "Пн-Сб: 10:00-21:00"
        settings.work_hours_note = "Вс: 11:00-19:00"
        settings.footer_text = (
            "Салон красоты с атмосферой частного клуба. "
            "Эстетика, сервис и безупречное качество в каждой детали."
        )
        settings.instagram_url = "https://instagram.com/belleza"
        settings.telegram_url = "https://t.me/belleza"
        settings.whatsapp_url = "https://wa.me/79001234567"
        settings.navigation_links = data.get("navigation_links", [])
        settings.footer_links = data.get("footer_links", [])
        settings.social_links = data.get("social_links", [])
        settings.map_place_url = data.get("map_place_url", "")
        settings.map_route_url = data.get("map_route_url", settings.map_place_url)
        settings.map_iframe_src = data.get("map_iframe_src", "")
        settings.save()

        pages = {
            "home": Page.objects.create(title="Главная", slug="home", order=1),
            "booking": Page.objects.create(title="Запись", slug="booking", order=2),
            "privacy": Page.objects.create(title="Политика конфиденциальности", slug="privacy", order=3),
            "not-found": Page.objects.create(title="Страница не найдена", slug="not-found", order=4),
        }

        hero = data["hero"]
        hero_section = Section.objects.create(
            page=pages["home"],
            title=hero["title"],
            subtitle=hero["badge"],
            description=hero["description"],
            slug="hero",
            order=1,
            extra={
                "title_highlight": hero["title_highlight"],
                "primary_cta_text": hero["primary_cta_text"],
                "primary_cta_url": hero["primary_cta_url"],
                "secondary_cta_text": hero["secondary_cta_text"],
                "secondary_cta_url": hero["secondary_cta_url"],
            },
        )
        for index, stat in enumerate(hero.get("stats", []), start=1):
            SectionItem.objects.create(
                section=hero_section,
                title=stat.get("label", ""),
                subtitle=stat.get("value", ""),
                order=index,
            )

        services_section = Section.objects.create(
            page=pages["home"],
            title="Наши услуги",
            subtitle="Экспертиза и внимание к деталям",
            description=(
                "Сервисы, в которых каждая деталь продумана - от техники до "
                "впечатления. Мы создаем ухоженный образ, который подчеркивает вашу "
                "индивидуальность."
            ),
            slug="services",
            order=2,
        )
        for index, service in enumerate(data.get("services", []), start=1):
            SectionItem.objects.create(
                section=services_section,
                title=service.get("title", ""),
                text=service.get("description", ""),
                icon=service.get("icon", ""),
                order=index,
                meta={"features": service.get("features", [])},
            )

        prices_section = Section.objects.create(
            page=pages["home"],
            title="Прайс-лист",
            subtitle="Прозрачные и честные цены",
            description=(
                "Все услуги фиксированы по стоимости. Окончательная цена зависит от "
                "выбранного дизайна и сложности работы."
            ),
            slug="prices",
            order=3,
            extra={
                "note": "Консультация мастера включена в стоимость",
                "cta_text": "Записаться на услугу",
                "cta_url": "/booking",
            },
        )
        for cat_index, category in enumerate(data.get("price_categories", []), start=1):
            price_category = PriceCategory.objects.create(
                title=category.get("title", ""),
                order=cat_index,
            )
            for item_index, item in enumerate(category.get("items", []), start=1):
                PriceItem.objects.create(
                    category=price_category,
                    name=item.get("name", ""),
                    price=item.get("price", ""),
                    duration=item.get("duration", ""),
                    is_popular=item.get("popular", False),
                    order=item_index,
                )

        portfolio_section = Section.objects.create(
            page=pages["home"],
            title="Галерея впечатлений",
            subtitle="Портфолио работ",
            description=(
                "Эстетика, аккуратность и стойкий результат. Примеры работ, которые "
                "вдохновляют и задают высокий стандарт качества."
            ),
            slug="portfolio",
            order=4,
            extra={"categories": data.get("portfolio_categories", [])},
        )
        for index, item in enumerate(data.get("portfolio_items", []), start=1):
            PortfolioItem.objects.create(
                category=item.get("category", ""),
                title=item.get("title", ""),
                image_url=item.get("image", ""),
                order=index,
            )

        reviews_section = Section.objects.create(
            page=pages["home"],
            title="Нам доверяют уход",
            subtitle="Отзывы клиентов",
            description=(
                "Сотни девушек выбирают Belleza за стабильное качество, эстетику и "
                "внимательное отношение."
            ),
            slug="reviews",
            order=5,
        )
        for index, review in enumerate(data.get("reviews", []), start=1):
            Review.objects.create(
                name=review.get("name", ""),
                avatar_url=review.get("avatar", ""),
                rating=review.get("rating", 5),
                text=review.get("text", ""),
                service=review.get("service", ""),
                date=review.get("date", ""),
                order=index,
            )

        about_section = Section.objects.create(
            page=pages["home"],
            title="Belleza - пространство красоты и заботы",
            subtitle="О нашей студии",
            description=(
                "Мы создали студию, где каждая деталь продумана для вашего комфорта. "
                "Наши мастера постоянно совершенствуют технику и следят за трендами, "
                "чтобы предлагать современный и безупречный результат.\n\n"
                "В работе мы используем премиальные материалы и соблюдаем строгие "
                "протоколы стерильности. Это гарантирует безопасность, долговечность "
                "и эстетичность каждой процедуры."
            ),
            slug="about",
            order=6,
            extra={
                "image_url": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop",
                "image_alt": "Interior of Belleza beauty studio",
                "highlight_value": "5000+",
                "highlight_label": "довольных клиентов",
            },
        )
        for index, feature in enumerate(data.get("features", []), start=1):
            SectionItem.objects.create(
                section=about_section,
                title=feature.get("title", ""),
                text=feature.get("description", ""),
                icon=feature.get("icon", ""),
                order=index,
            )

        steps_section = Section.objects.create(
            page=pages["home"],
            title="Как проходит запись",
            subtitle="Простой процесс",
            description=(
                "Мы сделали запись максимально удобной - всего три шага до вашей "
                "идеальной процедуры."
            ),
            slug="steps",
            order=7,
        )
        for index, step in enumerate(data.get("steps", []), start=1):
            SectionItem.objects.create(
                section=steps_section,
                title=step.get("title", ""),
                text=step.get("description", ""),
                icon=step.get("icon", ""),
                order=index,
                meta={"number": step.get("number", "")},
            )

        contacts_section = Section.objects.create(
            page=pages["home"],
            title="Контакты",
            subtitle="Свяжитесь с нами",
            description=(
                "Мы всегда на связи: ответим на вопросы, подберем мастера и "
                "забронируем удобное время."
            ),
            slug="contacts",
            order=8,
            extra={
                "social_links": data.get("social_links", []),
                "cta_primary_text": "Позвонить",
                "cta_primary_url": "tel:+79001234567",
                "cta_secondary_text": "WhatsApp",
                "cta_secondary_url": "https://wa.me/79001234567",
                "map_place_url": settings.map_place_url,
                "map_route_url": settings.map_route_url,
            },
        )
        for index, item in enumerate(data.get("contact_info", []), start=1):
            SectionItem.objects.create(
                section=contacts_section,
                title=item.get("title", ""),
                text=item.get("content", ""),
                icon=item.get("icon", ""),
                order=index,
                meta={
                    "subtext": item.get("subtext", ""),
                    "link": item.get("link", ""),
                },
            )

        cta_section = Section.objects.create(
            page=pages["home"],
            title="Готовы к идеальному образу?",
            subtitle="Скидка 15% на первый визит",
            description=(
                "Запишитесь онлайн или позвоните нам - мы подберем лучшее время и "
                "мастера под ваш запрос."
            ),
            slug="cta",
            order=9,
            extra={
                "primary_cta_text": "Записаться сейчас",
                "primary_cta_url": "/booking#booking",
                "secondary_cta_text": "Позвонить нам",
                "secondary_cta_url": "tel:+79001234567",
            },
        )

        booking_header = Section.objects.create(
            page=pages["booking"],
            title="Запись на услугу",
            subtitle="",
            description=(
                "Заполните форму - мы подтвердим дату и подберем мастера под ваш запрос."
            ),
            slug="booking",
            order=1,
            extra={"back_link_text": "Вернуться на главную", "back_link_url": "/"},
        )

        booking_form = Section.objects.create(
            page=pages["booking"],
            title="Форма записи",
            subtitle="",
            description="",
            slug="booking-form",
            order=2,
            extra={
                "submit_text": "Отправить заявку",
                "submit_loading_text": "Отправка...",
                "consent_text": "Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности",
                "consent_url": "/privacy",
            },
        )
        form_fields = [
            {"title": "Имя и фамилия *", "subtitle": "Анна Иванова"},
            {"title": "Телефон *", "subtitle": "+7 (900) 123-45-67"},
            {"title": "Услуга *", "subtitle": "Выберите услугу"},
            {"title": "Дата *", "subtitle": ""},
            {"title": "Время *", "subtitle": ""},
            {"title": "Комментарий", "subtitle": "Пожелания или уточнения к услуге..."},
        ]
        for index, field in enumerate(form_fields, start=1):
            SectionItem.objects.create(
                section=booking_form,
                title=field["title"],
                subtitle=field["subtitle"],
                order=index,
            )

        booking_services_section = Section.objects.create(
            page=pages["booking"],
            title="Список услуг",
            subtitle="",
            description="",
            slug="booking-services",
            order=3,
        )
        for index, service in enumerate(data.get("booking_services", []), start=1):
            SectionItem.objects.create(
                section=booking_services_section,
                title=service.get("label", ""),
                meta={"value": service.get("value", "")},
                order=index,
            )

        booking_times_section = Section.objects.create(
            page=pages["booking"],
            title="Доступное время",
            subtitle="",
            description="",
            slug="booking-times",
            order=4,
        )
        for index, time in enumerate(data.get("booking_times", []), start=1):
            SectionItem.objects.create(
                section=booking_times_section,
                title=time,
                order=index,
            )

        booking_success = Section.objects.create(
            page=pages["booking"],
            title="Запись подтверждена!",
            subtitle="",
            description=(
                "Мы получили вашу заявку. В ближайшее время администратор свяжется с вами "
                "для уточнения деталей."
            ),
            slug="booking-success",
            order=5,
            extra={"cta_text": "На главную", "cta_url": "/"},
        )

        privacy_header = Section.objects.create(
            page=pages["privacy"],
            title="Политика конфиденциальности",
            subtitle="",
            description="Последнее обновление: 1 января 2025 г.",
            slug="privacy",
            order=1,
        )

        privacy_sections = [
            {
                "title": "1. Общие положения",
                "text": (
                    "Настоящая политика конфиденциальности определяет порядок обработки и защиты "
                    "персональных данных клиентов салона Belleza. Мы уважаем вашу приватность и "
                    "используем данные только для обеспечения качества сервиса."
                ),
            },
            {
                "title": "2. Какие данные мы собираем",
                "text": "Мы можем собирать следующие категории данных:",
                "list": [
                    "Имя и фамилия",
                    "Контактный телефон",
                    "Дата и время записи",
                    "Информация о выбранных услугах",
                    "Комментарий к записи (если указан)",
                ],
            },
            {
                "title": "3. Цели обработки данных",
                "text": "Персональные данные используются для:",
                "list": [
                    "Подтверждения и управления записью",
                    "Связи с клиентом по вопросам визита",
                    "Повышения качества сервиса",
                    "Отправки уведомлений об изменениях записи",
                ],
            },
            {
                "title": "4. Защита данных",
                "text": (
                    "Мы принимаем необходимые организационные и технические меры для защиты "
                    "персональных данных от утраты, неправомерного доступа и раскрытия."
                ),
            },
            {
                "title": "5. Передача данных третьим лицам",
                "text": (
                    "Мы не передаем персональные данные третьим лицам, за исключением случаев, "
                    "предусмотренных законодательством."
                ),
            },
            {
                "title": "6. Срок хранения",
                "text": (
                    "Данные хранятся в течение времени, необходимого для оказания услуг, и удаляются "
                    "по запросу клиента или по завершении срока хранения согласно требованиям закона."
                ),
            },
            {
                "title": "7. Контакты",
                "text": (
                    "По вопросам обработки персональных данных вы можете связаться с нами по телефону "
                    "+7 (900) 123-45-67 или по адресу: г. Москва, ул. Тверская, д. 15, офис 301."
                ),
            },
        ]
        for index, section in enumerate(privacy_sections, start=1):
            SectionItem.objects.create(
                section=privacy_header,
                title=section["title"],
                text=section["text"],
                order=index,
                meta={"list": section.get("list", [])},
            )

        not_found_section = Section.objects.create(
            page=pages["not-found"],
            title="Страница не найдена",
            subtitle="404",
            description="",
            slug="404",
            order=1,
            extra={"cta_text": "На главную", "cta_url": "/"},
        )

    if write_fixture:
        fixture_dir = Path(__file__).resolve().parents[3] / "fixtures"
        fixture_dir.mkdir(parents=True, exist_ok=True)
        fixture_path = fixture_dir / "initial_content.json"
        call_command(
            "dumpdata",
            "content",
            "site_settings",
            indent=2,
            output=str(fixture_path),
        )
