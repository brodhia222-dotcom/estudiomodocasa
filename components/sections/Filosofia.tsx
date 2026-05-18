"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Hairline } from "@/components/primitives/Hairline";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

/**
 * Filosofía — fusión de Quiénes somos + Arquitectura.
 *
 * Estructura:
 *   - Eyebrow doble (QUIÉNES SOMOS · FILOSOFÍA)
 *   - Pull quote masivo en serif italic (display-l)
 *   - Counter animado "0 → 15" con label + intro corta a la derecha
 *   - Keywords como pills sutiles con stagger reveal
 */

const wrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeEditorial } },
};

const pill: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeEditorial } },
};

const pillsContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } },
};

export function Filosofia() {
  return (
    <Section id="filosofia" bg="paper-2">
      <Container>
        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-[clamp(48px,7vw,96px)]"
        >
          {/* Header */}
          <motion.div variants={fadeUp}>
            <Eyebrow number="—">{copy.filosofia.eyebrow}</Eyebrow>
          </motion.div>

          {/* Quote masiva en serif italic */}
          <motion.blockquote
            variants={fadeUp}
            className="font-serif-italic max-w-[20ch] leading-[1.05] text-[var(--color-ink)]"
            style={{ fontSize: "clamp(36px, 6vw, 84px)", letterSpacing: "-0.02em" }}
          >
            &ldquo;{copy.filosofia.quote}&rdquo;
          </motion.blockquote>

          <Hairline />

          {/* Counter + intro lateral */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
            <motion.div
              variants={fadeUp}
              className="col-span-12 md:col-span-5 lg:col-span-4"
            >
              <CounterFigure target={parseInt(copy.filosofia.figure, 10)} />
              <Hairline className="mt-3 w-24" />
              <p className="mt-3 text-[13px] leading-[1.5] text-[var(--color-ink)]/65 max-w-[280px]">
                {copy.filosofia.figureLabel}
              </p>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6 body-l text-[var(--color-ink)]/80 max-w-[52ch]"
            >
              {copy.filosofia.intro}
            </motion.p>
          </div>

          {/* Pills de keywords */}
          <motion.ul
            variants={pillsContainer}
            className="flex flex-wrap gap-3"
            aria-label="Ejes del trabajo"
          >
            {copy.filosofia.keywords.map((kw) => (
              <motion.li
                key={kw}
                variants={pill}
                className="px-4 py-2 border border-[var(--color-ink)]/30 rounded-full text-[12px] tracking-[0.06em] uppercase font-medium text-[var(--color-ink)]/75 transition-colors duration-500 ease-out hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] hover:border-[var(--color-ink)]"
              >
                {kw}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </Section>
  );
}

/** Counter "0 → target" que se anima cuando entra en viewport. */
function CounterFigure({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400; // ms
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo: empieza rápido, frena al final — más editorial que linear
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, target]);

  return (
    <span
      ref={ref}
      className="inline-block leading-[0.85] text-[var(--color-ink)]"
      style={{
        fontSize: "clamp(96px, 14vw, 200px)",
        fontWeight: 400,
        letterSpacing: "-0.06em",
        fontVariantNumeric: "tabular-nums",
      }}
      aria-label={`${target} años`}
    >
      {value}
    </span>
  );
}
