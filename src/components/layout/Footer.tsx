import { Clock, Instagram, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Send, href: "https://t.me/belleza", label: "Telegram" },
  { icon: MessageCircle, href: "https://wa.me/79001234567", label: "WhatsApp" },
];

const quickLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#prices", label: "Цены" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "/booking", label: "Записаться онлайн" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-graphite text-white">
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <h3 className="font-serif text-3xl font-semibold text-gold mb-4">
              Belleza
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Салон красоты с атмосферой частного клуба. Эстетика, сервис и
              безупречное качество в каждой детали.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-4">Навигация</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      className="text-white/70 hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-4">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  г. Москва, ул. Тверская, д. 15, офис 301
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <a
                  href="tel:+79001234567"
                  className="text-white/70 hover:text-gold transition-colors text-sm"
                >
                  +7 (900) 123-45-67
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Пн–Сб: 10:00–21:00
                  <br />
                  Вс: 11:00–19:00
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-4">Запись</h4>
            <p className="text-white/70 text-sm mb-4">
              Выберите удобное время и получите первоклассный сервис.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center justify-center h-12 px-6 rounded-md bg-gold text-white font-medium hover:bg-gold-dark transition-colors duration-300"
            >
              Записаться онлайн
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} Belleza. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-white/50 hover:text-gold transition-colors text-sm"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
