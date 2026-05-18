"use client";

import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { ExpandingProjectsCards } from "@/components/ui/expanding-projects-cards";
import { copy } from "@/lib/copy";

export function Proyectos() {
  return (
    <Section id="proyectos" bg="paper">
      <Container>
        <header className="grid grid-cols-12 gap-x-6 gap-y-6 mb-[clamp(48px,7vw,96px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow number="—">{copy.proyectos.eyebrow}</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9 flex flex-col gap-5">
            <Reveal as="h2" className="display-l max-w-[18ch]">
              {copy.proyectos.headline}
            </Reveal>
            <Reveal as="p" className="body-l text-[var(--color-ink)]/70 max-w-[56ch]" delay={0.1}>
              {copy.proyectos.sub}
            </Reveal>
          </div>
        </header>

        <ExpandingProjectsCards items={[...copy.proyectos.items]} defaultActiveIndex={0} />
      </Container>
    </Section>
  );
}
