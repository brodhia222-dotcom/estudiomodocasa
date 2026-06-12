"use client";

import { useState, useEffect, useMemo, useCallback, type CSSProperties } from "react";
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
 * bloque éste se expande y despliega su galería como 4 imágenes en grilla
 * 2×2 (todas del mismo tamaño, sin una principal y sin necesidad de click
 * ni ventana emergente). En mobile, tap alterna el despliegue.
 * Imágenes con next/image para que carguen optimizadas.
 */
export function Espacios() {
  const { categories } = copy.espacios;
  const [active, setActive] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [lightbox, setLightbox] = useState<{ cat: number; idx: number } | null>(null);
  // Las miniaturas de cada bloque sólo se montan (y descargan) cuando el
  // bloque se activa por primera vez. Evita ~16 descargas en la carga inicial.
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set());

  const reveal = useCallback((i: number) => {
    setActive(i);
    setRevealed((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  }, []);

  const lbGallery = lightbox !== null ? categories[lightbox.cat].gallery : [];
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
        <header className="mb-[clamp(48px,7vw,96px)]">
          <Eyebrow number="—">{copy.espacios.eyebrow}</Eyebrow>
          <Reveal as="h2" className="display-l max-w-[18ch] mt-6">
            {copy.espacios.headline}
          </Reveal>
          <Reveal
            as="p"
            className="body-l text-[var(--color-ink)]/70 max-w-[56ch] mt-5"
            delay={0.1}
          >
            {copy.espacios.sub}
          </Reveal>
        </header>

        <ul
          onMouseLeave={() => setActive(null)}
          className="grid w-full gap-2 transition-[grid-template-columns] duration-[600ms] ease-out"
          style={gridStyle}
        >
          {categories.map((cat, i) => {
            const isActive = active === i;
            // En desktop, cuando otro bloque está activo, éste queda angosto:
            // ahí mostramos el título rotado (sin lorem). En reposo (o mobile)
            // mostramos título + lorem horizontal.
            const isShrunkDesktop = isDesktop && active !== null && !isActive;
            const showHorizontal = !isActive && !isShrunkDesktop;
            return (
              <li
                key={cat.id}
                data-active={isActive}
                onMouseEnter={() => isDesktop && reveal(i)}
                onClick={() => (active === i ? setActive(null) : reveal(i))}
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
                  {Array.from({ length: 4 }).map((_, gi) => {
                    const g = cat.gallery[gi];
                    if (!g) {
                      return (
                        <div
                          key={`ph-${gi}`}
                          className="relative overflow-hidden bg-[var(--color-ink)] flex items-center justify-center"
                        >
                          <div
                            aria-hidden="true"
                            className="absolute inset-3 border border-dashed border-[var(--color-paper)]/15"
                          />
                          <span className="eyebrow text-[var(--color-paper)]/35">
                            Próximamente
                          </span>
                        </div>
                      );
                    }
                    return (
                      <button
                        key={g.src}
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightbox({ cat: i, idx: gi });
                        }}
                        className="group/img relative overflow-hidden cursor-pointer bg-[var(--color-ink)]"
                        aria-label={`Ampliar ${g.alt}`}
                      >
                        {revealed.has(i) && (
                          <Image
                            src={g.src}
                            alt={g.alt}
                            fill
                            sizes="(min-width: 768px) 28vw, 50vw"
                            quality={62}
                            style={{
                              objectPosition:
                                (g as { objectPosition?: string }).objectPosition,
                            }}
                            className="object-cover transition-transform duration-500 ease-out group-hover/img:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-[var(--color-ink)]/0 group-hover/img:bg-[var(--color-ink)]/15 transition-colors duration-300" />
                      </button>
                    );
                  })}
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

                {/* Título activo: arriba a la izquierda */}
                <h3
                  className={`absolute top-6 left-5 md:left-6 z-10 display-s font-medium text-[var(--color-paper)] transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {cat.title}
                </h3>

                {/* Colapsado en reposo / mobile: título + lorem */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-5 md:p-6 z-10 transition-opacity duration-300 ${
                    showHorizontal ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {/* min-heights para que título y blurb alineen entre tarjetas
                     aunque tengan distinta cantidad de líneas. */}
                  <h3 className="display-s font-medium text-[var(--color-paper)] leading-tight min-h-[2.4em]">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-[1.5] text-[var(--color-paper)]/65 max-w-[34ch] min-h-[4.5em]">
                    {cat.blurb}
                  </p>
                </div>

                {/* Colapsado angosto (otro activo): título rotado */}
                <h3
                  className={`hidden md:block absolute left-6 bottom-6 z-10 origin-bottom-left -rotate-90 eyebrow text-[var(--color-paper)]/90 whitespace-nowrap transition-opacity duration-300 ${
                    isShrunkDesktop ? "opacity-100" : "opacity-0"
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
            images={lbGallery}
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
