"use client";

import { motion, type Variants } from "framer-motion";
import { useMemo, type ReactNode, type ElementType } from "react";
import { viewportOnce, easeEditorial } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

export function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  y = 28,
  duration = 0.8,
}: RevealProps) {
  // Memoizado: si se llama motion.create(as) en cada render, se crea un
  // componente nuevo cada vez → React remonta el elemento → la animación de
  // entrada se vuelve a disparar (p. ej. al hacer hover en Espacios, que
  // re-renderiza el padre). Memoizarlo evita el remount.
  const MotionTag = useMemo(() => motion.create(as), [as]);
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: easeEditorial, delay },
    },
  };
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
