"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis con smooth scroll global + interceptación de anchor links.
 *
 * Cuando el usuario hace click en un `<a href="#seccion">` (navbar, CTAs,
 * footer), en lugar de scroll-jump nativo, Lenis anima el scroll con
 * easing editorial y respeta el offset del navbar sticky.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // Allow disabling Lenis for QA / screenshot tooling: ?nolenis=1
    const params = new URLSearchParams(window.location.search);
    if (params.has("nolenis")) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // ─── Anchor click interception ───
    // Cualquier click en <a href="#..."> dispara Lenis.scrollTo en lugar del
    // jump nativo. El offset compensa la altura del navbar sticky leyendo
    // la variable CSS --nav-height del :root (default 72px si falla).
    const getNavHeight = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--nav-height")
        .trim();
      const parsed = parseInt(raw, 10);
      return Number.isFinite(parsed) ? parsed : 72;
    };

    const onClick = (event: MouseEvent) => {
      // Solo clicks "limpios" (sin modificadores / sin botón derecho)
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      // Solo intercepta anchors del mismo documento
      const id = decodeURIComponent(href.slice(1));
      const dest = document.getElementById(id);
      if (!dest) return;

      event.preventDefault();

      // Cierra el menú mobile si está abierto (los <a> ya tienen onClick
      // que setea open=false, pero preventDefault corta el flow). El
      // foco vuelve naturalmente porque scrollTo no roba focus.
      lenis.scrollTo(dest, {
        offset: -(getNavHeight() + 8),
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      // Actualiza el hash sin disparar scroll nativo
      if (window.history.replaceState) {
        window.history.replaceState(null, "", href);
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
