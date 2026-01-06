import { Reveal } from "@/components/anim/Reveal";
import { usePage } from "@/hooks/useContent";
import { findSection, sortItems } from "@/lib/content";
import { getIconByName } from "@/lib/iconMap";

export function AboutSection() {
  const { data: page } = usePage("home");
  const section = findSection(page, "about");
  const features = sortItems(section?.items);
  const extra = section?.extra as Record<string, string> | undefined;

  if (!section) {
    return null;
  }

  return (
    <section id="about" className="section-padding bg-muted/40 scroll-mt-header">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal variant="slideRight" className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={extra?.image_url}
                alt={extra?.image_alt ?? section.title}
                width={800}
                height={1000}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite/30 to-transparent" />
            </div>
            {extra?.highlight_value && extra?.highlight_label && (
              <Reveal
                variant="fadeUp"
                delay={0.2}
                className="absolute top-4 left-4 w-[200px] bg-card rounded-xl p-6 shadow-elevated md:top-6 md:left-6"
              >
                <div className="font-serif text-4xl font-semibold text-gradient-gold">
                  {extra.highlight_value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {extra.highlight_label}
                </div>
              </Reveal>
            )}
          </Reveal>

          <Reveal variant="slideLeft">
            <span className="text-sm font-medium text-gold uppercase tracking-widest">
              {section.subtitle}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mt-3 mb-6">
              {section.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {section.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = getIconByName(feature.icon);
                return (
                  <Reveal
                    key={feature.id}
                    variant="fadeUp"
                    delay={index * 0.08}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
