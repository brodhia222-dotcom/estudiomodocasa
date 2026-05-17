"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode, type ElementType } from "react";
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
  const MotionTag = motion.create(as);
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
