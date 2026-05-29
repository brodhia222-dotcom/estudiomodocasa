"use client";

import { useState, useEffect, useCallback, useMemo, type CSSProperties } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Lightbox } from "@/components/ui/lightbox";
import { copy } from "@/lib/copy";

const DESKTOP_HEIGHT = 480;

/**
 * Fila de 4 bloques de tipología. En desktop, al pasar el cursor sobre un
 * bloque éste se expande y despliega una sub-galería de miniaturas (hover,
 * no click). En mobile, tap abre el lightbox de esa categoría.
 * Las imágenes usan next/image para que carguen optimizadas (las fotos
 * originales pesan varios MB).
 */
export function Espacios() {
  const { categories } = copy.espacios;
  const [active, setActive] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [lightbox, setLightbox] = useState<{ cat: number; idx: number } | null>(null);

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

  const gallery = lightbox !== null ? categories[lightbox.cat].gallery : [];
  const closeLb = useCallback(() => setLightbox(null), []);
  const prevLb = useCallback(() => {
    setLightbox((s) =>
      s ? { ...s, idx: (s.idx - 1 + categories[s.cat].gallery.length) % categories[s.cat].gallery.length } : null,
    );
  }, [categories]);
  const nextLb = useCallback(() => {
    setLightbox((s) =>
      s ? { ...s, idx: (s.idx + 1) % categories[s.cat].gallery.length } : null,
    );
  }, [categories]);

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
                onClick={() => setLightbox({ cat: i, idx: 0 })}
                className="group relative cursor-pointer overflow-hidden border border-[var(--color-ink)]/15 min-h-[132px] md:min-h-0 md:min-w-[64px]"
              >
                <Image
                  src={cat.cover}
                  alt={cat.title}
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  quality={72}
                  className={`object-cover transition-[transform,filter] duration-[800ms] ease-out ${
                    isActive
                      ? "grayscale-0 contrast-100 scale-100"
                      : "grayscale contrast-[1.05] scale-105"
                  }`}
                />

                {/* Overlay: fuerte colapsado, suave activo */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] transition-opacity duration-500 ${
                    isActive
                      ? "via-[var(--color-ink)]/25 to-transparent"
                      : "via-[var(--color-ink)]/55 to-[var(--color-ink)]/25"
                  }`}
                />

                {/* Número */}
                <span
                  aria-hidden="true"
                  className="absolute top-5 left-5 eyebrow text-[var(--color-paper)]/70"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Título colapsado: rotado en desktop */}
                <h3
                  className={`hidden md:block absolute left-6 bottom-6 origin-bottom-left -rotate-90 eyebrow text-[var(--color-paper)]/90 whitespace-nowrap transition-opacity duration-300 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {cat.title}
                </h3>

                {/* Contenido activo (desktop): título + sub-galería */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-5 md:p-6 text-[var(--color-paper)] transition-[opacity,transform] duration-500 ${
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3 pointer-events-none"
                  }`}
                >
                  <h3 className="display-s font-medium mb-3 leading-tight">{cat.title}</h3>
                  <div className="flex gap-2">
                    {cat.gallery.map((g, gi) => (
                      <button
                        key={g.src}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightbox({ cat: i, idx: gi });
                        }}
                        className="relative h-16 w-16 md:h-20 md:w-20 shrink-0 overflow-hidden border border-[var(--color-paper)]/25 hover:border-[var(--color-paper)]/70 transition-colors"
                        aria-label={`Ver ${g.alt}`}
                      >
                        <Image src={g.src} alt={g.alt} fill sizes="80px" quality={50} className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Título mobile (colapsado) */}
                <h3
                  className={`md:hidden absolute bottom-5 left-5 eyebrow text-[var(--color-paper)]/90 transition-opacity duration-300 ${
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

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={gallery}
            index={lightbox.idx}
            onClose={closeLb}
            onPrev={prevLb}
            onNext={nextLb}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
