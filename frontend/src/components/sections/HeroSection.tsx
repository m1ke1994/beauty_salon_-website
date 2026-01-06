import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scrollToSection";
import { usePage } from "@/hooks/useContent";
import { findSection, sortItems } from "@/lib/content";

export function HeroSection() {
  const { data: page } = usePage("home");
  const hero = findSection(page, "hero");
  const stats = sortItems(hero?.items);
  const extra = hero?.extra as Record<string, string> | undefined;

  if (!hero) {
    return null;
  }

  const primaryCtaUrl = extra?.primary_cta_url ?? "/booking#booking";
  const primaryCtaText = extra?.primary_cta_text ?? "Записаться онлайн";
  const secondaryCtaUrl = extra?.secondary_cta_url ?? "#services";
  const secondaryCtaText = extra?.secondary_cta_text ?? "Смотреть услуги";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-background to-blush/30" />

      <div className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blush/30 rounded-full blur-3xl animate-float" />

      <div className="container-narrow relative z-10 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold mb-8"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">{hero.subtitle}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-tight mb-6"
          >
            {hero.title}{" "}
            {extra?.title_highlight && (
              <span className="text-gradient-gold">{extra.title_highlight}</span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to={primaryCtaUrl}>
              <Button variant="gold" size="xl" className="group animate-glow">
                {primaryCtaText}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <a
              href={secondaryCtaUrl}
              onClick={(event) => {
                if (!secondaryCtaUrl.startsWith("#")) {
                  return;
                }
                event.preventDefault();
                scrollToSection(secondaryCtaUrl.replace("#", ""));
              }}
            >
              <Button variant="outline" size="xl">
                {secondaryCtaText}
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="font-serif text-3xl md:text-4xl font-semibold text-gradient-gold mb-1">
                  {stat.subtitle}
                </div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
