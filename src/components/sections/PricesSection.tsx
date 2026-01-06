import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const priceCategories = [
  {
    title: "Маникюр",
    items: [
      { name: "Классический маникюр", price: "1 200 ₽", duration: "60 мин" },
      {
        name: "Маникюр + покрытие гель‑лак",
        price: "2 500 ₽",
        duration: "90 мин",
        popular: true,
      },
      { name: "Укрепление + дизайн", price: "3 000 ₽", duration: "100 мин" },
      { name: "Снятие покрытия", price: "400 ₽", duration: "" },
    ],
  },
  {
    title: "Педикюр",
    items: [
      { name: "Классический педикюр", price: "2 000 ₽", duration: "75 мин" },
      {
        name: "Педикюр + покрытие гель‑лак",
        price: "3 200 ₽",
        duration: "105 мин",
        popular: true,
      },
      { name: "SPA‑педикюр", price: "4 000 ₽", duration: "120 мин" },
    ],
  },
  {
    title: "Ресницы",
    items: [
      { name: "Классическое наращивание", price: "3 000 ₽", duration: "120 мин" },
      { name: "Эффект 2D", price: "3 500 ₽", duration: "150 мин", popular: true },
      { name: "Эффект 3D–5D", price: "4 500 ₽", duration: "180 мин" },
      { name: "Ламинирование + ботокс", price: "2 500 ₽", duration: "60 мин" },
      { name: "Снятие ресниц", price: "500 ₽", duration: "30 мин" },
    ],
  },
  {
    title: "Брови",
    items: [
      { name: "Коррекция + окрашивание", price: "1 200 ₽", duration: "45 мин" },
      { name: "Окрашивание бровей", price: "800 ₽", duration: "30 мин" },
      { name: "Ламинирование бровей", price: "1 500 ₽", duration: "60 мин", popular: true },
      { name: "Ламинирование + окрашивание", price: "2 000 ₽", duration: "60 мин" },
    ],
  },
];

export function PricesSection() {
  return (
    <section id="prices" className="section-padding scroll-mt-header">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-widest">
            Прозрачные и честные цены
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-3 mb-4">
            Прайс‑лист
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Все услуги фиксированы по стоимости. Окончательная цена зависит от
            выбранного дизайна и сложности работы.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {priceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-soft"
            >
              <h3 className="font-serif text-2xl font-medium mb-6 pb-4 border-b border-border">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={`flex items-center justify-between py-3 ${
                      itemIndex !== category.items.length - 1
                        ? "border-b border-border/50"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.popular && (
                        <span className="flex items-center gap-1 text-xs font-medium text-gold bg-gold/10 px-2 py-1 rounded-full">
                          <Star className="h-3 w-3 fill-current" />
                          Хит
                        </span>
                      )}
                      <div>
                        <span className="text-foreground font-medium">
                          {item.name}
                        </span>
                        {item.duration && (
                          <span className="block text-sm text-muted-foreground mt-0.5">
                            {item.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="font-serif text-xl font-semibold text-gold whitespace-nowrap ml-4">
                      {item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground mb-6">
            <Check className="h-5 w-5 text-gold" />
            <span>Консультация мастера включена в стоимость</span>
          </div>
          <div>
            <Link to="/booking">
              <Button variant="gold" size="lg">
                Записаться на услугу
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
