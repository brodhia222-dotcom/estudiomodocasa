"use client";

import { useState, useEffect, useMemo, type CSSProperties } from "react";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { copy } from "@/lib/copy";

const DESKTOP_HEIGHT = 480;

/**
 * Fila de 4 bloques de tipología. En desktop, al pasar el cursor sobre un
 * bloque éste se expande y despliega su galería como 4 imágenes en grilla
 * 2×2 (todas del mismo tamaño, sin una principal y sin necesidad de click
 * ni ventana emergente). En mobile, tap alterna el despliegue.
 * Imágenes con next/image para que carguen optimizadas.
 */
export function Espacios() {
  const { categories } = copy.espacios;
  const [active, setActive] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const gridStyle = useMemo<CSSProperties>(() => {
    const tracks = categories
      .map((_, i) => (active === null ? "1fr" : i === active ? "4fr" : "1fr"))
      .join(" ");
    return isDesktop
      ? { gridTemplateColumns: tracks, gridTemplateRows: "1fr", height: DESKTOP_HEIGHT }
      : { gridTemplateColumns: "1fr", gridAutoRows: "minmax(132px, 1fr)" };
  }, [active, categories, isDesktop]);

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

        <ul
          onMouseLeave={() => setActive(null)}
          className="grid w-full gap-2 transition-[grid-template-columns] duration-[600ms] ease-out"
          style={gridStyle}
        >
          {categories.map((cat, i) => {
            const isActive = active === i;
            return (
              <li
                key={cat.id}
                data-active={isActive}
                onMouseEnter={() => isDesktop && setActive(i)}
                onClick={() => setActive((cur) => (cur === i ? null : i))}
                className="group relative cursor-pointer overflow-hidden border border-[var(--color-ink)]/15 min-h-[132px] md:min-h-0 md:min-w-[64px]"
              >
                {/* Cover (visible colapsado) */}
                <Image
                  src={cat.cover}
                  alt={cat.title}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  quality={70}
                  className={`object-cover transition-[transform,filter,opacity] duration-[700ms] ease-out grayscale contrast-[1.05] ${
                    isActive ? "opacity-0 scale-100" : "opacity-100 scale-105"
                  }`}
                />

                {/* Galería 2×2 (visible al hover/activo) — 4 imágenes iguales */}
                <div
                  className={`absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {cat.gallery.slice(0, 4).map((g) => (
                    <div key={g.src} className="relative overflow-hidden">
                      <Image
                        src={g.src}
                        alt={g.alt}
                        fill
                        sizes="(min-width: 768px) 28vw, 50vw"
                        quality={62}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Scrim superior para legibilidad del título */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--color-ink)]/70 to-transparent pointer-events-none"
                />
                {/* Scrim inferior (solo colapsado) */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/45 to-transparent transition-opacity duration-500 pointer-events-none ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Número */}
                <span
                  aria-hidden="true"
                  className="absolute top-5 left-5 z-10 eyebrow text-[var(--color-paper)]/70"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Título activo: arriba a la izquierda */}
                <h3
                  className={`absolute top-12 left-5 z-10 display-s font-medium text-[var(--color-paper)] transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {cat.title}
                </h3>

                {/* Título colapsado: rotado en desktop */}
                <h3
                  className={`hidden md:block absolute left-6 bottom-6 z-10 origin-bottom-left -rotate-90 eyebrow text-[var(--color-paper)]/90 whitespace-nowrap transition-opacity duration-300 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {cat.title}
                </h3>

                {/* Título colapsado mobile */}
                <h3
                  className={`md:hidden absolute bottom-5 left-5 z-10 eyebrow text-[var(--color-paper)]/90 transition-opacity duration-300 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {cat.title}
                </h3>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
