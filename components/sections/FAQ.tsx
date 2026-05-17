"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Hairline } from "@/components/primitives/Hairline";
import { Reveal } from "@/components/primitives/Reveal";
import { easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section bg="paper-2">
      <Container>
        <header className="grid grid-cols-12 gap-x-6 gap-y-10 mb-[clamp(56px,8vw,120px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow number="—">{copy.faq.eyebrow}</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal as="h2" className="display-l max-w-[820px]">
              {copy.faq.headline}
            </Reveal>
          </div>
        </header>

        <ul className="border-t border-[var(--color-ink)]">
          {copy.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="border-b border-[var(--color-ink)]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full grid grid-cols-12 gap-x-6 items-start py-8 text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="col-span-2 md:col-span-1 eyebrow opacity-50 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="col-span-9 md:col-span-10 display-s font-medium pr-6">
                    {item.q}
                  </span>
                  <span className="col-span-1 flex justify-end pt-2" aria-hidden="true">
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.5, ease: easeEditorial }}
                      className="relative w-5 h-5 flex items-center justify-center"
                    >
                      <span className="absolute h-px w-5 bg-[var(--color-ink)]" />
                      <span className="absolute w-px h-5 bg-[var(--color-ink)]" />
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: easeEditorial }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-x-6 pb-10">
                        <p className="col-start-3 col-span-9 md:col-start-2 md:col-span-9 body-l opacity-70 max-w-[640px]">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
