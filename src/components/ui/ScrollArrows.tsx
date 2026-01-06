import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SCROLL_THRESHOLD = 400;

export function ScrollArrows() {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(true);

  useEffect(() => {
    let rafId = 0;

    const updateVisibility = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const remaining = docHeight - (scrollY + windowHeight);

      setShowUp(scrollY > SCROLL_THRESHOLD);
      setShowDown(remaining > SCROLL_THRESHOLD);
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateVisibility();
        rafId = 0;
      });
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const topAnchor = document.getElementById("top");
    if (topAnchor) {
      topAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToEnd = () => {
    const endAnchor =
      document.getElementById("footer") || document.getElementById("end");
    if (endAnchor) {
      endAnchor.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const baseButtonClasses =
    "h-12 w-12 rounded-full border border-border/60 bg-background/80 text-foreground/80 shadow-lg backdrop-blur transition-all duration-300 ease-out hover:bg-background/90 hover:text-foreground hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40";

  return (
    <div className="fixed bottom-16 right-6 z-50 flex flex-col gap-3 md:bottom-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        aria-hidden={!showUp}
        tabIndex={showUp ? 0 : -1}
        className={`${baseButtonClasses} ${
          showUp
            ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
            : "pointer-events-none opacity-0 translate-y-2 scale-95"
        }`}
      >
        <ChevronUp className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={scrollToEnd}
        aria-label="Scroll to bottom"
        aria-hidden={!showDown}
        tabIndex={showDown ? 0 : -1}
        className={`${baseButtonClasses} ${
          showDown
            ? "pointer-events-auto opacity-100 translate-y-0 scale-100"
            : "pointer-events-none opacity-0 -translate-y-2 scale-95"
        }`}
      >
        <ChevronDown className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
