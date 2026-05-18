"use client";

import { motion, type Variants } from "framer-motion";
import { viewportOnce, easeEditorial } from "@/lib/motion";

type ValuePropIconProps = {
  variant: "patient" | "precision" | "trust";
  size?: number;
  className?: string;
};

/**
 * Tres micro-ilustraciones SVG line-art para ValueProps.
 *
 *   patient   → tres círculos concéntricos. El paciente como centro del proyecto.
 *   precision → cruz arquitectónica (compás). Precisión y excelencia técnica.
 *   trust     → punto central + arcos de transmisión. Confianza que se irradia.
 *
 * Cada path se dibuja al entrar en viewport con stroke-dashoffset animado.
 * Stroke 1.5, color currentColor (toma --color-ink del padre), sin fill.
 */

const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.6, ease: easeEditorial, delay },
      opacity: { duration: 0.4, delay },
    },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeEditorial, delay },
  }),
};

export function ValuePropIcon({
  variant,
  size = 80,
  className = "",
}: ValuePropIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {variant === "patient" && <PatientIcon />}
      {variant === "precision" && <PrecisionIcon />}
      {variant === "trust" && <TrustIcon />}
    </motion.svg>
  );
}

/** 3 círculos concéntricos. El más interno aparece primero, luego los exteriores. */
function PatientIcon() {
  return (
    <>
      {/* Punto central (paciente) */}
      <motion.circle
        cx="40"
        cy="40"
        r="3"
        fill="currentColor"
        variants={fadeIn}
        custom={0.1}
      />
      {/* Anillo medio */}
      <motion.circle
        cx="40"
        cy="40"
        r="14"
        variants={drawPath}
        custom={0.25}
      />
      {/* Anillo exterior */}
      <motion.circle
        cx="40"
        cy="40"
        r="28"
        variants={drawPath}
        custom={0.45}
      />
    </>
  );
}

/** Cruz arquitectónica: líneas vertical y horizontal + círculo de pivote central. */
function PrecisionIcon() {
  return (
    <>
      <motion.line
        x1="40"
        y1="10"
        x2="40"
        y2="70"
        variants={drawPath}
        custom={0.1}
      />
      <motion.line
        x1="10"
        y1="40"
        x2="70"
        y2="40"
        variants={drawPath}
        custom={0.25}
      />
      {/* Tickmarks */}
      <motion.line
        x1="34"
        y1="22"
        x2="46"
        y2="22"
        variants={drawPath}
        custom={0.5}
      />
      <motion.line
        x1="34"
        y1="58"
        x2="46"
        y2="58"
        variants={drawPath}
        custom={0.55}
      />
      <motion.line
        x1="22"
        y1="34"
        x2="22"
        y2="46"
        variants={drawPath}
        custom={0.6}
      />
      <motion.line
        x1="58"
        y1="34"
        x2="58"
        y2="46"
        variants={drawPath}
        custom={0.65}
      />
      {/* Pivote central */}
      <motion.circle
        cx="40"
        cy="40"
        r="6"
        variants={drawPath}
        custom={0.75}
      />
    </>
  );
}

/** Punto central + arcos concéntricos a la derecha (señal de transmisión). */
function TrustIcon() {
  return (
    <>
      {/* Punto emisor */}
      <motion.circle
        cx="22"
        cy="40"
        r="3"
        fill="currentColor"
        variants={fadeIn}
        custom={0.1}
      />
      {/* Arco más cercano */}
      <motion.path
        d="M 32 28 A 18 18 0 0 1 32 52"
        variants={drawPath}
        custom={0.25}
      />
      {/* Arco intermedio */}
      <motion.path
        d="M 44 20 A 28 28 0 0 1 44 60"
        variants={drawPath}
        custom={0.45}
      />
      {/* Arco exterior */}
      <motion.path
        d="M 56 12 A 38 38 0 0 1 56 68"
        variants={drawPath}
        custom={0.65}
      />
    </>
  );
}
