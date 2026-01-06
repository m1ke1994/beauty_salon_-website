type ScrollOptions = {
  behavior?: ScrollBehavior;
  offset?: number;
  updateHash?: boolean;
};

export const scrollToSection = (id: string, options: ScrollOptions = {}) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const header = document.querySelector("header");
  const headerOffset =
    header instanceof HTMLElement ? header.offsetHeight : 0;
  const offset = options.offset ?? headerOffset + 16;

  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: options.behavior ?? "smooth" });

  if (options.updateHash !== false) {
    window.history.replaceState(null, "", `#${id}`);
  }
};
