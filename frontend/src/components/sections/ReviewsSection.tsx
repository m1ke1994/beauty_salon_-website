import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Reveal } from "@/components/anim/Reveal";
import { usePage, useReviews } from "@/hooks/useContent";
import { findSection, sortByOrder } from "@/lib/content";

export function ReviewsSection() {
  const { data: page } = usePage("home");
  const { data: reviewsData } = useReviews();
  const section = findSection(page, "reviews");
  const reviews = sortByOrder(reviewsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (currentIndex >= reviews.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, reviews.length]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (reviews.length === 0) {
      return;
    }
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  if (!section || reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="section-padding scroll-mt-header">
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
                    src={reviews[currentIndex].avatar_url}
                    alt={reviews[currentIndex].name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-6 ring-4 ring-gold/20"
                    loading="lazy"
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
                      {reviews[currentIndex].service} — {reviews[currentIndex].date}
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
