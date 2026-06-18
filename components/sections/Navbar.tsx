"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/primitives/Logo";
import { copy } from "@/lib/copy";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Observe which background is behind the navbar (paper / paper-2 / ink)
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section, footer")
    );
    if (sections.length === 0) return;

    function check() {
      const probeY = 40; // ~middle of the navbar
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) {
          const bg = getComputedStyle(el).backgroundColor;
          const m = bg.match(/rgb[a]?\((\d+),\s*(\d+),\s*(\d+)/);
          if (m) {
            const luminance = (Number(m[1]) + Number(m[2]) + Number(m[3])) / 3;
            setOverDark(luminance < 80);
          }
          return;
        }
      }
    }

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // Invertimos a paleta clara cuando el navbar pasa sobre fondo oscuro,
  // sin esperar el scroll. Así el hero (que arranca dark) ya recibe el
  // logo + items en blanco desde el primer paint.
  const isInverted = overDark;
  const ink = "var(--color-ink)";
  const paper = "var(--color-paper)";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out ${
        scrolled
          ? overDark
            ? "bg-[var(--color-ink)]/85 backdrop-blur-md border-b border-[var(--color-paper)]/10"
            : "bg-[var(--color-paper)]/92 backdrop-blur-md border-b border-[var(--color-ink)]/8"
          : "bg-transparent"
      }`}
      style={{ color: isInverted ? paper : ink }}
    >
      <div className="w-full px-[var(--container-pad-x)]">
        <div className="flex items-center justify-between h-[var(--nav-height)]">
                 <a
  href="https://estudiomodocasa.com"
  target="_blank"
  rel="noopener noreferrer"
  className="relative z-10"
  aria-label="Ir al sitio principal de ModoCasa estudio"
>
  <Logo size="m" inverted={isInverted} />
</a>
                                                    ← (línea vacía OK)
          <nav className="hidden md:flex items-center gap-10" aria-label="Principal">


          <nav className="hidden md:flex items-center gap-10" aria-label="Principal">
            {copy.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-[13px] tracking-[0.06em] uppercase font-medium opacity-85 hover:opacity-100 transition-opacity"
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  style={{ backgroundColor: "currentColor" }}
                />
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-[5px] -mr-2"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <span
              className={`block h-px w-6 transition-all duration-300 ${
                open ? "rotate-45 translate-y-[3px]" : ""
              }`}
              style={{ backgroundColor: "currentColor" }}
            />
            <span
              className={`block h-px w-6 transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
              style={{ backgroundColor: "currentColor" }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="md:hidden overflow-hidden"
            style={{
              background: isInverted ? ink : paper,
              borderTop: `1px solid ${isInverted ? "rgba(255,255,255,0.1)" : "rgba(8,9,10,0.08)"}`,
            }}
          >
            <nav className="flex flex-col px-[var(--container-pad-x)] py-8 gap-6" aria-label="Móvil">
              {copy.nav.items.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.65, 0, 0.35, 1] }}
                  className="display-s"
                  style={{ color: isInverted ? paper : ink }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + copy.nav.items.length * 0.06 }}
                className="mt-4 inline-flex items-center gap-3 self-start px-5 py-3 text-[13px] tracking-[0.06em] uppercase font-medium"
                style={{
                  background: isInverted ? paper : ink,
                  color: isInverted ? ink : paper,
                }}
              >
                {copy.nav.cta}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
