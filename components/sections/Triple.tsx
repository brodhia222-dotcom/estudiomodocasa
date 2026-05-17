"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Hairline } from "@/components/primitives/Hairline";
import { Section } from "@/components/primitives/Section";
import { WipeWords } from "@/components/primitives/WipeWords";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

export function Triple() {
  return (
    <Section id="filosofia" bg="paper" py="none">
      <div className="flex flex-col">
        {copy.triple.map((item, i) => (
          <article
            key={item.number}
            className="relative min-h-[clamp(520px,75vh,820px)] flex items-center"
          >
            {i === 0 && <Hairline className="absolute top-0 left-0 right-0" />}

            <Container className="w-full">
              <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-start">
                <div className="col-span-12 md:col-span-3 lg:col-span-2 flex md:flex-col items-baseline md:items-start gap-4">
                  <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.6, ease: easeEditorial }}
                    className="display-m font-medium text-[var(--color-ink)]/85"
                  >
                    {item.number}
                  </motion.span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.8, ease: easeEditorial }}
                    className="hidden md:block h-px w-12 origin-left bg-[var(--color-ink)]/40"
                  />
                </div>

                <h2 className="col-span-12 md:col-span-9 lg:col-span-10 display-l">
                  <WipeWords text={item.title} delay={0.2} />
                  <br />
                  <WipeWords text={item.italic} delay={0.45} italic />
                  {"footer" in item && (
                    <>
                      <br />
                      <WipeWords text={item.footer} delay={0.65} />
                    </>
                  )}
                </h2>
              </div>
            </Container>

            <Hairline className="absolute bottom-0 left-0 right-0" />
          </article>
        ))}
      </div>
    </Section>
  );
}
