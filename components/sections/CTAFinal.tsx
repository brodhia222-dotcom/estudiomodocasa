"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { MagneticLink } from "@/components/primitives/MagneticLink";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

const block: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const piece: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeEditorial } },
};

export function CTAFinal() {
  return (
    <section
      id="coordinar"
      className="relative bg-[var(--color-paper)] text-[var(--color-ink)] py-[clamp(80px,12vw,128px)]"
    >
      <Container>
        <motion.div
          variants={block}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center max-w-[760px] mx-auto"
        >
          <motion.h2
            variants={piece}
            className="display-l max-w-[20ch]"
          >
            {copy.ctaFinal.headline}
          </motion.h2>

          <motion.p
            variants={piece}
            className="mt-6 body-l text-[var(--color-ink)]/70"
          >
            {copy.ctaFinal.sub}
          </motion.p>

          <motion.div variants={piece} className="mt-10">
            <MagneticLink href="#contacto" variant="primary">
              {copy.ctaFinal.primaryCta}
            </MagneticLink>
          </motion.div>

          <motion.p
            variants={piece}
            className="mt-5 text-[13px] text-[var(--color-ink)]/55 tracking-[0.01em]"
          >
            {copy.ctaFinal.microInfo}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
