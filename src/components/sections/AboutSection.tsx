import { Award, Clock, Heart, Shield } from "lucide-react";
import { Reveal } from "@/components/anim/Reveal";

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
    <section id="about" className="section-padding bg-muted/40 scroll-mt-header">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal variant="slideRight" className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop"
                alt="Interior of Belleza beauty studio"
                width={800}
                height={1000}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/30 to-transparent" />
            </div>
            <Reveal
              variant="fadeUp"
              delay={0.2}
              className="absolute top-4 left-4 w-[200px] bg-card rounded-xl p-6 shadow-elevated md:top-6 md:left-6"
            >
              <div className="font-serif text-4xl font-semibold text-gradient-gold">
                5000+
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                довольных клиентов
              </div>
            </Reveal>
          </Reveal>

          <Reveal variant="slideLeft">
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
                <Reveal
                  key={feature.title}
                  variant="fadeUp"
                  delay={index * 0.08}
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
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
