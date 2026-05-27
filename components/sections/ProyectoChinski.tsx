"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { easeEditorial, viewportOnce } from "@/lib/motion";
import { copy } from "@/lib/copy";

const { proyecto } = copy;

const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 1.1, ease: easeEditorial },
  },
};

const gridStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const gridItem: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: easeEditorial },
  },
};

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
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

export function ProyectoChinski() {
  const { hero, grid } = proyecto.images;

  return (
    <Section id="proyecto" bg="paper" py="default">
      <Container>
        {/* ── Header ── */}
        <header className="grid grid-cols-12 gap-x-6 gap-y-8 mb-[clamp(48px,7vw,96px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow>{proyecto.eyebrow}</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal as="h2" className="display-l max-w-[700px]">
              {proyecto.headline}
            </Reveal>
            <Reveal
              as="p"
              className="body-l text-[var(--color-mute)] max-w-[560px] mt-5"
              delay={0.15}
            >
              {proyecto.sub}
            </Reveal>
          </div>
        </header>

        {/* ── Hero image full-width with clip reveal ── */}
        <motion.div
          variants={clipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative w-full aspect-[16/9] overflow-hidden"
        >
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
        </motion.div>

        {/* ── Stats bar ── */}
        <motion.div
          variants={statStagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 border-t border-[var(--color-ink)]/15 mt-6 pt-6 pb-2"
        >
          {proyecto.stats.map((stat) => (
            <motion.div key={stat.label} variants={statItem}>
              <span className="eyebrow text-[var(--color-mute)]">
                {stat.label}
              </span>
              <p className="text-[17px] font-medium tracking-[-0.01em] mt-2">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Pull quote ── */}
        <Reveal
          as="blockquote"
          className="my-[clamp(40px,6vw,80px)] max-w-[680px] mx-auto text-center"
          delay={0.1}
        >
          <p className="font-serif-italic text-[var(--text-display-m)] leading-[1.2] text-[var(--color-ink)]/80">
            &ldquo;{proyecto.quote}&rdquo;
          </p>
        </Reveal>

        {/* ── Bento grid ── */}
        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        >
          {/* Row 1: landscape (2-col) + portrait */}
          <motion.div
            variants={gridItem}
            className="col-span-2 relative aspect-[16/10] overflow-hidden group"
          >
            <Image
              src={grid[1].src}
              alt={grid[1].alt}
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              quality={80}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <GridLabel>{grid[1].label}</GridLabel>
          </motion.div>

          <motion.div
            variants={gridItem}
            className="col-span-1 relative aspect-[3/4] overflow-hidden group"
          >
            <Image
              src={grid[0].src}
              alt={grid[0].alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              quality={80}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <GridLabel>{grid[0].label}</GridLabel>
          </motion.div>

          {/* Row 2: portrait + landscape (2-col) */}
          <motion.div
            variants={gridItem}
            className="col-span-1 relative aspect-[3/4] overflow-hidden group"
          >
            <Image
              src={grid[2].src}
              alt={grid[2].alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              quality={80}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <GridLabel>{grid[2].label}</GridLabel>
          </motion.div>

          <motion.div
            variants={gridItem}
            className="col-span-2 relative aspect-[16/10] overflow-hidden group"
          >
            <Image
              src={grid[3].src}
              alt={grid[3].alt}
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              quality={80}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <GridLabel>{grid[3].label}</GridLabel>
          </motion.div>

          {/* Row 3: three equal */}
          <motion.div
            variants={gridItem}
            className="col-span-1 relative aspect-[4/5] overflow-hidden group"
          >
            <Image
              src={grid[4].src}
              alt={grid[4].alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              quality={80}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <GridLabel>{grid[4].label}</GridLabel>
          </motion.div>

          <motion.div
            variants={gridItem}
            className="col-span-1 relative aspect-[4/5] overflow-hidden group"
          >
            <Image
              src={grid[5].src}
              alt={grid[5].alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              quality={80}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <GridLabel>{grid[5].label}</GridLabel>
          </motion.div>

          <motion.div
            variants={gridItem}
            className="col-span-1 relative aspect-[4/5] overflow-hidden group"
          >
            <Image
              src={grid[6].src}
              alt={grid[6].alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              quality={80}
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            />
            <GridLabel>{grid[6].label}</GridLabel>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

function GridLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute bottom-0 left-0 right-0 px-4 py-3 text-[12px] font-medium tracking-[0.12em] uppercase text-white/90 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      {children}
    </span>
  );
}
