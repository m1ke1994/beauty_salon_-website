import { Clock, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useContent";
import { getIconByName } from "@/lib/iconMap";

export function Footer() {
  const { data: settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();
  const brandName = settings?.site_name ?? "Belleza";
  const footerText = settings?.footer_text ?? "";
  const quickLinks = settings?.footer_links ?? [];
  const socialLinks = settings?.social_links ?? [];
  const phoneDisplay = settings?.phone_display ?? "+7 (900) 123-45-67";
  const phoneLink = settings?.phone ? `tel:${settings.phone}` : "tel:+79001234567";

  return (
    <footer
      id="footer"
      className="bg-graphite text-white dark:bg-background dark:text-foreground"
    >
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-1">
            <h3 className="font-serif text-3xl font-semibold text-gold mb-4">
              {brandName}
            </h3>
            {footerText && (
              <p className="text-white/70 text-sm leading-relaxed mb-6 dark:text-muted-foreground">
                {footerText}
              </p>
            )}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = getIconByName(social.icon);
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-300 dark:bg-muted"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
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
                      className="text-white/70 hover:text-gold transition-colors text-sm dark:text-muted-foreground"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-gold transition-colors text-sm dark:text-muted-foreground"
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
                <span className="text-white/70 text-sm dark:text-muted-foreground">
                  {settings?.address ?? ""}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <a
                  href={phoneLink}
                  className="text-white/70 hover:text-gold transition-colors text-sm dark:text-muted-foreground"
                >
                  {phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm dark:text-muted-foreground">
                  {settings?.work_hours ?? ""}
                  {settings?.work_hours_note && (
                    <>
                      <br />
                      {settings.work_hours_note}
                    </>
                  )}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-4">Запись</h4>
            <p className="text-white/70 text-sm mb-4 dark:text-muted-foreground">
              Оставьте заявку онлайн, и мы подберем удобное время для визита.
            </p>
            <Link
              to="/booking#booking"
              className="inline-flex items-center justify-center h-12 px-6 rounded-md bg-gold text-graphite font-medium hover:bg-gold-dark transition-colors duration-300"
            >
              Записаться онлайн
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 dark:border-border">
          <p className="text-white/50 text-sm dark:text-muted-foreground">
            © {currentYear} {brandName}. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-white/50 hover:text-gold transition-colors text-sm dark:text-muted-foreground"
            >
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
