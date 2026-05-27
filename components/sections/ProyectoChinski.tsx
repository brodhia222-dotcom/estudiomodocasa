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

const ROW_1 = [
  proyecto.images.hero,
  proyecto.images.grid[1],
  proyecto.images.grid[3],
  proyecto.images.grid[4],
];

const ROW_2 = [
  proyecto.images.grid[0],
  proyecto.images.grid[2],
  proyecto.images.grid[5],
  proyecto.images.grid[6],
];

export function ProyectoChinski() {
  return (
    <Section id="proyecto" bg="paper" py="default">
      {/* ── Header ── */}
      <Container>
        <header className="grid grid-cols-12 gap-x-6 gap-y-6 mb-[clamp(32px,5vw,56px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow>{proyecto.eyebrow}</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Reveal as="h2" className="display-l max-w-[700px]">
                {proyecto.headline}
              </Reveal>
              <Reveal
                as="p"
                className="body-l text-[var(--color-mute)] max-w-[480px] mt-3"
                delay={0.1}
              >
                {proyecto.sub}
              </Reveal>
            </div>
            <motion.div
              variants={statStagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-wrap gap-x-8 gap-y-3 shrink-0"
            >
              {proyecto.stats.map((stat) => (
                <motion.div key={stat.label} variants={statItem}>
                  <span className="eyebrow text-[var(--color-mute)]">
                    {stat.label}
                  </span>
                  <p className="text-[15px] font-medium tracking-[-0.01em] mt-1">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </header>
      </Container>

      {/* ── Auto-scroll marquee gallery ── */}
      <div className="flex flex-col gap-3 md:gap-4 overflow-hidden">
        <MarqueeRow images={ROW_1} direction="left" speed={35} />
        <MarqueeRow images={ROW_2} direction="right" speed={28} />
      </div>
    </Section>
  );
}

type MarqueeImage = { src: string; alt: string; label?: string };

function MarqueeRow({
  images,
  direction,
  speed,
}: {
  images: MarqueeImage[];
  direction: "left" | "right";
  speed: number;
}) {
  const doubled = [...images, ...images];
  const animClass =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div
      className="flex overflow-hidden group"
      style={
        { "--marquee-speed": `${speed}s` } as React.CSSProperties
      }
    >
      <div
        className={`flex shrink-0 gap-3 md:gap-4 ${animClass} group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative h-[240px] md:h-[320px] lg:h-[380px] shrink-0 overflow-hidden rounded-sm"
            style={{ width: "auto", aspectRatio: "3 / 2" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 570px, (min-width: 768px) 480px, 360px"
              quality={80}
              className="object-cover"
            />
            {img.label && (
              <span className="absolute bottom-0 left-0 right-0 px-4 py-2.5 text-[11px] font-medium tracking-[0.14em] uppercase text-white/90 bg-gradient-to-t from-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {img.label}
              </span>
            )}
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className={`flex shrink-0 gap-3 md:gap-4 ${animClass} group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((img, i) => (
          <div
            key={`${img.src}-dup-${i}`}
            className="relative h-[240px] md:h-[320px] lg:h-[380px] shrink-0 overflow-hidden rounded-sm"
            style={{ width: "auto", aspectRatio: "3 / 2" }}
          >
            <Image
              src={img.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 570px, (min-width: 768px) 480px, 360px"
              quality={80}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
