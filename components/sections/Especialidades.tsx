"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Hairline } from "@/components/primitives/Hairline";
import { Reveal } from "@/components/primitives/Reveal";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy } from "@/lib/copy";

export function Especialidades() {
  return (
    <Section id="especialidades" bg="paper">
      <Container>
        <header className="grid grid-cols-12 gap-x-6 gap-y-10 mb-[clamp(56px,8vw,128px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow number="—">{copy.especialidades.eyebrow}</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9 flex flex-col gap-10">
            <Reveal as="h2" className="display-l">
              {copy.especialidades.headline}
            </Reveal>
            <Reveal as="p" className="body-l opacity-75 max-w-[640px]" delay={0.1}>
              {copy.especialidades.sub}
            </Reveal>
          </div>
        </header>

        <Hairline />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {copy.especialidades.items.map((item, i) => (
            <motion.li
              key={item.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.7,
                ease: easeEditorial,
                delay: (i % 4) * 0.08,
              }}
              className={`group relative py-10 px-6 border-b border-[var(--color-ink)] sm:[&:nth-child(2n)]:border-l lg:[&:nth-child(2n)]:border-l-0 lg:[&:nth-child(4n+2)]:border-l lg:[&:nth-child(4n+3)]:border-l lg:[&:nth-child(4n)]:border-l ${
                i === 0 || (i === 1 && "border-l-0")
              }`}
            >
              <div className="flex flex-col gap-3 min-h-[180px] justify-between">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow opacity-50">{item.num}</span>
                  <motion.span
                    aria-hidden="true"
                    className="text-[var(--color-ink)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    →
                  </motion.span>
                </div>
                <h3 className="display-s font-medium">{item.name}</h3>
                <p className="text-[13px] leading-[1.5] opacity-65">{item.caption}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
