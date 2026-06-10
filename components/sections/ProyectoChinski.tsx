"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Lightbox } from "@/components/ui/lightbox";
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

function lastRowSpan(total: number, cols: number, index: number): number {
  const remainder = total % cols;
  if (remainder === 0) return 1;
  const lastRowStart = total - remainder;
  if (index < lastRowStart) return 1;
  if (remainder === 1) return cols;
  if (remainder === 2 && index === total - 1) return cols - 1;
  return 1;
}

export function ProyectoChinski() {
  const [active, setActive] = useState("Todo");
  const [expanded, setExpanded] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    active === "Todo"
      ? proyectoData.images
      : proyectoData.images.filter((img) => img.category === active);

  const isFiltering = active !== "Todo";
  const visible = isFiltering || expanded
    ? filtered
    : filtered.slice(0, proyectoData.initialCount);

  const hasMore = !isFiltering && !expanded && filtered.length > proyectoData.initialCount;

  const openLightbox = useCallback((img: ProjectImage) => {
    const idx = filtered.findIndex((f) => f.src === img.src);
    setLightboxIndex(idx);
  }, [filtered]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));
  }, [filtered.length]);

  const total = visible.length;

  return (
    <Section id="proyecto" bg="paper" py="default">
      <Container>
        {/* ── Header ── */}
        <div className="mb-[clamp(40px,6vw,72px)]">
          <Reveal as="h2" className="display-l">
            {proyectoData.headline}
          </Reveal>
          <Reveal
            as="p"
            className="font-serif-italic text-[var(--text-display-s)] text-[var(--color-ink)]/70 mt-4"
            delay={0.08}
          >
            {proyectoData.name}
          </Reveal>
          <Reveal
            as="p"
            className="body-l text-[var(--color-mute)] max-w-[760px] mt-5"
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
              onClick={() => { setActive(filter); setExpanded(false); }}
              className={`cursor-pointer px-4 py-2 text-[13px] font-medium tracking-[0.04em] border transition-all duration-300 ${
                active === filter
                  ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
                  : "bg-transparent text-[var(--color-ink)] border-[var(--color-ink)]/20 hover:border-[var(--color-ink)]/50"
              }`}
            >
              {filter}
            </button>
          ))}
        </Reveal>

        {/* ── Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3"
          style={{ gridAutoRows: "clamp(160px, 20vw, 240px)" }}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((img, i) => {
              const spanMd = lastRowSpan(total, 3, i);
              const span2 = lastRowSpan(total, 2, i);
              const colClass =
                span2 === 2 && spanMd === 3
                  ? "col-span-2 md:col-span-3"
                  : span2 === 2
                    ? "col-span-2 md:col-span-1"
                    : spanMd === 3
                      ? "md:col-span-3"
                      : spanMd === 2
                        ? "md:col-span-2"
                        : "";

              return (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: easeEditorial }}
                  className={`relative overflow-hidden cursor-pointer group ${colClass}`}
                  onClick={() => openLightbox(img)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={
                      spanMd > 1
                        ? "(min-width: 768px) 66vw, 100vw"
                        : "(min-width: 768px) 33vw, 50vw"
                    }
                    quality={75}
                    style={{ objectPosition: img.objectPosition }}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── Show more button ── */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: easeEditorial }}
            className="flex justify-center mt-10"
          >
            <button
              onClick={() => setExpanded(true)}
              className="group relative cursor-pointer px-10 py-4 text-[13px] font-medium tracking-[0.08em] uppercase border border-[var(--color-ink)] overflow-hidden transition-colors duration-500 hover:text-[var(--color-paper)]"
            >
              <span className="absolute inset-0 bg-[var(--color-ink)] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
              <span className="relative z-10 flex items-center gap-3">
                Mostrar más
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="transition-transform duration-500 group-hover:translate-y-0.5"
                >
                  <line x1="7" y1="1" x2="7" y2="13" />
                  <polyline points="2 8 7 13 12 8" />
                </svg>
              </span>
            </button>
          </motion.div>
        )}
      </Container>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
