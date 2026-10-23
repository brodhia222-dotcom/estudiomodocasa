"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import { GTM_ID, META_PIXEL_ID, enSitioReal } from "@/lib/analytics";

// Solo en el dominio real y con personas: los links de prueba de Vercel,
// localhost y los navegadores automáticos (el control de calidad, robots) no
// tienen que sumar visitas ni conversiones a las campañas.
const seMide = () => enSitioReal() && !navigator.webdriver;
const noSuscribir = () => () => {};
const enServidor = () => false;

// La función `fbq` tal como la define el código base de Meta: mientras su
// librería no cargó, guarda las llamadas en una cola.
type FbqCola = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: FbqCola;
  loaded: boolean;
  version: string;
};

/**
 * Píxel de Meta con el código estándar (init + PageView). De ahí en más la
 * librería de Meta registra sola cada cambio de página (escucha el historial
 * del navegador), así que no hay que avisarle en cada navegación: hacerlo
 * contaría cada página dos veces.
 */
function encenderMeta(): void {
  if (window.__mcMetaListo) return;
  window.__mcMetaListo = true;
  const w = window as Window & { _fbq?: unknown };
  if (!w.fbq) {
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue.push(args);
    } as FbqCola;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    w.fbq = n;
    if (!w._fbq) w._fbq = n;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
  }
  window.fbq?.("init", META_PIXEL_ID);
  window.fbq?.("track", "PageView");
}

/** Tag Manager y píxel de Meta de las campañas (ver lib/analytics.ts). */
export function Analytics() {
  const activo = useSyncExternalStore(noSuscribir, seMide, enServidor);

  useEffect(() => {
    if (!seMide()) return;
    // Arranque estándar del Tag Manager, una sola vez por ventana.
    if (!window.__mcGtmIniciado) {
      window.__mcGtmIniciado = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    }
    encenderMeta();
  }, []);

  if (!activo) return null;
  return <Script id="gtm" src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />;
}
