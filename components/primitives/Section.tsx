import { type ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  bg?: "paper" | "paper-2" | "ink";
  py?: "default" | "tight" | "loose" | "none";
};

const paddingMap = {
  default: "py-[var(--section-pad-y)]",
  tight: "py-[clamp(56px,8vw,128px)]",
  loose: "py-[clamp(120px,16vw,240px)]",
  none: "py-0",
};

const bgMap = {
  paper: "bg-[var(--color-paper)] text-[var(--color-ink)]",
  "paper-2": "bg-[var(--color-paper-2)] text-[var(--color-ink)]",
  ink: "bg-[var(--color-ink)] text-[var(--color-paper)]",
};

export function Section({
  id,
  children,
  className = "",
  bg = "paper",
  py = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full ${bgMap[bg]} ${paddingMap[py]} ${className}`}
    >
      {children}
    </section>
  );
}
