"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/primitives/Container";
import { MagneticLink } from "@/components/primitives/MagneticLink";
import { MediaSlot } from "@/components/primitives/MediaSlot";
import { copy } from "@/lib/copy";

const ease = [0.65, 0, 0.35, 1] as const;

const textColumn: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const wipeUp: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.85, ease } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Parallax muy sutil: texto un 8% más lento, imagen 4% más rápido.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "4%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative bg-[var(--color-paper)] text-[var(--color-ink)] min-h-[85vh] pt-[calc(var(--nav-height)+clamp(48px,8vw,96px))] pb-[clamp(48px,8vw,96px)] overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-center">
          {/* ─── Columna izquierda 60% ─── */}
          <motion.div
            style={{ y: textY }}
            variants={textColumn}
            initial="hidden"
            animate="visible"
            className="col-span-12 lg:col-span-7 flex flex-col gap-8"
          >
            <span className="inline-flex overflow-hidden">
              <motion.span variants={wipeUp} className="eyebrow text-[var(--color-ink)]/70">
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
              className="body-l max-w-[520px] text-[var(--color-ink)]/75"
            >
              {copy.hero.lead}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col items-start gap-3 pt-2"
            >
              <MagneticLink href="#contacto" variant="primary">
                {copy.hero.primaryCta}
              </MagneticLink>
              <p className="text-[13px] text-[var(--color-ink)]/55 tracking-[0.01em]">
                {copy.hero.microInfo}
              </p>
            </motion.div>
          </motion.div>

          {/* ─── Columna derecha 40% ─── */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="col-span-12 lg:col-span-5"
          >
            <MediaSlot
              src={copy.hero.image.src}
              alt={copy.hero.image.alt}
              aspect="3/4"
            />
          </motion.div>
        </div>
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
    <span className="inline-flex overflow-hidden align-baseline mr-[0.2em]">
      <motion.span
        variants={wipeUp}
        className={`inline-block ${italic ? "font-serif-italic" : ""}`}
      >
        {text}
      </motion.span>
    </span>
  );
}
