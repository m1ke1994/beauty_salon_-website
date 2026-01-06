import { Reveal } from "@/components/anim/Reveal";
import { usePage } from "@/hooks/useContent";
import { findSection, sortItems } from "@/lib/content";
import { getIconByName } from "@/lib/iconMap";

export function ServicesSection() {
  const { data: page } = usePage("home");
  const section = findSection(page, "services");
  const items = sortItems(section?.items);

  if (!section) {
    return null;
  }

  return (
    <section id="services" className="section-padding bg-muted/40 scroll-mt-header">
      <div className="container-narrow">
        <Reveal
          variant="fadeUp"
          amount={0.4}
          margin="0px 0px -20% 0px"
          disableMobile
          className="text-center mb-16"
        >
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((service, index) => {
            const Icon = getIconByName(service.icon);
            const features = Array.isArray((service.meta as { features?: string[] })?.features)
              ? (service.meta as { features: string[] }).features
              : [];

            return (
              <Reveal
                key={service.id}
                delay={index * 0.08}
                amount={0.4}
                margin="0px 0px -20% 0px"
                disableMobile
                className={`group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-500 ${
                  index === items.length - 1 && items.length % 3 === 1
                    ? "lg:col-start-2"
                    : ""
                }`}
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6 group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-7 w-7 text-gold group-hover:text-graphite transition-colors" />
                </div>

                <h3 className="font-serif text-2xl font-medium mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.text}
                </p>

                {features.length > 0 && (
                  <ul className="space-y-2">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
