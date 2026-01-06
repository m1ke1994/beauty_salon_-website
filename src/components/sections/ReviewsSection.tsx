import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Мария К.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text:
      "Идеальный маникюр, очень аккуратно и красиво. Атмосфера как в частном клубе, мастера — настоящие профессионалы.",
    service: "Маникюр + покрытие",
    date: "15 октября 2024",
  },
  {
    id: 2,
    name: "Алина Р.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text:
      "Делала ресницы 2D — получился мягкий, естественный эффект. Ничего не утяжеляет, держится идеально.",
    service: "Эффект 2D",
    date: "8 октября 2024",
  },
  {
    id: 3,
    name: "Екатерина М.",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop",
    rating: 5,
    text:
      "Ламинирование бровей — это любовь. Сразу другой взгляд и ухоженность, без лишнего макияжа.",
    service: "Ламинирование бровей",
    date: "1 октября 2024",
  },
  {
    id: 4,
    name: "Ольга Т.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: 5,
    text:
      "SPA‑педикюр — настоящее расслабление. Очень комфортно, результат заметен сразу. Вернусь еще.",
    service: "SPA‑педикюр",
    date: "25 сентября 2024",
  },
];

export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 6000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="reviews" className="section-padding">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-widest">
            Отзывы клиентов
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-3 mb-4">
            Нам доверяют уход
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Сотни девушек выбирают Belleza за стабильное качество, эстетику и
            внимательное отношение.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <Quote className="absolute -top-6 left-0 h-16 w-16 text-gold/20 -scale-x-100" />

          <div className="relative overflow-hidden min-h-[320px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="bg-card rounded-2xl p-8 md:p-10 shadow-card text-center">
                  <img
                    src={reviews[currentIndex].avatar}
                    alt={reviews[currentIndex].name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-6 ring-4 ring-gold/20"
                  />

                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < reviews[currentIndex].rating
                            ? "text-gold fill-gold"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic">
                    "{reviews[currentIndex].text}"
                  </p>

                  <div>
                    <div className="font-serif text-xl font-medium">
                      {reviews[currentIndex].name}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {reviews[currentIndex].service} · {reviews[currentIndex].date}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-gold"
                      : "bg-muted hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-card shadow-soft flex items-center justify-center hover:bg-accent transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
