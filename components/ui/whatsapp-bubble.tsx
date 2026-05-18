"use client";

import { useEffect, useState } from "react";

/**
 * Burbuja flotante de WhatsApp con efecto de pulso.
 *
 * Aparece fija en bottom-right de la página después de un scroll mínimo.
 * Dos anillos concéntricos que se expanden con animación CSS infinita.
 * Mantiene paleta B&N — el ícono de WhatsApp es reconocible sin verde.
 *
 * Para la demo el href apunta a wa.me/0 (no funciona) — cuando el cliente
 * confirme el número, basta con cambiar la prop `phone`.
 */

type Props = {
  /** Número en formato internacional sin "+" ni espacios. Default vacío. */
  phone?: string;
  /** Mensaje pre-cargado en WhatsApp. */
  message?: string;
};

export function WhatsAppBubble({
  phone = "",
  message = "Hola, vi la página de consultorios médicos de ModoCasa y me gustaría coordinar una reunión.",
}: Props) {
  const [visible, setVisible] = useState(false);

  // Aparece después de un scroll mínimo (no aparece sobre el hero al cargar)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 transition-[opacity,transform] duration-700 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      {/* Anillos de pulso */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[var(--color-ink)]/30 animate-wa-pulse"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[var(--color-ink)]/20 animate-wa-pulse-2"
      />

      {/* Botón principal */}
      <span className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] shadow-lg transition-transform duration-500 ease-out hover:scale-110">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15h-.01c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.183 8.183 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.16-.46-.27z" />
        </svg>
      </span>
    </a>
  );
}
