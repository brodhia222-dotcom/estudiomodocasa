"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Lightbox } from "@/components/ui/lightbox";
import { easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

const gridStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeEditorial },
  },
};

export function Espacios() {
  const { categories } = copy.espacios;
  const [openCat, setOpenCat] = useState<number | null>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const gallery = openCat !== null ? categories[openCat].gallery : [];

  const openCategory = useCallback((i: number) => {
    setOpenCat(i);
    setImgIndex(0);
  }, []);
  const close = useCallback(() => setOpenCat(null), []);
  const prev = useCallback(() => {
    setImgIndex((i) => (i - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);
  const next = useCallback(() => {
    setImgIndex((i) => (i + 1) % gallery.length);
  }, [gallery.length]);

  return (
    <Section id="espacios" bg="paper">
      <Container>
        <header className="grid grid-cols-12 gap-x-6 gap-y-8 mb-[clamp(48px,7vw,96px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow number="—">{copy.espacios.eyebrow}</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9 flex flex-col gap-5">
            <Reveal as="h2" className="display-l max-w-[18ch]">
              {copy.espacios.headline}
            </Reveal>
            <Reveal
              as="p"
              className="body-l text-[var(--color-ink)]/70 max-w-[56ch]"
              delay={0.1}
            >
              {copy.espacios.sub}
            </Reveal>
          </div>
        </header>

        <motion.ul
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {categories.map((cat, i) => (
            <motion.li key={cat.id} variants={cardVariant}>
              <button
                onClick={() => openCategory(i)}
                className="group relative block w-full aspect-[3/4] overflow-hidden cursor-pointer text-left"
                aria-label={`Ver galería de ${cat.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.cover}
                  alt={cat.title}
                  className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05] scale-105 transition-[transform,filter] duration-[900ms] ease-out group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/45 to-[var(--color-ink)]/10 transition-opacity duration-500 group-hover:via-[var(--color-ink)]/25" />

                <span
                  aria-hidden="true"
                  className="absolute top-5 left-5 eyebrow text-[var(--color-paper)]/70"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-[var(--color-paper)]">
                  <h3 className="display-s font-medium leading-tight">
                    {cat.title}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-2 text-[12px] tracking-[0.06em] text-[var(--color-paper)]/75">
                    Ver galería · {cat.gallery.length}
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2" className="transition-transform duration-500 group-hover:translate-x-1">
                      <path d="M1 5h12M13 5L9 1M13 5L9 9" />
                    </svg>
                  </span>
                </div>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </Container>

      <AnimatePresence>
        {openCat !== null && (
          <Lightbox
            images={gallery}
            index={imgIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
