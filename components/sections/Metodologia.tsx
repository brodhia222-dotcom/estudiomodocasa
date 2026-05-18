"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

/**
 * Metodología — timeline interactivo vertical.
 *
 *   - Stepper con línea vertical que se "ilumina" según el progreso del scroll
 *     dentro de la sección (useScroll → scaleY).
 *   - Cada paso tiene un círculo numerado, título y descripción.
 *   - Click/hover en un paso lo marca como activo: el círculo se llena en sólido,
 *     el título se intensifica y la descripción gana presencia (opacity 100).
 *   - Al primer paso le toca activo por default.
 *   - Sección en bg ink (negra), texto paper (blanco).
 */

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeEditorial } },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export function Metodologia() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // El track vertical se "llena" según el progreso del scroll dentro de la
  // sección. Offset elegido para que el llenado empiece cuando el primer paso
  // entra al viewport y termine cuando el último sale.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 50%"],
  });
  const trackScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="metodologia" bg="ink">
      <Container>
        {/* Header */}
        <header className="grid grid-cols-12 gap-x-6 gap-y-8 mb-[clamp(48px,7vw,96px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow number="—" inverted>
              {copy.metodologia.eyebrow}
            </Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9 flex flex-col gap-5">
            <Reveal as="h2" className="display-l text-[var(--color-paper)] max-w-[14ch]">
              {copy.metodologia.headline}
            </Reveal>
            <Reveal
              as="p"
              className="body-l text-[var(--color-paper)]/70 max-w-[52ch]"
              delay={0.1}
            >
              {copy.metodologia.sub}
            </Reveal>
          </div>
        </header>

        {/* Timeline */}
        <div ref={sectionRef} className="relative">
          {/* Track vertical (fondo gris + capa que se "llena" con scroll) */}
          <div
            aria-hidden="true"
            className="absolute left-[18px] md:left-[26px] top-0 bottom-0 w-px bg-[var(--color-paper)]/15"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: trackScaleY, transformOrigin: "top" }}
            className="absolute left-[18px] md:left-[26px] top-0 bottom-0 w-px bg-[var(--color-paper)]"
          />

          <motion.ol
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col"
          >
            {copy.metodologia.steps.map((step, i) => {
              const active = activeIdx === i;
              return (
                <motion.li
                  key={step.num}
                  variants={stepVariants}
                  onMouseEnter={() => setActiveIdx(i)}
                  onFocus={() => setActiveIdx(i)}
                  onClick={() => setActiveIdx(i)}
                  tabIndex={0}
                  className="group relative pl-12 md:pl-20 py-[clamp(28px,4vw,56px)] cursor-pointer outline-none border-b border-[var(--color-paper)]/10 last:border-b-0"
                  data-active={active}
                >
                  {/* Círculo numerado del stepper */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-[8px] md:left-[16px] top-[calc(clamp(28px,4vw,56px)+4px)] flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full border transition-all duration-700 ease-out ${
                      active
                        ? "bg-[var(--color-paper)] border-[var(--color-paper)] scale-110"
                        : "bg-[var(--color-ink)] border-[var(--color-paper)]/40 scale-100"
                    }`}
                  />

                  <div className="grid grid-cols-12 gap-x-6 gap-y-3 items-baseline">
                    {/* Número grande */}
                    <span
                      className={`col-span-12 md:col-span-2 font-serif-italic leading-none transition-colors duration-700 ${
                        active
                          ? "text-[var(--color-paper)]"
                          : "text-[var(--color-paper)]/45"
                      }`}
                      style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
                    >
                      {step.num}
                    </span>

                    {/* Título */}
                    <h3
                      className={`col-span-12 md:col-span-4 lg:col-span-4 display-s transition-colors duration-700 ${
                        active
                          ? "text-[var(--color-paper)]"
                          : "text-[var(--color-paper)]/70"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Descripción — opacity sube cuando está activo */}
                    <p
                      className={`col-span-12 md:col-span-6 lg:col-span-6 body-l max-w-[460px] transition-[opacity,color] duration-700 ease-out ${
                        active
                          ? "opacity-100 text-[var(--color-paper)]/85"
                          : "opacity-55 text-[var(--color-paper)]/55"
                      }`}
                    >
                      {step.body}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </Container>
    </Section>
  );
}
