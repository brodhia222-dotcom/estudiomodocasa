"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Hairline } from "@/components/primitives/Hairline";
import { Reveal } from "@/components/primitives/Reveal";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

const row: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const num: Variants = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 1, ease: easeEditorial } },
};

const piece: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeEditorial } },
};

export function Metodologia() {
  return (
    <Section id="metodologia" bg="ink">
      <Container>
        <header className="grid grid-cols-12 gap-x-6 gap-y-10 mb-[clamp(72px,10vw,160px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow number="—" inverted>
              {copy.metodologia.eyebrow}
            </Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9 flex flex-col gap-10">
            <Reveal as="h2" className="display-l text-[var(--color-paper)]">
              {copy.metodologia.headline}
            </Reveal>
            <Reveal as="p" className="body-l text-[var(--color-paper)]/70 max-w-[640px]" delay={0.1}>
              {copy.metodologia.sub}
            </Reveal>
          </div>
        </header>

        <Hairline inverted />

        <ol className="flex flex-col">
          {copy.metodologia.steps.map((step) => (
            <motion.li
              key={step.num}
              variants={row}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="group relative border-b border-[var(--color-paper)]/20 py-[clamp(48px,7vw,96px)]"
            >
              <div className="grid grid-cols-12 gap-x-6 gap-y-8 items-baseline">
                <div className="col-span-12 md:col-span-3 lg:col-span-2">
                  <span className="inline-flex overflow-hidden leading-none">
                    <motion.span
                      variants={num}
                      className="block display-l text-[var(--color-paper)]"
                      style={{ fontWeight: 400 }}
                    >
                      {step.num}
                    </motion.span>
                  </span>
                </div>

                <motion.h3
                  variants={piece}
                  className="col-span-12 md:col-span-5 lg:col-span-5 display-s text-[var(--color-paper)]"
                >
                  {step.title}
                </motion.h3>

                <motion.p
                  variants={piece}
                  className="col-span-12 md:col-span-4 lg:col-span-5 body-l text-[var(--color-paper)]/70 max-w-[440px]"
                >
                  {step.body}
                </motion.p>
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
