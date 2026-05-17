import { type ReactNode, type ElementType } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  bleed?: boolean;
};

export function Container({
  children,
  as: Tag = "div",
  className = "",
  bleed = false,
}: ContainerProps) {
  return (
    <Tag
      className={`w-full mx-auto ${
        bleed ? "" : "px-[var(--container-pad-x)]"
      } ${className}`}
      style={{ maxWidth: bleed ? "100%" : "var(--container-max)" }}
    >
      {children}
    </Tag>
  );
}
