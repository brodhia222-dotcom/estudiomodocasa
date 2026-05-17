"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Hairline } from "@/components/primitives/Hairline";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

const row: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const piece: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeEditorial } },
};

export function Testimonios() {
  return (
    <Section bg="paper">
      <Container>
        <header className="mb-[clamp(64px,9vw,144px)]">
          <Eyebrow number="—">{copy.testimonios.eyebrow}</Eyebrow>
        </header>

        <div className="flex flex-col">
          {copy.testimonios.items.map((t, i) => (
            <motion.figure
              key={i}
              variants={row}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="py-[clamp(56px,8vw,120px)] border-t border-[var(--color-ink)]"
            >
              <div className="grid grid-cols-12 gap-x-6 gap-y-10">
                <motion.span variants={piece} className="col-span-12 md:col-span-1 eyebrow opacity-50">
                  0{i + 1}
                </motion.span>
                <motion.blockquote variants={piece} className="col-span-12 md:col-span-9">
                  <p className="display-m font-serif-italic leading-[1.1]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </motion.blockquote>
                <motion.figcaption
                  variants={piece}
                  className="col-span-12 md:col-span-2 flex md:flex-col gap-2 md:items-end md:text-right"
                >
                  <span className="text-[14px] font-medium">— {t.author}</span>
                  <span className="text-[13px] opacity-55">{t.spec}</span>
                </motion.figcaption>
              </div>
            </motion.figure>
          ))}
          <Hairline />
        </div>
      </Container>
    </Section>
  );
}
