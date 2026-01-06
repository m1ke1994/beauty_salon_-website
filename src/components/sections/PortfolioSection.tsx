import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    category: "Маникюр",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop",
    title: "Нюдовый маникюр с архитектурой",
  },
  {
    id: 2,
    category: "Ресницы",
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&h=600&fit=crop",
    title: "Эффект 2D с мягким изгибом",
  },
  {
    id: 3,
    category: "Маникюр",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=600&fit=crop",
    title: "Глянцевое покрытие и тонкий дизайн",
  },
  {
    id: 4,
    category: "Брови",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=600&fit=crop",
    title: "Ламинирование и окрашивание бровей",
  },
  {
    id: 5,
    category: "Педикюр",
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&h=600&fit=crop",
    title: "SPA‑педикюр с уходом",
  },
  {
    id: 6,
    category: "Маникюр",
    image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&h=600&fit=crop",
    title: "Френч с современной линией",
  },
];

const categories = ["Все", "Маникюр", "Педикюр", "Ресницы", "Брови"];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "Все"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1
      );
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1
      );
    }
  };

  return (
    <section id="portfolio" className="section-padding bg-muted/40 scroll-mt-header">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-widest">
            Портфолио работ
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-3 mb-4">
            Галерея впечатлений
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Эстетика, аккуратность и стойкий результат. Примеры работ, которые
            вдохновляют и задают высокий стандарт качества.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gold text-graphite shadow-gold"
                  : "bg-card text-muted-foreground hover:bg-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => openLightbox(index)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <span className="text-xs text-gold font-medium uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-white font-serif text-lg md:text-xl mt-1">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-graphite/95 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
                aria-label="Закрыть"
              >
                <X className="h-8 w-8" />
              </button>

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                width={900}
                height={900}
                className="max-w-full max-h-[80vh] rounded-lg object-contain"
                onClick={(event) => event.stopPropagation()}
              />

              <button
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors"
                aria-label="Следующее фото"
              >
                <ChevronRight className="h-10 w-10" />
              </button>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
                <span className="text-gold text-sm font-medium">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h4 className="text-white font-serif text-xl">
                  {filteredItems[lightboxIndex].title}
                </h4>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
