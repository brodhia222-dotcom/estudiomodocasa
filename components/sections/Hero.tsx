"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { MagneticLink } from "@/components/primitives/MagneticLink";
import { MediaSlot } from "@/components/primitives/MediaSlot";
import { ShaderBackground } from "@/components/ui/shader-background";
import { copy } from "@/lib/copy";

const ease = [0.65, 0, 0.35, 1] as const;

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
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[var(--color-ink)] text-[var(--color-paper)]"
    >
      {/* ─── Capa 1: fotografía/video de fondo (placeholder) ─── */}
      <MediaSlot
        mode="placeholder"
        placeholderLabel={copy.hero.image.placeholderLabel}
        alt={copy.hero.image.alt}
        className="z-0"
      />

      {/* ─── Capa 2: shader animado B&N como overlay ───
         mix-blend-mode: screen suma el shader claro sobre la imagen oscura
         sin perder la atmósfera del placeholder. */}
      <div className="absolute inset-0 z-10 mix-blend-screen opacity-80">
        <ShaderBackground speed={0.9} />
      </div>

      {/* ─── Capa 3: viñeta sutil para legibilidad del texto centrado ─── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(8,9,10,0) 0%, rgba(8,9,10,0.35) 60%, rgba(8,9,10,0.6) 100%)",
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
          <span className="inline-flex overflow-hidden">
            <motion.span
              variants={wipeUp}
              className="eyebrow text-[var(--color-paper)]/80"
            >
              {copy.hero.eyebrow}
            </motion.span>
          </span>

          <h1 className="display-xl">
            <Words text={copy.hero.headlinePre} />{" "}
            <Word text={copy.hero.headlineItalic} italic />{" "}
            <Words text={copy.hero.headlinePost} />
          </h1>

          <motion.p
            variants={fadeUp}
            className="body-l max-w-[560px] text-[var(--color-paper)]/80"
          >
            {copy.hero.lead}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col items-center gap-3 pt-2"
          >
            <MagneticLink href="#contacto" variant="inverted">
              {copy.hero.primaryCta}
            </MagneticLink>
            <p className="text-[13px] text-[var(--color-paper)]/60 tracking-[0.01em]">
              {copy.hero.microInfo}
            </p>
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
