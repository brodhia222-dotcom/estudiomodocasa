"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { ValuePropIcon } from "@/components/primitives/ValuePropIcon";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.05 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeEditorial } },
};

const rule: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: easeEditorial, delay: 0.2 } },
};

export function ValueProps() {
  return (
    <Section bg="paper" py="default">
      <Container>
        <motion.ul
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {copy.valueProps.map((item) => (
            <motion.li
              key={item.number}
              variants={card}
              className="group relative flex flex-col gap-7 p-8 md:p-10 border border-[var(--color-ink)]/15 bg-[var(--color-paper)] transition-colors duration-700 ease-out hover:bg-[var(--color-paper-2)] hover:border-[var(--color-ink)]/30 min-h-[420px]"
            >
              {/* Número grande italic en esquina superior derecha */}
              <span
                className="absolute top-7 right-8 font-serif-italic leading-none text-[var(--color-ink)]/55 transition-colors duration-700 ease-out group-hover:text-[var(--color-ink)]/80"
                style={{ fontSize: "clamp(28px, 2.6vw, 36px)" }}
                aria-hidden="true"
              >
                {item.number}
              </span>

              {/* Micro-ilustración SVG line-art animada */}
              <div className="text-[var(--color-ink)] transition-transform duration-700 ease-out group-hover:-translate-y-1">
                <ValuePropIcon variant={item.icon} size={68} />
              </div>

              {/* Divisor 1px de 40px */}
              <motion.span
                variants={rule}
                className="block h-px w-10 bg-[var(--color-ink)] origin-left"
                aria-hidden="true"
              />

              <h3 className="text-[22px] md:text-[24px] font-semibold tracking-[-0.01em] leading-tight">
                {item.title}
              </h3>

              <p className="text-[15px] md:text-[16px] leading-[1.55] text-[var(--color-ink)]/70 max-w-[34ch] mt-auto">
                {item.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
