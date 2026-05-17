"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { viewportOnce, easeEditorial } from "@/lib/motion";

type EyebrowProps = {
  number?: string;
  children: ReactNode;
  className?: string;
  inverted?: boolean;
};

export function Eyebrow({ number, children, className = "", inverted = false }: EyebrowProps) {
  const color = inverted ? "text-[var(--color-paper)]" : "text-[var(--color-ink)]";
  const ruleColor = inverted ? "bg-[var(--color-paper)]" : "bg-[var(--color-ink)]";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: easeEditorial }}
      className={`eyebrow flex items-center gap-3 ${color} ${className}`}
    >
      {number && <span>{number}</span>}
      <motion.span
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        transition={{ duration: 0.8, ease: easeEditorial }}
        className={`block h-px w-8 origin-left ${ruleColor}`}
      />
      <motion.span
        variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6, ease: easeEditorial, delay: 0.1 }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
