import type { Variants, Transition } from "framer-motion";

export const easeEditorial: Transition["ease"] = [0.65, 0, 0.35, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeEditorial },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeEditorial },
  },
};

export const wipeReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: easeEditorial },
  },
};

export const stagger = (delay = 0.08, initial = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay, delayChildren: initial },
  },
});

export const wordStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export const hairlineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: easeEditorial },
  },
};

// `amount: "some"` dispara con cualquier pixel visible — más resiliente
// para secciones grandes y para tooling de screenshots (Lenis + scroll instant).
export const viewportOnce = { once: true, amount: "some" } as const;
