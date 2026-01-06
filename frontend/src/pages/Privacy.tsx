import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { usePage } from "@/hooks/useContent";
import { findSection, sortItems } from "@/lib/content";

const Privacy = () => {
  const { data: page } = usePage("privacy");
  const section = findSection(page, "privacy");
  const items = sortItems(section?.items);

  if (!section) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20">
        <div className="container-narrow">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>

          <article className="prose prose-lg max-w-none">
            <h1 className="font-serif text-4xl md:text-5xl font-medium mb-8">
              {section.title}
            </h1>

            {section.description && (
              <p className="text-muted-foreground mb-8">
                {section.description}
              </p>
            )}

            {items.map((item) => {
              const list = (item.meta as { list?: string[] })?.list ?? [];
              return (
                <section key={item.id} className="mb-10">
                  <h2 className="font-serif text-2xl font-medium mb-4">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {item.text}
                  </p>
                  {list.length > 0 && (
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      {list.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
