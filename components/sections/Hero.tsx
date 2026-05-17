"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/primitives/Container";
import { Hairline } from "@/components/primitives/Hairline";
import { MagneticLink } from "@/components/primitives/MagneticLink";
import { copy } from "@/lib/copy";

const ease = [0.65, 0, 0.35, 1] as const;

const headlineContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.35 } },
};

const headlineLine: Variants = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 1, ease } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative bg-[var(--color-paper)] text-[var(--color-ink)] min-h-[100svh] pt-[140px] pb-[clamp(64px,8vw,120px)] overflow-hidden"
    >
      <Container>
        <motion.div style={{ y, opacity }} className="flex flex-col gap-[clamp(40px,6vw,96px)]">
          {/* Eyebrow + meta */}
          <div className="flex items-baseline justify-between gap-6 flex-wrap">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              className="eyebrow opacity-65"
            >
              {copy.hero.eyebrow}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="eyebrow opacity-50"
            >
              MMXXV · Sección 01
            </motion.p>
          </div>

          {/* Masthead */}
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="visible"
            className="display-xl tracking-[-0.045em]"
          >
            <Line text={copy.hero.headlinePre} />
            <Line text={copy.hero.headlineItalic} italic />
            <Line text={copy.hero.headlinePost} />
          </motion.h1>

          {/* Bottom row: hairline + sub + CTA */}
          <div className="grid grid-cols-12 gap-x-6 gap-y-10 items-end">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease, delay: 1.1 }}
              className="col-span-12 origin-left"
            >
              <Hairline static />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 1.25 }}
              className="col-span-12 md:col-span-6 lg:col-span-5 body-l opacity-75"
            >
              {copy.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 1.4 }}
              className="col-span-12 md:col-span-6 lg:col-span-7 flex md:justify-end"
            >
              <MagneticLink href="#contacto" variant="primary">
                {copy.hero.primaryCta}
              </MagneticLink>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* Scroll hint */}
      <motion.a
        href="#filosofia"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[var(--color-ink)]/55 hover:text-[var(--color-ink)] transition-colors"
        aria-label={copy.hero.scrollHint}
      >
        <span className="eyebrow">{copy.hero.scrollHint}</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
            <path d="M5 0V13M5 13L1 9M5 13L9 9" stroke="currentColor" strokeWidth="1" />
          </svg>
        </motion.span>
      </motion.a>
    </section>
  );
}

function Line({ text, italic = false }: { text: string; italic?: boolean }) {
  return (
    <span className="block overflow-hidden">
      <motion.span variants={headlineLine} className={`block ${italic ? "font-serif-italic" : ""}`}>
        {text}
      </motion.span>
    </span>
  );
}
