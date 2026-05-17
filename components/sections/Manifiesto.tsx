"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Hairline } from "@/components/primitives/Hairline";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

const wrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeEditorial } },
};

const figure: Variants = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 1.1, ease: easeEditorial } },
};

export function Manifiesto() {
  return (
    <Section bg="paper-2">
      <Container>
        <motion.div
          variants={wrap}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-12 gap-x-6 gap-y-16 items-start"
        >
          <motion.div variants={item} className="col-span-12 md:col-span-2">
            <Eyebrow number="—">{copy.manifiesto.eyebrow}</Eyebrow>
          </motion.div>

          <motion.div variants={item} className="col-span-12 md:col-span-7">
            <p className="display-m">{copy.manifiesto.body}</p>
          </motion.div>

          <motion.div variants={item} className="col-span-12 md:col-span-3 flex md:justify-end">
            <div className="flex flex-col items-start md:items-end gap-4">
              <span className="inline-flex overflow-hidden leading-[0.85]">
                <motion.span
                  variants={figure}
                  className="display-xl block"
                  style={{ fontWeight: 400, letterSpacing: "-0.06em" }}
                >
                  {copy.manifiesto.figure}
                </motion.span>
              </span>
              <Hairline className="w-16" />
              <motion.p
                variants={item}
                className="text-[13px] leading-[1.5] opacity-65 max-w-[260px] md:text-right"
              >
                {copy.manifiesto.figureLabel}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
