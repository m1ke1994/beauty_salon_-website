import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Выберите услугу и дату",
    description:
      "Заполните короткую форму и выберите удобное время. Мы подтвердим запись в течение часа.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Подтвердите запись",
    description:
      "Мы уточним детали и при необходимости подберем мастера под ваш запрос.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Наслаждайтесь результатом",
    description:
      "Расслабьтесь в уютной атмосфере и получите безупречный результат, который подчеркивает ваш стиль.",
  },
];

export function StepsSection() {
  return (
    <section id="steps" className="section-padding scroll-mt-header">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-widest">
            Простой процесс
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-3 mb-4">
            Как проходит запись
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы сделали запись максимально удобной — всего три шага до вашей
            идеальной процедуры.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-gold/20 via-gold to-gold/20" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-card shadow-card mb-6 z-10">
                  <step.icon className="h-8 w-8 text-gold" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold text-graphite text-sm font-semibold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-medium mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
