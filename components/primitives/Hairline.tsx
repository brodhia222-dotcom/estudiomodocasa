"use client";

import { motion } from "framer-motion";
import { viewportOnce, easeEditorial } from "@/lib/motion";

type HairlineProps = {
  className?: string;
  vertical?: boolean;
  inverted?: boolean;
  static?: boolean;
};

export function Hairline({
  className = "",
  vertical = false,
  inverted = false,
  static: isStatic = false,
}: HairlineProps) {
  const color = inverted ? "bg-[var(--color-paper)]" : "bg-[var(--color-ink)]";
  const base = vertical ? "w-px h-full" : "h-px w-full";

  if (isStatic) {
    return <span aria-hidden="true" className={`block ${base} ${color} ${className}`} />;
  }

  return (
    <motion.span
      aria-hidden="true"
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      whileInView={{ scaleX: 1, scaleY: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: easeEditorial }}
      className={`block ${base} ${color} ${className}`}
      style={{
        transformOrigin: vertical ? "top" : "left",
      }}
    />
  );
}
