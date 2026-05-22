"use client";

import { motion, type Variants } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { viewportOnce, easeEditorial } from "@/lib/motion";

/**
 * Bookend final antes del formulario: logo de ModoCasa estudio
 * sobre un fondo de partículas parpadeantes.
 *
 * Animaciones de entrada en cascada al entrar al viewport:
 *   1. Sparkles fade-in (controlado internamente por el componente).
 *   2. Logo aparece con wipe-up por palabra (cada palabra surge desde
 *      abajo de un container con overflow:hidden, simulando un
 *      "telón" editorial).
 *   3. Hairline se dibuja de izquierda a derecha (scaleX 0 → 1).
 *
 * Todo arranca cuando la sección entra al viewport (no antes), así el
 * usuario ve el reveal en el momento exacto.
 */

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.15 },
  },
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

const eyebrowFade: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 0.55,
    y: 0,
    transition: { duration: 0.7, ease: easeEditorial },
  },
};

export function LogoFlourish() {
  return (
    <section
      aria-label="ModoCasa estudio"
      className="relative w-full bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden h-[clamp(280px,40vh,420px)]"
    >
      {/* ─── Capa 0: sparkles a pantalla completa ─── */}
      <div className="absolute inset-0">
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

      {/* ─── Capa 2: logo centrado con reveals editoriales ─── */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 gap-7"
      >
        {/* Eyebrow chico arriba del logo */}
        <motion.span
          variants={eyebrowFade}
          className="eyebrow text-[var(--color-paper)] tracking-[0.32em]"
        >
          Estudio · Buenos Aires
        </motion.span>

        {/* Logo gigante: wipe-up por palabra */}
        <h2
          className="inline-flex items-baseline gap-[0.18em] leading-none text-center"
          style={{ fontSize: "clamp(44px, 8vw, 120px)" }}
          aria-label="ModoCasa estudio"
        >
          <Word text="ModoCasa" />
          <Word text="estudio" italic />
        </h2>

        {/* Hairline que se dibuja de centro a los costados */}
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
