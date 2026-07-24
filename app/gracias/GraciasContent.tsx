"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { sendGTMEvent } from "@next/third-parties/google";
import { Container } from "@/components/primitives/Container";
import { easeEditorial } from "@/lib/motion";
import { copy, whatsappLink } from "@/lib/copy";

/**
 * Página de confirmación a la que se llega SOLO después de enviar el
 * formulario con éxito. Al montarse dispara el evento `lead_confirmed`
 * hacia el dataLayer: en GTM ese evento (o el pageview de /gracias) es
 * lo que dispara la conversión de Meta (Lead) y de GA4.
 *
 * Esto reemplaza el disparo anterior que ocurría antes de confirmar que
 * la persona completara los datos, evitando falsos positivos.
 */
export function GraciasContent() {
  // Guard para no disparar dos veces por el doble render de React StrictMode.
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    sendGTMEvent({ event: "lead_confirmed", form_id: "contacto" });
  }, []);

  return (
    <main className="min-h-[100svh] bg-[var(--color-ink)] text-[var(--color-paper)] flex items-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeEditorial }}
          className="max-w-[640px] mx-auto text-center flex flex-col items-center gap-8 py-24"
        >
          {/* Check animado */}
          <div className="w-14 h-14 border border-[var(--color-paper)] rounded-full flex items-center justify-center">
            <motion.svg
              width="24"
              height="18"
              viewBox="0 0 16 12"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: easeEditorial, delay: 0.3 }}
            >
              <motion.path
                d="M1 6L6 10L15 1"
                stroke="var(--color-paper)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: easeEditorial, delay: 0.3 }}
              />
            </motion.svg>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="display-l text-[var(--color-paper)]">
              ¡Gracias!
            </h1>
            <p className="body-l text-[var(--color-paper)]/70 max-w-[480px] mx-auto">
              {copy.contacto.form.success}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-7 py-4 text-[14px] tracking-[0.06em] uppercase font-medium bg-[var(--color-paper)] text-[var(--color-ink)] border border-[var(--color-paper)] hover:bg-transparent hover:text-[var(--color-paper)] transition-colors duration-500 ease-out"
            >
              Volver al inicio
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] tracking-[0.04em] text-[var(--color-paper)]/70 hover:text-[var(--color-paper)] transition-colors"
            >
              {copy.contacto.whatsapp.label} ↗
            </a>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
