"use client";

import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { ExpandingCards, type ExpandingCardItem } from "@/components/ui/expanding-cards";
import { copy } from "@/lib/copy";

export function Espacios() {
  const items: ExpandingCardItem[] = copy.espacios.items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    placeholderLabel: item.placeholderLabel,
    imgSrc: item.imgSrc,
    origin: item.origin,
  }));

  return (
    <Section id="espacios" bg="paper">
      <Container>
        <header className="grid grid-cols-12 gap-x-6 gap-y-8 mb-[clamp(48px,7vw,96px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow number="—">{copy.espacios.eyebrow}</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9 flex flex-col gap-5">
            <Reveal as="h2" className="display-l max-w-[18ch]">
              {copy.espacios.headline}
            </Reveal>
            <Reveal
              as="p"
              className="body-l text-[var(--color-ink)]/70 max-w-[56ch]"
              delay={0.1}
            >
              {copy.espacios.sub}
            </Reveal>
          </div>
        </header>

        <ExpandingCards items={items} desktopHeight={560} />
      </Container>
    </Section>
  );
}
