"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Hairline } from "@/components/primitives/Hairline";
import { Reveal } from "@/components/primitives/Reveal";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

export function Arquitectura() {
  return (
    <Section id="filosofia" bg="paper">
      <Container>
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="md:sticky md:top-32 flex flex-col gap-8">
              <Eyebrow number="—">{copy.arquitectura.eyebrow}</Eyebrow>
              <Reveal as="h2" className="display-m max-w-[280px]">
                {copy.arquitectura.headline}
              </Reveal>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 lg:col-span-9 lg:col-start-5 flex flex-col gap-12">
            <Reveal as="p" className="body-l max-w-[640px]" delay={0.1}>
              {copy.arquitectura.body}
            </Reveal>

            <Hairline />

            <motion.blockquote
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: easeEditorial }}
              className="display-s font-serif-italic leading-[1.15] max-w-[820px]"
            >
              &ldquo;{copy.arquitectura.quote}&rdquo;
            </motion.blockquote>

            <Hairline />

            <Reveal as="p" className="body-l max-w-[640px]" delay={0.1}>
              {copy.arquitectura.body2}
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
