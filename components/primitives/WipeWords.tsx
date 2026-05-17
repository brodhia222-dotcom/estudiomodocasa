"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { viewportOnce, easeEditorial } from "@/lib/motion";

type WipeWordsProps = {
  text: string;
  italic?: boolean;
  className?: string;
  delay?: number;
  stagger?: number;
};

const container: Variants = {
  hidden: {},
  visible: (custom: { delay: number; stagger: number }) => ({
    transition: {
      staggerChildren: custom.stagger,
      delayChildren: custom.delay,
    },
  }),
};

const word: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: easeEditorial },
  },
};

export function WipeWords({
  text,
  italic = false,
  className = "",
  delay = 0,
  stagger = 0.05,
}: WipeWordsProps) {
  const words = text.split(" ");
  return (
    <motion.span
      className={`inline ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={{ delay, stagger }}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-flex overflow-hidden align-baseline leading-[0.95]">
            <motion.span
              variants={word}
              className={`inline-block ${italic ? "font-serif-italic" : ""}`}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </motion.span>
  );
}
