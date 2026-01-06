import { Button } from "@/components/ui/button";
import { YandexMap } from "@/components/ui/YandexMap";
import { Reveal } from "@/components/anim/Reveal";
import { usePage, useSiteSettings } from "@/hooks/useContent";
import { findSection, sortItems } from "@/lib/content";
import { getIconByName } from "@/lib/iconMap";

const getSocialColor = (label?: string) => {
  const normalized = (label ?? "").toLowerCase();
  if (normalized.includes("instagram")) {
    return "hover:bg-pink-500";
  }
  if (normalized.includes("telegram")) {
    return "hover:bg-blue-500";
  }
  if (normalized.includes("whatsapp")) {
    return "hover:bg-green-500";
  }
  return "hover:bg-gold";
};

export function ContactsSection() {
  const { data: page } = usePage("home");
  const { data: settings } = useSiteSettings();
  const section = findSection(page, "contacts");
  const infoItems = sortItems(section?.items);
  const extra = section?.extra as Record<string, unknown> | undefined;
  const socialLinks = (extra?.social_links as Array<{
    icon?: string;
    href: string;
    label: string;
  }>) ?? settings?.social_links ?? [];

  if (!section) {
    return null;
  }

  const mapPlaceUrl = settings?.map_place_url ?? "";
  const mapRouteUrl = settings?.map_route_url ?? mapPlaceUrl;
  const mapIframeSrc = settings?.map_iframe_src ?? "";

  return (
    <section id="contacts" className="section-padding scroll-mt-header">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Reveal variant="slideRight" className="space-y-8">
            {infoItems.map((item) => {
              const Icon = getIconByName(item.icon);
              const meta = item.meta as { subtext?: string; link?: string } | undefined;
              return (
                <div key={item.id} className="flex gap-5">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                      {item.title}
                    </h4>
                    {meta?.link ? (
                      <a
                        href={meta.link}
                        className="font-serif text-xl font-medium hover:text-gold transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <div className="font-serif text-xl font-medium">
                        {item.text}
                      </div>
                    )}
                    {meta?.subtext && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {meta.subtext}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {socialLinks.length > 0 && (
              <div className="pt-6 border-t border-border">
                <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
                  Мы в соцсетях:
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = getIconByName(social.icon);
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 ${getSocialColor(
                          social.label
                        )}`}
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-4">
              {extra?.cta_primary_url && extra?.cta_primary_text && (
                <a href={extra.cta_primary_url as string}>
                  <Button variant="gold" size="lg" className="gap-2">
                    {extra.cta_primary_text as string}
                  </Button>
                </a>
              )}
              {extra?.cta_secondary_url && extra?.cta_secondary_text && (
                <a
                  href={extra.cta_secondary_url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="gold-outline" size="lg" className="gap-2">
                    {extra.cta_secondary_text as string}
                  </Button>
                </a>
              )}
            </div>
          </Reveal>

          <Reveal variant="slideLeft" className="relative">
            <YandexMap src={mapIframeSrc} title={`${settings?.site_name ?? "Belleza"} на Яндекс.Картах`} />
            <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-soft">
              <div className="font-serif text-lg font-medium">{settings?.site_name ?? "Belleza"}</div>
              <div className="text-sm text-muted-foreground">
                {settings?.address ?? ""}
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              {mapPlaceUrl && (
                <a
                  href={mapPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background/80 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Открыть в Яндекс.Картах
                </a>
              )}
              {mapRouteUrl && (
                <a
                  href={mapRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background/80 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Построить маршрут
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
