"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  type Variants,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

/**
 * Metodología — timeline scroll-driven.
 *
 *   - Línea vertical 1px de fondo + línea blanca encima que crece según
 *     el progreso del scroll (useScroll → scaleY).
 *   - Cada círculo del stepper se activa cuando el "frente" de la línea
 *     blanca lo alcanza. Sin hover, sin click — todo escala con el scroll.
 *   - Texto del paso (número/título/descripción) gana opacidad/color
 *     suavemente cuando su paso está activo.
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

  // El progreso del scroll dentro de la sección. Empieza cuando la sección
  // entra al viewport (start 80%) y termina cuando casi sale (end 30%).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 30%"],
  });

  const trackScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = copy.metodologia.steps;
  const total = steps.length;

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

        {/* Timeline scroll-driven */}
        <div ref={sectionRef} className="relative">
          {/* Track de fondo (gris) */}
          <div
            aria-hidden="true"
            className="absolute left-[18px] md:left-[26px] top-0 bottom-0 w-px bg-[var(--color-paper)]/15"
          />
          {/* Track blanco que se "llena" con scroll */}
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
            {steps.map((step, i) => {
              // Cada paso se activa cuando el frente de la línea llega a su
              // posición. Threshold = (i + 0.5) / total (centro del paso).
              const threshold = (i + 0.5) / total;
              return (
                <ScrollDrivenStep
                  key={step.num}
                  step={step}
                  threshold={threshold}
                  scrollYProgress={scrollYProgress}
                  variants={stepVariants}
                />
              );
            })}
          </motion.ol>
        </div>
      </Container>
    </Section>
  );
}

type Step = (typeof copy.metodologia.steps)[number];

function ScrollDrivenStep({
  step,
  threshold,
  scrollYProgress,
  variants,
}: {
  step: Step;
  threshold: number;
  scrollYProgress: MotionValue<number>;
  variants: Variants;
}) {
  // active = 1 cuando el scroll progress superó el threshold de este paso,
  // 0 antes. Suavizado con un pequeño ramp para que la transición se sienta.
  const activeMV = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    activeMV.set(latest >= threshold ? 1 : 0);
  });

  // Mapear el active 0/1 a estilos visuales del círculo y el texto.
  // useTransform genera valores en tiempo real basados en activeMV.
  const circleBg = useTransform(activeMV, [0, 1], [
    "var(--color-ink)",
    "var(--color-paper)",
  ]);
  const circleBorder = useTransform(activeMV, [0, 1], [
    "rgba(245, 245, 245, 0.4)",
    "rgba(245, 245, 245, 1)",
  ]);
  const circleScale = useTransform(activeMV, [0, 1], [1, 1.1]);

  const numOpacity = useTransform(activeMV, [0, 1], [0.45, 1]);
  const titleOpacity = useTransform(activeMV, [0, 1], [0.6, 1]);
  const bodyOpacity = useTransform(activeMV, [0, 1], [0.45, 0.85]);

  return (
    <motion.li
      variants={variants}
      className="group relative pl-12 md:pl-20 py-[clamp(28px,4vw,56px)] border-b border-[var(--color-paper)]/10 last:border-b-0"
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-[8px] md:left-[16px] top-[calc(clamp(28px,4vw,56px)+4px)] flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full border"
        style={{
          backgroundColor: circleBg,
          borderColor: circleBorder,
          scale: circleScale,
          transition:
            "background-color 600ms ease-out, border-color 600ms ease-out, scale 600ms ease-out",
        }}
      />

      <div className="grid grid-cols-12 gap-x-6 gap-y-3 items-baseline">
        <motion.span
          style={{ opacity: numOpacity, transition: "opacity 600ms ease-out" }}
          className="col-span-12 md:col-span-2 font-serif-italic leading-none text-[var(--color-paper)]"
          {...{
            // font-size inline (no animado)
            // eslint-disable-next-line react/forbid-dom-props
          }}
        >
          <span style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>{step.num}</span>
        </motion.span>

        <motion.h3
          style={{ opacity: titleOpacity, transition: "opacity 600ms ease-out" }}
          className="col-span-12 md:col-span-4 lg:col-span-4 display-s text-[var(--color-paper)]"
        >
          {step.title}
        </motion.h3>

        <motion.p
          style={{ opacity: bodyOpacity, transition: "opacity 600ms ease-out" }}
          className="col-span-12 md:col-span-6 lg:col-span-6 body-l max-w-[460px] text-[var(--color-paper)]"
        >
          {step.body}
        </motion.p>
      </div>
    </motion.li>
  );
}
