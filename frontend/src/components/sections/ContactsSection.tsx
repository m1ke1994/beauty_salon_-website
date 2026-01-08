import { Clock, Instagram, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { YandexMap } from "@/components/ui/YandexMap";
import { YA_MAP_PLACE_URL, YA_MAP_ROUTE_URL } from "@/config/links";
import { Reveal } from "@/components/anim/Reveal";

const contactInfo = [
  {
    icon: MapPin,
    title: "Адрес",
    content: "г. Москва, ул. Тверская, д. 15, офис 301",
    subtext: "5 минут от метро Тверская",
  },
  {
    icon: Phone,
    title: "Телефон",
    content: "+7 (900) 123-45-67",
    link: "tel:+79001234567",
  },
  {
    icon: Clock,
    title: "График работы",
    content: "Пн–Сб: 10:00–21:00",
    subtext: "Вс: 11:00–19:00",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    href: "https://instagram.com/belleza",
    label: "Instagram",
    color: "hover:bg-pink-500",
  },
  {
    icon: Send,
    href: "https://t.me/belleza",
    label: "Telegram",
    color: "hover:bg-blue-500",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/79001234567",
    label: "WhatsApp",
    color: "hover:bg-green-500",
  },
];

export function ContactsSection() {
  return (
    <section id="contacts" className="section-padding scroll-mt-header">
      <div className="container-narrow">
        <Reveal variant="fadeUp" className="text-center mb-16">
          <span className="text-sm font-medium text-gold uppercase tracking-widest">
            Свяжитесь с нами
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-3 mb-4">
            Контакты
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы всегда на связи: ответим на вопросы, подберем мастера и
            забронируем удобное время.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Reveal variant="slideRight" className="space-y-8">
            {contactInfo.map((item) => (
              <div key={item.title} className="flex gap-5">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                    {item.title}
                  </h4>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="font-serif text-xl font-medium hover:text-gold transition-colors"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <div className="font-serif text-xl font-medium">
                      {item.content}
                    </div>
                  )}
                  {item.subtext && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {item.subtext}
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-border">
              <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
                Мы в соцсетях
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <a href="tel:+79001234567">
                <Button variant="gold" size="lg" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Позвонить
                </Button>
              </a>
              <a href="https://wa.me/79001234567" target="_blank" rel="noopener noreferrer">
               
              </a>
            </div>
          </Reveal>

          <Reveal variant="slideLeft" className="relative">
            <YandexMap />
            <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <div className="font-serif text-lg font-medium">Belleza</div>
              <div className="text-sm text-muted-foreground">
                {"\u0443\u043b. \u0422\u0432\u0435\u0440\u0441\u043a\u0430\u044f, 15"}
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={YA_MAP_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background/80 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                {"\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432 \u042f\u043d\u0434\u0435\u043a\u0441.\u041a\u0430\u0440\u0442\u0430\u0445"}
              </a>
              <a
                href={YA_MAP_ROUTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background/80 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                {"\u041f\u043e\u0441\u0442\u0440\u043e\u0438\u0442\u044c \u043c\u0430\u0440\u0448\u0440\u0443\u0442"}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
