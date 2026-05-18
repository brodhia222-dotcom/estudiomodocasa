"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { MediaSlot } from "@/components/primitives/MediaSlot";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeEditorial } },
};

export function Proyectos() {
  const [hero, ...rest] = copy.proyectos.items;

  return (
    <Section id="proyectos" bg="paper">
      <Container>
        {/* Header compacto */}
        <header className="grid grid-cols-12 gap-x-6 gap-y-6 mb-[clamp(48px,7vw,96px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow number="—">{copy.proyectos.eyebrow}</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9 flex flex-col gap-5">
            <Reveal as="h2" className="display-l max-w-[18ch]">
              {copy.proyectos.headline}
            </Reveal>
            <Reveal as="p" className="body-l text-[var(--color-ink)]/70 max-w-[56ch]" delay={0.1}>
              {copy.proyectos.sub}
            </Reveal>
          </div>
        </header>

        {/* Grid asimétrico 1 arriba + 2 abajo */}
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-8"
        >
          {/* Row 1: 1 proyecto full-width (el más reciente, criterio editorial) */}
          <motion.div variants={card}>
            <ProjectCard project={hero} index={0} />
          </motion.div>

          {/* Row 2: 2 proyectos lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((p, i) => (
              <motion.div key={p.name} variants={card}>
                <ProjectCard project={p} index={i + 1} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof copy.proyectos.items)[number];
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");
  const label = `${number} · ${project.name.toUpperCase()}`;

  return (
    <figure className="group flex flex-col">
      <div className="relative overflow-hidden">
        <MediaSlot
          mode="placeholder"
          number={number}
          placeholderLabel={label}
          alt={project.alt}
          aspect="4/3"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        {/* Overlay sutil al hover. pointer-events-none para no romper foco. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[var(--color-ink)]/0 group-hover:bg-[var(--color-ink)]/5 transition-colors duration-500 pointer-events-none"
        />
      </div>

      <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="display-s font-semibold">{project.name}</h3>
        <span className="text-[13px] md:text-[14px] text-[var(--color-ink)]/55 whitespace-nowrap">
          {project.spec}
        </span>
      </figcaption>
    </figure>
  );
}
