"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

/**
 * Título de una línea (15 años) + 3 tarjetas con foto y reveal sutil.
 *
 * Sin íconos: divider hairline + título + body. Los títulos quedan sobre
 * la misma línea base gracias al min-height del párrafo.
 */

const grid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: easeEditorial },
  },
};

export function ValueProps() {
  return (
    <Section bg="paper" py="default" className="!pt-[clamp(120px,14vw,200px)]">
      <Container>
        <div className="mb-[clamp(48px,7vw,88px)]">
          <Reveal
            as="h2"
            className="font-medium tracking-[-0.02em] leading-tight text-[clamp(20px,2.4vw,32px)] md:whitespace-nowrap"
          >
            {copy.valuePropsHeader.title}
          </Reveal>
          <div className="max-w-[680px] mt-5 flex flex-col gap-3">
            <Reveal
              as="p"
              className="body-l text-[var(--color-mute)]"
              delay={0.1}
            >
              {copy.valuePropsHeader.sub1}
            </Reveal>
            <Reveal
              as="p"
              className="body-l text-[var(--color-mute)]"
              delay={0.18}
            >
              {copy.valuePropsHeader.sub2}
            </Reveal>
          </div>
        </div>

        <motion.ul
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {copy.valueProps.map((item) => (
            <motion.li
              key={item.number}
              variants={card}
              className="relative min-h-[440px] md:min-h-[520px] overflow-hidden border border-[var(--color-ink)]/15"
            >
              {/* Foto cover */}
              <Image
                src={item.imgSrc}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                quality={75}
                style={{ objectPosition: item.objectPosition }}
                className="object-cover scale-105 transition-transform duration-[1200ms] ease-out hover:scale-100"
              />

              {/* Gradient bottom-up: solo lo necesario para legibilidad del
                 texto. Bajo en el medio y arriba para que la foto se note. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/35 to-transparent"
              />

              {/* Contenido */}
              <div className="relative z-10 flex flex-col h-full p-7 md:p-9 text-[var(--color-paper)]">
                {/* Bloque inferior alineado: divider + título + body */}
                <div className="mt-auto flex flex-col gap-4">
                  <span
                    aria-hidden="true"
                    className="block h-px w-10 bg-[var(--color-paper)]/85"
                  />
                  <h3 className="text-[22px] md:text-[24px] font-semibold tracking-[-0.01em] leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.55] text-[var(--color-paper)]/82 max-w-[34ch] min-h-[4.8em]">
                    {item.body}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
