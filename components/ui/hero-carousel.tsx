"use client";

import * as React from "react";
import Image from "next/image";

/**
 * Carrusel de fondo para el Hero.
 *
 * - Cross-fade entre N fotos cada `intervalMs`.
 * - Cada foto activa corre la animación `kenburns` (zoom 1.0 → 1.08 en 9s)
 *   definida en globals.css. La clase se aplica al div WRAPPER (no al
 *   <Image>), así el transform actúa sobre el contenedor sin que Next
 *   re-renderice la imagen internamente.
 * - `prefers-reduced-motion` deshabilita Ken Burns y deja una imagen fija
 *   (la primera), evitando movimiento para quienes lo prefieren.
 * - SSR-safe: el primer paint muestra la foto en index 0 sin esperar
 *   hidratación.
 * - Usa <Image> de next/image para optimización automática:
 *     · La primera imagen tiene `preload` (Next 16 reemplazó priority
 *       deprecated) → la entrega como AVIF/WebP servida desde el
 *       Image Optimization API, con preload hint en el <head>.
 *     · El resto carga lazy.
 *     · `sizes="100vw"` indica que la imagen ocupa el ancho completo
 *       del viewport para que Next elija la resolución correcta.
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
    <div
      className={`absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {images.map((src, i) => {
        const active = i === index;
        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity ease-out ${
              active ? "animate-kenburns" : ""
            }`}
            style={{
              opacity: active ? 1 : 0,
              transitionDuration: `${fadeMs}ms`,
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              preload={i === 0}
              sizes="100vw"
              quality={85}
              className={`object-cover ${
                grayscale ? "grayscale contrast-[1.05]" : ""
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
