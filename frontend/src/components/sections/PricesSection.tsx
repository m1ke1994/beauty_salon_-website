import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/anim/Reveal";
import { usePage, usePriceCategories } from "@/hooks/useContent";
import { findSection, sortByOrder } from "@/lib/content";

export function PricesSection() {
  const { data: page } = usePage("home");
  const { data: priceCategoriesData } = usePriceCategories();
  const section = findSection(page, "prices");
  const categories = sortByOrder(priceCategoriesData);
  const extra = section?.extra as Record<string, string> | undefined;

  if (!section) {
    return null;
  }

  return (
    <section id="prices" className="section-padding scroll-mt-header">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, categoryIndex) => (
            <Reveal
              key={category.id}
              variant="fadeUp"
              delay={categoryIndex * 0.08}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-soft"
            >
              <h3 className="font-serif text-2xl font-medium mb-6 pb-4 border-b border-border">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {sortByOrder(category.items).map((item, itemIndex) => (
                  <li
                    key={item.id}
                    className={`flex items-center justify-between py-3 ${
                      itemIndex !== category.items.length - 1
                        ? "border-b border-border/50"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.is_popular && (
                        <span className="flex items-center gap-1 text-xs font-medium text-gold bg-gold/10 px-2 py-1 rounded-full">
                          <Star className="h-3 w-3 fill-current" />
                          Популярно
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
            </Reveal>
          ))}
        </div>

        {(extra?.note || extra?.cta_text) && (
          <Reveal variant="fadeUp" delay={0.2} className="text-center mt-12">
            {extra?.note && (
              <div className="inline-flex items-center gap-2 text-muted-foreground mb-6">
                <Check className="h-5 w-5 text-gold" />
                <span>{extra.note}</span>
              </div>
            )}
            {extra?.cta_text && (
              <div>
                <Link to={extra?.cta_url ?? "/booking"}>
                  <Button variant="gold" size="lg">
                    {extra.cta_text}
                  </Button>
                </Link>
              </div>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
