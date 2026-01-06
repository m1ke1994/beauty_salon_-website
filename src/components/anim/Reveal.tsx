import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "framer-motion";

type RevealVariant = "fadeUp" | "fade" | "slideLeft" | "slideRight" | "scale";

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  amount?: number;
  margin?: string;
  className?: string;
  staggerChildren?: number;
};

export function Reveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.75,
  amount = 0.28,
  margin = "0px 0px -12% 0px",
  className,
  staggerChildren,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const hideTimeout = useRef<number | null>(null);
  const controls = useAnimationControls();
  const isInView = useInView(ref, { amount, margin });

  useEffect(() => {
    if (isInView) {
      if (hideTimeout.current) {
        window.clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }
      controls.start("show");
    } else {
      const delayMs = shouldReduceMotion ? 0 : 120;
      hideTimeout.current = window.setTimeout(() => {
        controls.start("hidden");
      }, delayMs);
    }
    return () => {
      if (hideTimeout.current) {
        window.clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }
    };
  }, [controls, isInView, shouldReduceMotion]);

  const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const transition = {
    duration: shouldReduceMotion ? 0.2 : duration,
    ease: easing,
    delay,
    ...(staggerChildren ? { staggerChildren, delayChildren: delay } : {}),
  };

  const baseHidden = { opacity: 0 };
  const baseShow = { opacity: 1, transition };

  const variants = {
    fadeUp: {
      hidden: { ...baseHidden, y: shouldReduceMotion ? 0 : 16 },
      show: { ...baseShow, y: 0 },
    },
    fade: {
      hidden: baseHidden,
      show: baseShow,
    },
    slideLeft: {
      hidden: { ...baseHidden, x: shouldReduceMotion ? 0 : -20 },
      show: { ...baseShow, x: 0 },
    },
    slideRight: {
      hidden: { ...baseHidden, x: shouldReduceMotion ? 0 : 20 },
      show: { ...baseShow, x: 0 },
    },
    scale: {
      hidden: {
        ...baseHidden,
        scale: shouldReduceMotion ? 1 : 0.98,
      },
      show: { ...baseShow, scale: 1 },
    },
  } satisfies Record<RevealVariant, { hidden: object; show: object }>;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
