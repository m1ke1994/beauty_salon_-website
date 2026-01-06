import { Eye, Hand, Heart, Scissors, Sparkles } from "lucide-react";
import { Reveal } from "@/components/anim/Reveal";

const services = [
  {
    icon: Hand,
    title: "Маникюр и педикюр",
    description:
      "Аппаратные техники, бережная обработка и стойкое покрытие с идеальной архитектурой ногтя.",
    features: ["Премиальные материалы", "SPA-ритуал для рук", "Стерильные инструменты"],
  },
  {
    icon: Sparkles,
    title: "Наращивание ресниц",
    description:
      "От естественной классики до выразительных 2D–5D. Легкие пучки и точная посадка.",
    features: ["Невесомый эффект", "Подбор изгиба", "Индивидуальная схема"],
  },
  {
    icon: Eye,
    title: "Брови",
    description:
      "Коррекция формы, окрашивание и ламинирование для мягкой графики и гармонии лица.",
    features: ["Точный эскиз", "Деликатные красители", "Долгий эффект"],
  },
  {
    icon: Scissors,
    title: "Стрижки и укладки",
    description:
      "Современные формы, укладка под ваш стиль и рекомендации по домашнему уходу.",
    features: ["Силуэт и текстура", "Термозащита", "Финиш с блеском"],
  },
  {
    icon: Heart,
    title: "Уходовые ритуалы",
    description:
      "Восстановление и расслабление: массажи, маски и премиальные уходы для кожи.",
    features: ["Парафинотерапия", "Глубокое питание", "Результат после первого сеанса"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-muted/40 scroll-mt-header">
      <div className="container-narrow">
        <Reveal
          variant="fadeUp"
          amount={0.4}
          margin="0px 0px -20% 0px"
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-widest">
            Экспертиза и внимание к деталям
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-3 mb-4">
            Наши услуги
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Сервисы, в которых каждая деталь продумана — от техники до
            впечатления. Мы создаем ухоженный образ, который подчеркивает вашу
            индивидуальность.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 0.08}
              amount={0.4}
              margin="0px 0px -20% 0px"
              className={`group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-500 ${
                index === services.length - 1 && services.length % 3 === 1
                  ? "lg:col-start-2"
                  : ""
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                <service.icon className="h-7 w-7 text-gold group-hover:text-graphite transition-colors" />
              </div>

              <h3 className="font-serif text-2xl font-medium mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-foreground/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
