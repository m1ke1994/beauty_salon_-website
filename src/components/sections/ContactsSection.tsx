import { motion } from "framer-motion";
import { Clock, Instagram, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
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
                <Button variant="gold-outline" size="lg" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full overflow-hidden rounded-2xl shadow-card aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[260px] lg:min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.4319842726896!2d37.60396231593095!3d55.76429998055629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0KLQstC10YDRgdC60LDRjyDRg9C7Liwg0JzQvtGB0LrQstCw!5e0!3m2!1sru!2sru!4v1609836657000!5m2!1sru!2sru"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location map"
              className="h-full w-full grayscale transition-all duration-500 hover:grayscale-0"
            />
            <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <div className="font-serif text-lg font-medium">Belleza</div>
              <div className="text-sm text-muted-foreground">
                ул. Тверская, 15
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
