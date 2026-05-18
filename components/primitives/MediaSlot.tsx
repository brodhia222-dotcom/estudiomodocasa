"use client";

import { useState } from "react";

type MediaSlotProps = {
  src?: string;
  alt: string;
  aspect: string; // ej. "3/4", "4/3", "16/10"
  number?: string;
  /**
   * Label opcional superpuesto al placeholder (esquina superior derecha).
   * Por default no se muestra — el placeholder limpio es suficiente.
   */
  placeholderLabel?: string;
  className?: string;
  /** En grayscale por defecto: la estética B&N del manual nunca pide color. */
  color?: boolean;
};

/**
 * Slot de imagen con placeholder elegante de fallback.
 *
 * - El placeholder (#F5F5F5 + grilla 1px + label "IMAGEN PENDIENTE") siempre
 *   está montado debajo.
 * - El `<img>` arranca con `visibility: hidden` y solo se vuelve visible
 *   tras `onLoad`. Si falla la carga, queda oculto para siempre y el
 *   placeholder queda visible — sin ícono "broken" y sin alt text leaking.
 */
export function MediaSlot({
  src,
  alt,
  aspect,
  number,
  placeholderLabel,
  className = "",
  color = false,
}: MediaSlotProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && loaded && !errored;

  return (
    <div
      className={`relative w-full overflow-hidden bg-[var(--color-paper-2)] ${className}`}
      style={{ aspectRatio: aspect.replace("/", " / ") }}
    >
      {/* Placeholder layer (siempre montado, queda visible si la imagen falla) */}
      <div className="absolute inset-0 bg-[var(--color-paper-2)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,9,10,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(8,9,10,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {(number || placeholderLabel) && (
          <div className="absolute inset-0 flex items-start justify-between p-5 pointer-events-none">
            {number && (
              <span className="eyebrow text-[var(--color-ink)]/55">{number}</span>
            )}
            {placeholderLabel && (
              <span className="ml-auto eyebrow text-[var(--color-ink)]/35">
                {placeholderLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Imagen real. Arranca con visibility: hidden hasta onLoad para
         evitar el ícono "broken" y el alt text mientras se intenta cargar. */}
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            color: "transparent",
            fontSize: 0,
            visibility: showImage ? "visible" : "hidden",
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            showImage ? "opacity-100" : "opacity-0"
          } ${color ? "" : "grayscale contrast-[1.05]"}`}
        />
      )}
    </div>
  );
}
