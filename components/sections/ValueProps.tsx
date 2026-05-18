"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { ValuePropIcon } from "@/components/primitives/ValuePropIcon";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

/**
 * 3 tarjetas verticales con placeholder editorial de fondo + reveal
 * cinematográfico (mask wipe horizontal + contenido en stagger).
 */

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.05 } },
};

// La tarjeta entera se descubre con un mask que se retira de izquierda
// a derecha (clip-path), simulando una "cortina" editorial.
const cardReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1.1, ease: easeEditorial },
  },
};

// El contenido interior aparece con un pequeño delay para que ocurra
// JUSTO cuando la cortina termina de descubrir la card.
const contentStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.65 },
  },
};

const innerFade: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeEditorial } },
};

const rule: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: easeEditorial, delay: 0.8 },
  },
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
              variants={cardReveal}
              className="group relative overflow-hidden border border-[var(--color-ink)]/15 min-h-[440px] cursor-default"
            >
              {/* ─── Capa 0: placeholder editorial de fondo (grilla 1px más visible) ─── */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[var(--color-paper-2)]"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(8,9,10,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(8,9,10,0.12) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                  }}
                />
                {/* Label de placeholder visible arriba a la izquierda */}
                <span className="absolute top-7 left-8 eyebrow text-[var(--color-ink)]/45">
                  Imagen · pendiente
                </span>
              </div>

              {/* ─── Capa 1: velo más sutil para que la grilla se vea pero
                 el texto siga legible. Hover desvanece más el velo. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[var(--color-paper)]/82 transition-colors duration-700 ease-out group-hover:bg-[var(--color-paper)]/62"
              />

              {/* ─── Capa 2: contenido ─── */}
              <motion.div
                variants={contentStagger}
                className="relative z-10 flex flex-col gap-7 p-8 md:p-10 h-full"
              >
                {/* Número grande italic en esquina superior derecha */}
                <motion.span
                  variants={innerFade}
                  className="absolute top-7 right-8 font-serif-italic leading-none text-[var(--color-ink)]/55 transition-colors duration-700 ease-out group-hover:text-[var(--color-ink)]/80"
                  style={{ fontSize: "clamp(28px, 2.6vw, 36px)" }}
                  aria-hidden="true"
                >
                  {item.number}
                </motion.span>

                {/* Micro-ilustración SVG line-art animada */}
                <motion.div
                  variants={innerFade}
                  className="text-[var(--color-ink)] transition-transform duration-700 ease-out group-hover:-translate-y-1"
                >
                  <ValuePropIcon variant={item.icon} size={68} />
                </motion.div>

                {/* Divisor 1px de 40px */}
                <motion.span
                  variants={rule}
                  className="block h-px w-10 bg-[var(--color-ink)] origin-left"
                  aria-hidden="true"
                />

                <motion.h3
                  variants={innerFade}
                  className="text-[22px] md:text-[24px] font-semibold tracking-[-0.01em] leading-tight"
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  variants={innerFade}
                  className="text-[15px] md:text-[16px] leading-[1.55] text-[var(--color-ink)]/70 max-w-[34ch] mt-auto"
                >
                  {item.body}
                </motion.p>
              </motion.div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
