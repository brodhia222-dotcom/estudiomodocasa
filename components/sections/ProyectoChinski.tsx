"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { easeEditorial, viewportOnce } from "@/lib/motion";
import { copy } from "@/lib/copy";

const { proyecto } = copy;

const statItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeEditorial },
  },
};

const statStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

export function ProyectoChinski() {
  const [active, setActive] = useState("Todo");

  const filtered =
    active === "Todo"
      ? proyecto.images
      : proyecto.images.filter((img) => img.category === active);

  return (
    <Section id="proyecto" bg="paper" py="default">
      <Container>
        {/* ── Header ── */}
        <header className="grid grid-cols-12 gap-x-6 gap-y-6 mb-[clamp(32px,5vw,56px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow>{proyecto.eyebrow}</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal as="h2" className="display-l max-w-[700px]">
              {proyecto.headline}
            </Reveal>
            <Reveal
              as="p"
              className="body-l text-[var(--color-mute)] max-w-[520px] mt-3"
              delay={0.1}
            >
              {proyecto.sub}
            </Reveal>
          </div>
        </header>

        {/* ── Stats ── */}
        <motion.div
          variants={statStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 border-t border-b border-[var(--color-ink)]/10 py-5 mb-8"
        >
          {proyecto.stats.map((stat) => (
            <motion.div key={stat.label} variants={statItem}>
              <span className="eyebrow text-[var(--color-mute)]">
                {stat.label}
              </span>
              <p className="text-[15px] font-medium tracking-[-0.01em] mt-1.5">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Filter buttons ── */}
        <Reveal className="flex flex-wrap gap-2 mb-8" delay={0.15}>
          {proyecto.filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`px-4 py-2 text-[13px] font-medium tracking-[0.04em] border transition-all duration-300 ${
                active === filter
                  ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
                  : "bg-transparent text-[var(--color-ink)] border-[var(--color-ink)]/20 hover:border-[var(--color-ink)]/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </Reveal>

        {/* ── Image grid ── */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: easeEditorial }}
                className="relative aspect-[4/3] overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  quality={80}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute bottom-0 left-0 right-0 px-4 py-2.5 text-[11px] font-medium tracking-[0.14em] uppercase text-white/90 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  {img.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}
