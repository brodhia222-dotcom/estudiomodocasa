type LogoProps = {
  className?: string;
  inverted?: boolean;
  size?: "s" | "m" | "l";
};

const sizeMap = {
  s: "text-[18px]",
  m: "text-[22px]",
  l: "text-[28px]",
};

export function Logo({ className = "", inverted = false, size = "m" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-baseline gap-[0.18em] leading-none ${
        inverted ? "text-[var(--color-paper)]" : "text-[var(--color-ink)]"
      } ${sizeMap[size]} ${className}`}
      aria-label="ModoCasa estudio"
    >
      <span className="font-medium tracking-[-0.02em]">ModoCasa</span>
      <span className="font-serif-italic text-[0.78em] translate-y-[0.04em]">estudio</span>
    </span>
  );
}
