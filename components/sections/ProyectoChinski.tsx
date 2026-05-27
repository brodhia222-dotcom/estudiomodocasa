"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { easeEditorial, viewportOnce } from "@/lib/motion";
import { proyectoData, type ProjectImage } from "@/lib/proyecto-data";

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

const sizeClasses: Record<ProjectImage["size"], string> = {
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  normal: "col-span-1 row-span-1",
};

const aspectClasses: Record<ProjectImage["size"], string> = {
  wide: "aspect-[16/9]",
  tall: "aspect-[3/5]",
  normal: "aspect-[4/3]",
};

export function ProyectoChinski() {
  const [active, setActive] = useState("Todo");

  const filtered =
    active === "Todo"
      ? proyectoData.images
      : proyectoData.images.filter((img) => img.category === active);

  return (
    <Section id="proyecto" bg="paper" py="default">
      <Container>
        {/* ── Header ── */}
        <div className="mb-[clamp(32px,5vw,56px)]">
          <Reveal as="h2" className="display-l max-w-[700px]">
            {proyectoData.headline}
          </Reveal>
          <Reveal
            as="p"
            className="font-serif-italic text-[var(--text-display-s)] text-[var(--color-ink)]/70 mt-3"
            delay={0.08}
          >
            {proyectoData.name}
          </Reveal>
          <Reveal
            as="p"
            className="body-l text-[var(--color-mute)] max-w-[520px] mt-3"
            delay={0.14}
          >
            {proyectoData.sub}
          </Reveal>
        </div>

        {/* ── Stats ── */}
        <motion.div
          variants={statStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 border-t border-b border-[var(--color-ink)]/10 py-5 mb-8"
        >
          {proyectoData.stats.map((stat) => (
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
        <Reveal className="flex flex-wrap gap-2 mb-8" delay={0.1}>
          {proyectoData.filters.map((filter) => (
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

        {/* ── Bento grid ── */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[minmax(160px,1fr)]"
          style={{ gridAutoFlow: "dense" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: easeEditorial }}
                className={`relative overflow-hidden group ${sizeClasses[img.size]}`}
              >
                <div className={`relative w-full h-full ${aspectClasses[img.size]}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={
                      img.size === "wide"
                        ? "(min-width: 768px) 50vw, 100vw"
                        : "(min-width: 768px) 25vw, 50vw"
                    }
                    quality={75}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute bottom-0 left-0 right-0 px-3 py-2 text-[11px] font-medium tracking-[0.12em] uppercase text-white/90 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    {img.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}
