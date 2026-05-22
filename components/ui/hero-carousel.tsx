"use client";

import * as React from "react";

/**
 * Carrusel de fondo para el Hero.
 *
 * - Cross-fade entre N fotos cada `intervalMs`.
 * - Cada foto activa corre la animación `kenburns` (zoom 1.0 → 1.08 en 9s)
 *   definida en globals.css. Cuando deja de estar activa, queda congelada
 *   en el estado final por `forwards`; al volver a ser activa, React la
 *   re-monta semánticamente y la animación arranca de cero (gracias a que
 *   la clase se quitó y se vuelve a aplicar).
 * - `prefers-reduced-motion` deshabilita Ken Burns y deja una imagen fija
 *   (la primera), evitando movimiento para quienes lo prefieren.
 * - SSR-safe: el primer paint muestra la foto en index 0 sin esperar
 *   hidratación.
 */

type Props = {
  /** Paths absolutos servidos desde /public, en orden. */
  images: string[];
  /** Cada cuántos ms avanzar al siguiente. Default 4500. */
  intervalMs?: number;
  /** Duración del cross-fade (ms). Default 1200. */
  fadeMs?: number;
  /** Si las imágenes deben renderizarse en blanco y negro. Default false. */
  grayscale?: boolean;
  /** Alt text aplicado a todas las imágenes (debe ser descriptivo del set). */
  alt?: string;
  className?: string;
};

export function HeroCarousel({
  images,
  intervalMs = 4500,
  fadeMs = 1200,
  grayscale = false,
  alt = "",
  className,
}: Props) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden="true">
      {images.map((src, i) => {
        const active = i === index;
        return (
          <div
            key={src}
            className="absolute inset-0 transition-opacity ease-out"
            style={{
              opacity: active ? 1 : 0,
              transitionDuration: `${fadeMs}ms`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className={`h-full w-full object-cover ${
                grayscale ? "grayscale contrast-[1.05]" : ""
              } ${active ? "animate-kenburns" : ""}`}
            />
          </div>
        );
      })}
    </div>
  );
}
