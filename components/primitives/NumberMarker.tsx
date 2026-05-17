"use client";

import { motion } from "framer-motion";
import { viewportOnce, easeEditorial } from "@/lib/motion";

type NumberMarkerProps = {
  value: string;
  size?: "m" | "l" | "xl";
  className?: string;
  inverted?: boolean;
};

const sizeMap = {
  m: "display-m",
  l: "display-l",
  xl: "display-xl",
};

export function NumberMarker({
  value,
  size = "l",
  className = "",
  inverted = false,
}: NumberMarkerProps) {
  return (
    <span className={`inline-flex overflow-hidden leading-none ${className}`}>
      <motion.span
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={viewportOnce}
        transition={{ duration: 0.95, ease: easeEditorial }}
        className={`block ${sizeMap[size]} ${
          inverted ? "text-[var(--color-paper)]" : "text-[var(--color-ink)]"
        }`}
        style={{ fontWeight: 400 }}
      >
        {value}
      </motion.span>
    </span>
  );
}
