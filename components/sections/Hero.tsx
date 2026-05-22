"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { MagneticLink } from "@/components/primitives/MagneticLink";
import { HeroCarousel } from "@/components/ui/hero-carousel";
import { copy } from "@/lib/copy";

const ease = [0.65, 0, 0.35, 1] as const;

const HERO_IMAGES = [
  "/images/hero/hero-01.png",
  "/images/hero/hero-02.png",
  "/images/hero/hero-03.png",
  "/images/hero/hero-04.png",
  "/images/hero/hero-05.png",
  "/images/hero/hero-06.png",
];

const textColumn: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const wipeUp: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.9, ease } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative h-[88svh] min-h-[580px] overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]"
    >
      {/* ─── Capa 1: carrusel de fotos en color, cross-fade rápido + Ken Burns. */}
      <HeroCarousel
        images={HERO_IMAGES}
        intervalMs={4500}
        alt={copy.hero.image.alt}
        className="z-0"
      />

      {/* ─── Capa 2: scrim oscuro general para legibilidad del headline.
         Gradient vertical: más oscuro arriba (bajo el navbar) y abajo
         (donde está el scroll indicator), un poco más translúcido en el centro
         para que la foto respire detrás del texto. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,9,10,0.55) 0%, rgba(8,9,10,0.30) 35%, rgba(8,9,10,0.35) 70%, rgba(8,9,10,0.70) 100%)",
        }}
      />

      {/* ─── Capa 3: viñeta radial centrada para reforzar el contraste del
         headline sin matar la foto en los bordes. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at center, rgba(8,9,10,0.45) 0%, rgba(8,9,10,0) 70%)",
        }}
      />

      {/* ─── Capa 4: texto centrado ─── */}
      <Container className="relative z-30 h-full flex">
        <motion.div
          variants={textColumn}
          initial="hidden"
          animate="visible"
          className="m-auto w-full max-w-[920px] flex flex-col items-center text-center gap-8 py-[calc(var(--nav-height)+48px)]"
        >
          <h1 className="display-xl text-[var(--color-paper)] [text-shadow:0_1px_24px_rgba(8,9,10,0.25)]">
            <Words text={copy.hero.headlinePre} />{" "}
            <Word text={copy.hero.headlineItalic} italic />{" "}
            <Words text={copy.hero.headlinePost} />
          </h1>

          <motion.p
            variants={fadeUp}
            className="body-l max-w-[960px] text-[var(--color-paper)]/85 whitespace-normal md:whitespace-nowrap"
          >
            {copy.hero.lead}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-4 pt-2"
          >
            <MagneticLink href="#contacto" variant="solid-swap">
              {copy.hero.primaryCta}
            </MagneticLink>
            <span className="inline-flex items-center px-4 py-2 bg-[var(--color-paper)]/12 backdrop-blur-[2px] text-[12.5px] text-[var(--color-paper)]/90 tracking-[0.02em]">
              {copy.hero.microInfo}
            </span>
          </motion.div>
        </motion.div>
      </Container>

    </section>
  );
}

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <Word key={`${w}-${i}`} text={w} />
      ))}
    </>
  );
}

function Word({ text, italic = false }: { text: string; italic?: boolean }) {
  return (
    <span className="inline-flex overflow-hidden align-baseline mr-[0.18em]">
      <motion.span
        variants={wipeUp}
        className={`inline-block ${italic ? "font-serif-italic" : ""}`}
      >
        {text}
      </motion.span>
    </span>
  );
}
