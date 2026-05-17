"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

// Layout asimétrico editorial: filas con anchos variables
const layout = [
  // Row 1: large left, small right
  [{ span: 7, align: "left" }, { span: 5, align: "right" }],
  // Row 2: small left, large right
  [{ span: 5, align: "left" }, { span: 7, align: "right" }],
  // Row 3: balanced
  [{ span: 6, align: "left" }, { span: 6, align: "right" }],
] as const;

export function Proyectos() {
  return (
    <Section id="proyectos" bg="paper">
      <Container>
        <header className="grid grid-cols-12 gap-x-6 gap-y-10 mb-[clamp(64px,9vw,144px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow number="—">{copy.proyectos.eyebrow}</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9 flex flex-col gap-8">
            <Reveal as="h2" className="display-l">
              {copy.proyectos.headline}
            </Reveal>
            <Reveal as="p" className="body-l opacity-75 max-w-[640px]" delay={0.1}>
              {copy.proyectos.sub}
            </Reveal>
          </div>
        </header>

        <div className="flex flex-col gap-[clamp(40px,5vw,80px)]">
          {layout.map((row, rowIndex) => {
            const items = copy.proyectos.items.slice(rowIndex * 2, rowIndex * 2 + 2);
            return (
              <div key={rowIndex} className="grid grid-cols-12 gap-[clamp(20px,3vw,48px)]">
                {items.map((p, i) => {
                  const cfg = row[i];
                  return (
                    <ProjectTile
                      key={p.num}
                      project={p}
                      span={cfg.span}
                      index={rowIndex * 2 + i}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        <p className="mt-16 text-[12px] opacity-50 max-w-[480px]">{copy.proyectos.note}</p>
      </Container>
    </Section>
  );
}

function ProjectTile({
  project,
  span,
  index,
}: {
  project: (typeof copy.proyectos.items)[number];
  span: number;
  index: number;
}) {
  const spanClass: Record<number, string> = {
    5: "col-span-12 md:col-span-5",
    6: "col-span-12 md:col-span-6",
    7: "col-span-12 md:col-span-7",
  };
  return (
    <motion.figure
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: easeEditorial, delay: (index % 2) * 0.1 }}
      className={`${spanClass[span] ?? "col-span-12"} group flex flex-col gap-6`}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: project.aspect.replace("/", " / ") }}
      >
        {/* Placeholder editorial — fondo ink con grid sutil y caption */}
        <div className="absolute inset-0 bg-[var(--color-ink)] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-paper) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <motion.div
            initial={{ scale: 1.04 }}
            whileInView={{ scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: easeEditorial }}
            className="absolute inset-0 flex items-end justify-between p-6 md:p-10"
          >
            <span className="eyebrow text-[var(--color-paper)] opacity-65">{project.num}</span>
            <span className="eyebrow text-[var(--color-paper)] opacity-65">
              Imagen pendiente
            </span>
          </motion.div>
        </div>

        {/* Reveal overlay que se retira de izquierda a derecha */}
        <motion.div
          initial={{ scaleX: 1 }}
          whileInView={{ scaleX: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: easeEditorial, delay: 0.1 }}
          style={{ transformOrigin: "right" }}
          className="absolute inset-0 bg-[var(--color-paper)]"
        />
      </div>

      <figcaption className="flex items-baseline justify-between gap-6">
        <h3 className="display-s font-medium leading-tight max-w-[480px]">{project.name}</h3>
        <p className="text-[13px] opacity-60 whitespace-nowrap">{project.spec}</p>
      </figcaption>
    </motion.figure>
  );
}
