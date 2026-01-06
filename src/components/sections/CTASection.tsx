import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite to-graphite-light" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:40px_40px]" />

      <div className="absolute top-10 left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-gold/10 rounded-full blur-3xl animate-float" />

      <div className="container-narrow relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 text-gold mb-8">
            <Gift className="h-4 w-4" />
            <span className="text-sm font-medium">Скидка 15% на первый визит</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">
            Готовы к идеальному{" "}
            <span className="text-gold">образу</span>?
          </h2>

          <p className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Запишитесь онлайн или позвоните нам — мы подберем лучшее время и
            мастера под ваш запрос.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking">
              <Button variant="gold" size="xl" className="group animate-glow">
                Записаться сейчас
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="tel:+79001234567">
              <Button
                variant="outline"
                size="xl"
                className="border-white/30 text-white hover:bg-white hover:text-graphite"
              >
                Позвонить нам
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
