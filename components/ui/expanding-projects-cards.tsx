"use client";

import { useState } from "react";

/**
 * Fila horizontal de tarjetas que se expanden al hover.
 *
 * Adaptación del componente `expand-cards` de vaib215 (21st.dev). Cambios
 * para alinear con la marca de ModoCasa:
 *   - placeholder editorial dentro de cada card (grilla 1px + label) en vez
 *     de imágenes externas
 *   - contenido tipográfico encima (overlay) cuando la card está expandida
 *   - paleta consume tokens (--color-ink / --color-paper)
 *   - sin bordes redondeados pesados (rounded-none, swiss editorial)
 *   - touch support: en mobile las cards se apilan verticalmente y se
 *     expanden vía click/tap
 */

export type ExpandingProjectCard = {
  id: string;
  title: string;
  spec: string;
  body: string;
  label: string;
};

type Props = {
  items: ExpandingProjectCard[];
  defaultActiveIndex?: number;
};

export function ExpandingProjectsCards({ items, defaultActiveIndex = 0 }: Props) {
  const [active, setActive] = useState(defaultActiveIndex);

  return (
    <div className="w-full overflow-hidden">
      {/* Desktop: fila horizontal con expansión sobre hover */}
      <div className="hidden md:flex w-full gap-2 h-[480px]">
        {items.map((item, idx) => {
          const isActive = active === idx;
          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              data-active={isActive}
              onMouseEnter={() => setActive(idx)}
              onFocus={() => setActive(idx)}
              className="relative cursor-pointer overflow-hidden transition-[flex-grow] duration-700 ease-out outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ink)] focus-visible:ring-offset-2"
              style={{
                flexGrow: isActive ? 6 : 1,
                flexBasis: 0,
                minWidth: "72px",
              }}
            >
              <CardContent item={item} index={idx} isActive={isActive} />
            </div>
          );
        })}
      </div>

      {/* Mobile: stack vertical con expansión por tap */}
      <div className="flex md:hidden flex-col gap-2">
        {items.map((item, idx) => {
          const isActive = active === idx;
          return (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              data-active={isActive}
              onClick={() => setActive(idx)}
              className="relative cursor-pointer overflow-hidden transition-[height] duration-700 ease-out outline-none"
              style={{ height: isActive ? 380 : 88 }}
            >
              <CardContent item={item} index={idx} isActive={isActive} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CardContent({
  item,
  index,
  isActive,
}: {
  item: ExpandingProjectCard;
  index: number;
  isActive: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <>
      {/* Background: placeholder editorial con grilla */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--color-paper-2)]"
      >
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,9,10,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(8,9,10,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Overlay oscuro que se quita al expandir (deja ver el placeholder claro) */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-colors duration-700 ease-out ${
          isActive
            ? "bg-[var(--color-ink)]/15"
            : "bg-[var(--color-ink)]/75"
        }`}
      />

      {/* Contenido */}
      <article className="absolute inset-0 flex flex-col justify-between p-5 md:p-7">
        {/* Top row: número grande italic */}
        <div className="flex items-start justify-between gap-4">
          <span
            className={`font-serif-italic leading-none transition-colors duration-700 ease-out ${
              isActive ? "text-[var(--color-ink)]/80" : "text-[var(--color-paper)]/90"
            }`}
            style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
          >
            {num}
          </span>
          <span
            className={`eyebrow transition-colors duration-700 ease-out ${
              isActive ? "text-[var(--color-ink)]/50" : "text-[var(--color-paper)]/65"
            }`}
          >
            {item.label}
          </span>
        </div>

        {/* Bottom: título siempre visible. Spec + body solo cuando activo. */}
        <div className="flex flex-col gap-3">
          {/* Título: en colapsado se ve rotado 90° en desktop / horizontal en mobile */}
          <div
            className={`hidden md:block absolute left-7 bottom-7 origin-bottom-left -rotate-90 translate-y-[-1em] eyebrow whitespace-nowrap transition-opacity duration-500 ease-out ${
              isActive
                ? "opacity-0 pointer-events-none"
                : "opacity-90 text-[var(--color-paper)]"
            }`}
          >
            {item.title}
          </div>

          {/* En activo: bloque completo de info */}
          <div
            className={`transition-[opacity,transform] duration-700 ease-out delay-150 ${
              isActive
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <h3
              className="display-s font-semibold text-[var(--color-ink)] mb-2"
              style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}
            >
              {item.title}
            </h3>
            <p className="text-[13px] uppercase tracking-[0.06em] text-[var(--color-ink)]/55 mb-4">
              {item.spec}
            </p>
            <p className="text-[14px] md:text-[15px] leading-[1.55] text-[var(--color-ink)]/75 max-w-[44ch]">
              {item.body}
            </p>
          </div>

          {/* En mobile colapsado: título horizontal abajo */}
          <h3
            className={`md:hidden display-s font-semibold transition-opacity duration-500 ease-out ${
              isActive ? "opacity-0 pointer-events-none absolute" : "text-[var(--color-paper)]"
            }`}
            style={{ fontSize: "18px" }}
          >
            {item.title}
          </h3>
        </div>
      </article>
    </>
  );
}
