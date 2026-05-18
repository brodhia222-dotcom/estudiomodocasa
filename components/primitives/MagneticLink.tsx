"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type ReactNode, useRef } from "react";

type MagneticLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "ghost" | "inverted";
  external?: boolean;
  strength?: number;
  ariaLabel?: string;
};

const variants = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-paper)] border border-[var(--color-ink)] hover:bg-transparent hover:text-[var(--color-ink)]",
  ghost:
    "bg-transparent text-[var(--color-ink)] border border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]",
  inverted:
    "bg-transparent text-[var(--color-paper)] border border-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]",
};

export function MagneticLink({
  children,
  href,
  className = "",
  variant = "primary",
  external = false,
  strength = 0.25,
  ariaLabel,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label={ariaLabel}
      style={{ x: springX, y: springY }}
      className={`group relative inline-flex items-center gap-3 px-7 py-4 transition-colors duration-500 ease-out text-[14px] tracking-[0.06em] uppercase font-medium ${variants[variant]} ${className}`}
    >
      <span className="relative inline-block">{children}</span>
      <svg
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        className="transition-transform duration-500 ease-out group-hover:translate-x-1.5"
        aria-hidden="true"
      >
        <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </motion.a>
  );
}
