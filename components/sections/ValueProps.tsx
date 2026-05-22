"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { ValuePropIcon } from "@/components/primitives/ValuePropIcon";
import { easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

/**
 * 3 tarjetas con foto del estudio + flip 3D al entrar viewport.
 *
 * - Cada card empieza boca abajo (rotateY: 180) mostrando el "dorso"
 *   (número grande italic sobre fondo ink).
 * - Al entrar al viewport, gira sobre el eje Y hasta dejar el frente
 *   visible: foto del estudio + icono + título + descripción.
 * - Stagger de ~0.18s entre cards para que el flip se sienta secuencial.
 * - Container con `perspective` para que la rotación tenga profundidad
 *   y no quede plana.
 */

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const flip: Variants = {
  hidden: { rotateY: 180 },
  visible: {
    rotateY: 0,
    transition: { duration: 1.1, ease: easeEditorial },
  },
};

export function ValueProps() {
  return (
    <Section
      bg="paper"
      py="default"
      className="!pt-[clamp(120px,14vw,200px)]"
    >
      <Container>
        <motion.ul
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {copy.valueProps.map((item) => (
            <li
              key={item.number}
              className="relative min-h-[440px] md:min-h-[520px]"
              style={{ perspective: 1600 }}
            >
              <motion.div
                variants={flip}
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* ─── Cara FRONT: foto + contenido ─── */}
                <div
                  className="absolute inset-0 overflow-hidden border border-[var(--color-ink)]/15"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Foto cover */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover scale-105 transition-transform duration-[1200ms] ease-out group-hover:scale-100"
                  />

                  {/* Gradient bottom-up para legibilidad del texto blanco */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/65 to-[var(--color-ink)]/20"
                  />

                  {/* Contenido */}
                  <div className="relative z-10 flex flex-col h-full p-7 md:p-9 text-[var(--color-paper)]">
                    {/* Número grande italic en esquina superior derecha */}
                    <span
                      aria-hidden="true"
                      className="absolute top-6 right-7 font-serif-italic leading-none text-[var(--color-paper)]/75"
                      style={{ fontSize: "clamp(28px, 2.6vw, 36px)" }}
                    >
                      {item.number}
                    </span>

                    {/* Bloque inferior: icono + divider + título + body */}
                    <div className="mt-auto flex flex-col gap-5">
                      <ValuePropIcon
                        variant={item.icon}
                        size={52}
                        className="text-[var(--color-paper)]"
                      />
                      <span
                        aria-hidden="true"
                        className="block h-px w-10 bg-[var(--color-paper)]/85"
                      />
                      <h3 className="text-[22px] md:text-[24px] font-semibold tracking-[-0.01em] leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[14px] md:text-[15px] leading-[1.55] text-[var(--color-paper)]/82 max-w-[34ch]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ─── Cara BACK: fondo negro liso, sin contenido ─── */}
                <div
                  className="absolute inset-0 bg-[var(--color-ink)]"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  aria-hidden="true"
                />
              </motion.div>
            </li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
