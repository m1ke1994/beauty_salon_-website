import type { MouseEvent } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scrollToSection";

const navLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#prices", label: "Цены" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#about", label: "О нас" },
  { href: "#steps", label: "Этапы" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = href.replace("#", "");
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      event.preventDefault();
      if (isHomePage) {
        scrollToSection(targetId);
      } else {
        window.location.assign(`/#${targetId}`);
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 h-16 border-b border-border/60 bg-background/80 backdrop-blur transition-shadow ${
        isScrolled ? "shadow-soft" : "shadow-none"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-serif text-2xl font-semibold text-gradient-gold">
            Belleza
          </span>
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex items-center gap-6 lg:gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={isHomePage ? link.href : `/${link.href}`}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="group relative px-1 py-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute left-0 top-full h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+79001234567" className="whitespace-nowrap">
            <Button variant="ghost" size="sm" className="h-10 gap-2 px-3">
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">+7 (900) 123-45-67</span>
            </Button>
          </a>
          <Link to="/booking#booking">
            <Button variant="gold" size="sm" className="h-10 rounded-full px-5">
              Записаться
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground transition-colors hover:bg-accent"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-graphite/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 border-b border-border/60 bg-background/95 shadow-elevated"
              role="dialog"
              aria-modal="true"
            >
              <div className="mx-auto max-h-[calc(100vh-4rem)] w-full max-w-7xl overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-4">
                  <Link to="/" className="flex items-center gap-2">
                    <span className="font-serif text-2xl font-semibold text-gradient-gold">
                      Belleza
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-foreground"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid gap-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={isHomePage ? link.href : `/${link.href}`}
                      onClick={(event) => handleNavClick(event, link.href)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="rounded-lg px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-accent"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a href="tel:+79001234567" className="w-full">
                    <Button variant="outline" className="h-11 w-full gap-2">
                      <Phone className="h-4 w-4" />
                      +7 (900) 123-45-67
                    </Button>
                  </a>
                  <Link to="/booking#booking" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="gold" className="h-11 w-full rounded-full">
                      Записаться
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
