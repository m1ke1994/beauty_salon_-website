import { Reveal } from "@/components/anim/Reveal";
import { usePage } from "@/hooks/useContent";
import { findSection, sortItems } from "@/lib/content";
import { getIconByName } from "@/lib/iconMap";

export function StepsSection() {
  const { data: page } = usePage("home");
  const section = findSection(page, "steps");
  const steps = sortItems(section?.items);

  if (!section) {
    return null;
  }

  return (
    <section id="steps" className="section-padding scroll-mt-header">
      <div className="container-narrow">
        <Reveal variant="fadeUp" className="text-center mb-16">
          <span className="text-sm font-medium text-gold uppercase tracking-widest">
            {section.subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-3 mb-4">
            {section.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {section.description}
          </p>
        </Reveal>

        <div className="relative">
          <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-gold/20 via-gold to-gold/20" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, index) => {
              const Icon = getIconByName(step.icon);
              const number = (step.meta as { number?: string })?.number ?? `${index + 1}`.padStart(2, "0");

              return (
                <Reveal
                  key={step.id}
                  variant="fadeUp"
                  delay={index * 0.12}
                  className="relative text-center"
                >
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-card shadow-card mb-6 z-10">
                    <Icon className="h-8 w-8 text-gold" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold text-graphite text-sm font-semibold flex items-center justify-center">
                      {number}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    {step.text}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
