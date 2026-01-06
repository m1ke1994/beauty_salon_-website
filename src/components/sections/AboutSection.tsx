import { motion } from "framer-motion";
import { Award, Clock, Heart, Shield } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "8+ лет опыта",
    description: "Сильная команда мастеров и стабильный высокий уровень сервиса.",
  },
  {
    icon: Shield,
    title: "Стерильность",
    description: "Одноразовые расходники и строгий контроль обработки.",
  },
  {
    icon: Heart,
    title: "Премиальные материалы",
    description: "Только проверенные бренды с деликатными формулами.",
  },
  {
    icon: Clock,
    title: "Гарантия качества",
    description: "Бесплатная коррекция в течение 7 дней после процедуры.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-cream-dark/50">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop"
                alt="Interior of Belleza beauty studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/30 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-card rounded-xl p-6 shadow-elevated max-w-[200px]"
            >
              <div className="font-serif text-4xl font-semibold text-gradient-gold">
                5000+
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                довольных клиентов
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-gold uppercase tracking-widest">
              О нашей студии
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mt-3 mb-6">
              Belleza — пространство красоты и заботы
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Мы создали студию, где каждая деталь продумана для вашего
              комфорта. Наши мастера постоянно совершенствуют технику и следят
              за трендами, чтобы предлагать современный и безупречный результат.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              В работе мы используем премиальные материалы и соблюдаем строгие
              протоколы стерильности. Это гарантирует безопасность, долговечность
              и эстетичность каждой процедуры.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <feature.icon className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
