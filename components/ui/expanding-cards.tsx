"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Grid de cards que se expanden al hover/focus.
 *
 * Adaptación del componente de 21st.dev para encajar con la marca B&N de
 * ModoCasa. Sin estado "activo" por default — todas las cards arrancan
 * con el mismo grosor. Al pasar el cursor sobre alguna, esa se expande y
 * el resto colapsa. Al salir del área completa, vuelven al estado parejo.
 */

export type ExpandingCardItem = {
  id: string;
  title: string;
  description: string;
  imgSrc?: string;
  icon: React.ReactNode;
  /** Etiqueta para el placeholder si no hay imagen. */
  placeholderLabel?: string;
};

type ExpandingCardsProps = React.HTMLAttributes<HTMLUListElement> & {
  items: ExpandingCardItem[];
  /** Altura del grid (px) en desktop. Mobile usa el alto natural en stack. */
  desktopHeight?: number;
};

export const ExpandingCards = React.forwardRef<HTMLUListElement, ExpandingCardsProps>(
  ({ className, items, desktopHeight = 520, ...props }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [isDesktop, setIsDesktop] = React.useState(false);

    React.useEffect(() => {
      const onResize = () => setIsDesktop(window.innerWidth >= 768);
      onResize();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    const gridStyle = React.useMemo<React.CSSProperties>(() => {
      // Sin activo: todas las cards iguales (1fr cada una).
      // Con activo: la activa toma 5fr, las demás 1fr.
      const tracks = items
        .map((_, i) =>
          activeIndex === null ? "1fr" : i === activeIndex ? "5fr" : "1fr",
        )
        .join(" ");
      return isDesktop
        ? { gridTemplateColumns: tracks, gridTemplateRows: "1fr" }
        : { gridTemplateRows: tracks, gridTemplateColumns: "1fr" };
    }, [activeIndex, items, isDesktop]);

    return (
      <ul
        ref={ref}
        // Al salir el cursor del área completa volvemos a "ninguno activo"
        onMouseLeave={() => setActiveIndex(null)}
        className={cn(
          "grid w-full gap-2 transition-[grid-template-columns,grid-template-rows] duration-700 ease-out",
          className,
        )}
        style={{
          ...gridStyle,
          height: isDesktop ? desktopHeight : "auto",
          minHeight: isDesktop ? desktopHeight : undefined,
        }}
        {...props}
      >
        {items.map((item, i) => {
          const active = activeIndex === i;
          return (
            <li
              key={item.id}
              data-active={active}
              tabIndex={0}
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "group relative cursor-pointer overflow-hidden",
                "border border-[var(--color-ink)]/15",
                "min-h-[140px] md:min-h-0",
                "md:min-w-[64px]",
                "outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ink)] focus-visible:ring-offset-2",
              )}
            >
              {/* Background: imagen real o placeholder editorial */}
              {item.imgSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05] scale-105 transition-transform duration-700 ease-out group-data-[active=true]:scale-100"
                />
              ) : (
                <PlaceholderBg label={item.placeholderLabel ?? item.title.toUpperCase()} />
              )}

              {/* Overlay oscuro: más fuerte en colapsado, más liviano en activo */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/55 to-[var(--color-ink)]/20 transition-opacity duration-500 ease-out group-data-[active=true]:from-[var(--color-ink)]/85 group-data-[active=true]:via-[var(--color-ink)]/30 group-data-[active=true]:to-transparent" />

              {/* Contenido */}
              <article className="absolute inset-0 flex flex-col justify-end gap-3 p-6 md:p-7">
                {/* Título vertical (rotado 90deg) — solo desktop colapsado */}
                <h3 className="hidden md:block absolute left-7 bottom-7 origin-bottom-left -rotate-90 translate-y-[-1em] eyebrow text-[var(--color-paper)]/90 whitespace-nowrap opacity-100 transition-opacity duration-500 group-data-[active=true]:opacity-0">
                  {item.title}
                </h3>

                {/* Bloque activo: icono + título + descripción */}
                <div className="relative opacity-0 translate-y-2 transition-[opacity,transform] duration-500 ease-out group-data-[active=true]:opacity-100 group-data-[active=true]:translate-y-0">
                  <div className="text-[var(--color-paper)]/85 mb-3">
                    {item.icon}
                  </div>
                  <h3 className="display-s text-[var(--color-paper)] font-medium mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[14px] leading-[1.55] text-[var(--color-paper)]/75 max-w-[42ch]">
                    {item.description}
                  </p>
                </div>

                {/* En mobile siempre se ve el título cuando la card está colapsada
                   (no hay rotación 90° posible). */}
                <h3 className="md:hidden eyebrow text-[var(--color-paper)]/90 transition-opacity duration-500 group-data-[active=true]:opacity-0">
                  {item.title}
                </h3>
              </article>
            </li>
          );
        })}
      </ul>
    );
  },
);
ExpandingCards.displayName = "ExpandingCards";

/** Placeholder de fondo cuando no hay imagen real. Mismo lenguaje que MediaSlot. */
function PlaceholderBg({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[var(--color-paper-2)]"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,9,10,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(8,9,10,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-5 right-5">
        <span className="eyebrow text-[var(--color-ink)]/40">{label}</span>
      </div>
    </div>
  );
}
