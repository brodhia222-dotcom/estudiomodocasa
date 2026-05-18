"use client";

import { useState } from "react";

type MediaSlotProps = {
  src?: string;
  alt: string;
  /**
   * Aspect ratio del slot (ej. "3/4", "4/3", "16/10"). Si se omite, el
   * MediaSlot se comporta como `position: absolute; inset: 0` y llena al
   * contenedor padre — útil para usarlo como fondo full-bleed.
   */
  aspect?: string;
  number?: string;
  /**
   * Label superpuesto en la esquina superior derecha del placeholder.
   * Default "VISUAL DE REFERENCIA" sólo cuando `mode="placeholder"`.
   */
  placeholderLabel?: string;
  className?: string;
  /** En grayscale por defecto: la estética B&N del manual nunca pide color. */
  color?: boolean;
  /**
   * - `"image"` (default): intenta cargar `src`; cae al placeholder limpio
   *   si la imagen falla o no se provee.
   * - `"placeholder"`: salta el intento de carga y va directo al estado
   *   placeholder con número grande + label. Sin requests HTTP, sin flash.
   *   Pensado para demos donde queda explícito que el visual está pendiente.
   */
  mode?: "image" | "placeholder";
};

/**
 * Slot de imagen con placeholder editorial.
 *
 * Modo `image` (default):
 *   El `<img>` arranca con visibility:hidden hasta onLoad. Si falla, queda
 *   visible el placeholder limpio sin ícono "broken" ni alt text.
 *
 * Modo `placeholder`:
 *   Nunca intenta cargar la imagen. Renderiza el slot completo de placeholder
 *   con número grande en Times Now Italic (esquina inferior izquierda) y
 *   label en text-xs uppercase (esquina superior derecha).
 */
export function MediaSlot({
  src,
  alt,
  aspect,
  number,
  placeholderLabel,
  className = "",
  color = false,
  mode = "image",
}: MediaSlotProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const isPlaceholderMode = mode === "placeholder";
  const showImage = !isPlaceholderMode && Boolean(src) && loaded && !errored;

  // En modo placeholder, el label cae a un default editorial si no se pasa.
  const labelText = isPlaceholderMode
    ? (placeholderLabel ?? "VISUAL DE REFERENCIA")
    : placeholderLabel;

  const hasOverlay = Boolean(number) || Boolean(labelText);

  const fill = !aspect;

  return (
    <div
      className={`overflow-hidden bg-[var(--color-paper-2)] ${
        fill ? "absolute inset-0 w-full h-full" : "relative w-full"
      } ${className}`}
      style={fill ? undefined : { aspectRatio: aspect!.replace("/", " / ") }}
    >
      {/* Placeholder layer (siempre montado). En modo image queda visible si
         la imagen falla. En modo placeholder es el contenido principal. */}
      <div className="absolute inset-0 bg-[var(--color-paper-2)]">
        {/* Grilla 1px sutil */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,9,10,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(8,9,10,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {hasOverlay && (
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 pointer-events-none">
            {/* Top row: label en esquina superior derecha */}
            <div className="flex justify-end">
              {labelText && (
                <span className="eyebrow text-[var(--color-ink)]/50">
                  {labelText}
                </span>
              )}
            </div>

            {/* Bottom row: número grande en serif italic, esquina inferior
               izquierda. Escala con el viewport para verse proporcionado
               tanto en el Hero (col-span-5) como en Proyectos (full-width). */}
            {number && (
              <div className="flex">
                <span
                  className="font-serif-italic leading-none text-[var(--color-ink)]/75"
                  style={{ fontSize: "clamp(64px, 10vw, 160px)" }}
                >
                  {number}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Imagen real. Sólo si NO estamos en modo placeholder. */}
      {!isPlaceholderMode && src && (
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
