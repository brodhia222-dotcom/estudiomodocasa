"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeEditorial } },
};

const rule: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: easeEditorial, delay: 0.1 } },
};

export function ValueProps() {
  return (
    <Section id="filosofia" bg="paper" py="default">
      <Container>
        <motion.ul
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12"
        >
          {copy.valueProps.map((item) => (
            <motion.li
              key={item.number}
              variants={card}
              className="flex flex-col gap-5"
            >
              {/* Número grande en Times Now Italic — text-5xl según brief */}
              <span
                className="font-serif-italic leading-none text-[var(--color-ink)]"
                style={{ fontSize: "clamp(40px, 4.5vw, 56px)" }}
                aria-hidden="true"
              >
                {item.number}
              </span>

              {/* Divisor 1px de 40px de ancho */}
              <motion.span
                variants={rule}
                className="block h-px w-10 bg-[var(--color-ink)] origin-left"
                aria-hidden="true"
              />

              {/* Título sans bold (~text-xl) */}
              <h3 className="text-[20px] md:text-[22px] font-semibold tracking-[-0.01em] leading-tight">
                {item.title}
              </h3>

              {/* Descripción text-base, máx 2 líneas en desktop por ancho de columna */}
              <p className="text-[15px] md:text-[16px] leading-[1.55] text-[var(--color-ink)]/70 max-w-[34ch]">
                {item.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
