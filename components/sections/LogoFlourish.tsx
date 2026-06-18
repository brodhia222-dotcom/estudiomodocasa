"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, type Variants } from "framer-motion";
import { sendGTMEvent } from "@next/third-parties/google";
import { viewportOnce, easeEditorial } from "@/lib/motion";
import { copy, whatsappLink } from "@/lib/copy";

// tsparticles es pesado y esta sección está al final de la página: lo
// cargamos como chunk separado y sólo cuando la sección entra en viewport,
// así no pesa en el bundle ni en la carga inicial.
const SparklesCore = dynamic(
  () => import("@/components/ui/sparkles").then((m) => m.SparklesCore),
  { ssr: false },
);

/**
 * Bookend final antes del formulario. Reemplaza a la sección de FAQ: arriba
 * un CTA de cierre (engancha con el formulario de contacto que está debajo)
 * y debajo el logo de ModoCasa estudio sobre partículas parpadeantes.
 *
 * Reveals en cascada al entrar al viewport: CTA fade-up → logo wipe-up por
 * palabra → hairline. Las sparkles aparecen de fondo.
 */

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeEditorial } },
};

const wipeUp: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 0.95, ease: easeEditorial },
  },
};

const hairlineGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.85, ease: easeEditorial },
  },
};

export function LogoFlourish() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "200px" });

  return (
    <section
      ref={sectionRef}
      aria-label="ModoCasa estudio"
      className="relative w-full bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden py-[clamp(56px,8vw,104px)]"
    >
      {/* ─── Capa 0: sparkles (carga diferida al entrar en viewport) ─── */}
      <div className="absolute inset-0">
        {inView && (
          <SparklesCore
            id="modocasa-sparkles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={90}
            particleColor="#FFFFFF"
            speed={1}
            className="w-full h-full"
          />
        )}
      </div>

      {/* ─── Capa 1: viñeta radial sutil ─── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at center, rgba(8,9,10,0.50) 0%, rgba(8,9,10,0.05) 60%, rgba(8,9,10,0) 100%)",
        }}
      />

      {/* ─── Capa 2: CTA de cierre + logo con reveals editoriales ─── */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 flex flex-col items-center justify-center px-6 gap-7 text-center"
      >
        {/* CTA de cierre: pregunta en grande + botón directo a WhatsApp */}
        <motion.h2
          variants={fadeUp}
          className="font-medium leading-tight tracking-[-0.02em] text-[clamp(34px,6vw,68px)] text-[var(--color-paper)]"
        >
          {copy.cierre.text}
        </motion.h2>

        <motion.a
          variants={fadeUp}
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sendGTMEvent({ event: "whatsapp_click", source: "logo_flourish" })}
          className="group relative inline-flex items-center px-10 py-4 text-[13px] font-medium tracking-[0.08em] uppercase border border-[var(--color-paper)] overflow-hidden text-[var(--color-paper)] transition-colors duration-500 hover:text-[var(--color-ink)]"
        >
          <span className="absolute inset-0 bg-[var(--color-paper)] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
          <span className="relative z-10 flex items-center gap-3">
            {copy.cierre.cta}
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.2" className="transition-transform duration-500 group-hover:translate-x-1">
              <path d="M1 5h12M13 5L9 1M13 5L9 9" />
            </svg>
          </span>
        </motion.a>

        {/* Aire entre CTA y logo */}
        <div className="h-[clamp(16px,3vw,40px)]" aria-hidden="true" />

        {/* Eyebrow chico arriba del logo */}
        <motion.span
          variants={fadeUp}
          className="eyebrow text-[var(--color-paper)]/55 tracking-[0.32em]"
        >
          Estudio · Buenos Aires
        </motion.span>

        {/* Logo gigante: wipe-up por palabra */}
        <h2
          className="inline-flex items-baseline gap-[0.18em] leading-none text-center"
          style={{ fontSize: "clamp(40px, 7vw, 104px)" }}
          aria-label="ModoCasa estudio"
        >
          <Word text="ModoCasa" />
          <Word text="estudio" italic />
        </h2>

        {/* Hairline */}
        <motion.span
          variants={hairlineGrow}
          className="block h-px w-32 bg-[var(--color-paper)]/50 origin-center"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}

function Word({ text, italic = false }: { text: string; italic?: boolean }) {
  return (
    <span
      className="inline-flex overflow-hidden align-baseline"
      aria-hidden="true"
    >
      <motion.span
        variants={wipeUp}
        className={
          italic
            ? "font-serif-italic translate-y-[0.04em] text-[0.78em] inline-block"
            : "font-medium tracking-[-0.025em] inline-block"
        }
      >
        {text}
      </motion.span>
    </span>
  );
}
