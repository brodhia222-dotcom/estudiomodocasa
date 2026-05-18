"use client";

import { Smile, Sparkles, Brain, Building2, type LucideIcon } from "lucide-react";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { ExpandingCards, type ExpandingCardItem } from "@/components/ui/expanding-cards";
import { copy } from "@/lib/copy";

// Mapping de íconos por id de especialidad. Mantiene el set Lucide stroke 1.5
// que ya veníamos usando, line-style, color tomado del padre vía currentColor.
const ICONS: Record<string, LucideIcon> = {
  odontologia: Smile,
  estetica: Sparkles,
  "salud-mental": Brain,
  clinicas: Building2,
};

export function Especialidades() {
  const items: ExpandingCardItem[] = copy.especialidades.items.map((item) => {
    const Icon = ICONS[item.id] ?? Smile;
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      placeholderLabel: item.placeholderLabel,
      icon: <Icon size={28} strokeWidth={1.5} aria-hidden="true" />,
    };
  });

  return (
    <Section id="especialidades" bg="paper">
      <Container>
        <header className="grid grid-cols-12 gap-x-6 gap-y-8 mb-[clamp(48px,7vw,96px)]">
          <div className="col-span-12 md:col-span-3">
            <Eyebrow number="—">{copy.especialidades.eyebrow}</Eyebrow>
          </div>
          <div className="col-span-12 md:col-span-9 flex flex-col gap-5">
            <Reveal as="h2" className="display-l max-w-[18ch]">
              {copy.especialidades.headline}
            </Reveal>
            <Reveal
              as="p"
              className="body-l text-[var(--color-ink)]/70 max-w-[56ch]"
              delay={0.1}
            >
              {copy.especialidades.sub}
            </Reveal>
          </div>
        </header>

        <ExpandingCards items={items} defaultActiveIndex={0} desktopHeight={520} />
      </Container>
    </Section>
  );
}
