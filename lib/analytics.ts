/**
 * Medición de la landing. Cada evento va a dos lados:
 *
 * 1. Al dataLayer, de donde lo toma el Tag Manager de la agencia: el mismo
 *    contenedor que usa el sitio principal (estudiomodocasa.com), con los
 *    mismos nombres de eventos, así cada activador sirve para los dos sitios.
 * 2. Al píxel de Meta de las campañas (también el del sitio principal), como
 *    evento estándar: una consulta enviada es un `Lead` y un clic en WhatsApp
 *    es un `Contact`.
 *
 * Los dos se encienden en components/Analytics.tsx, solo en el dominio real y
 * con personas: los links de prueba de Vercel, localhost y los navegadores
 * automáticos (el control de calidad, robots) no suman visitas ni conversiones.
 */
type Params = Record<string, string | number | boolean | undefined>;

/**
 * Tag Manager de la agencia (pedido de Patty, 23/10/2026): el mismo del sitio
 * principal, para tener todo en un solo lugar. Reemplaza a GTM-MZSG5LF7, que
 * tenía un Analytics propio (G-W0QXJ2KP80) y otro píxel de Meta. Va escrito
 * acá y no en una variable de Vercel porque la variable vieja
 * (NEXT_PUBLIC_GTM_ID) todavía apunta al contenedor anterior.
 */
export const GTM_ID = "GTM-WVD2KJPB";

/** Píxel de Meta de las campañas: el mismo del sitio principal. */
export const META_PIXEL_ID = "1396659519203906";

// Evento estándar de Meta que le corresponde a cada evento del sitio, con el
// nombre que se ve en el Administrador de eventos (parámetro content_name).
const META_DESDE_EVENTO: Record<string, [evento: string, nombre: string]> = {
  consulta_enviada: ["Lead", "Formulario de contacto"],
  whatsapp_click: ["Contact", "WhatsApp"],
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    /** El Tag Manager ya arrancó en esta ventana. */
    __mcGtmIniciado?: boolean;
    /** El píxel de Meta ya está encendido en esta ventana. */
    __mcMetaListo?: boolean;
  }
}

/** La landing publicada en su dominio. */
export function enSitioReal(): boolean {
  return typeof window !== "undefined" && window.location.hostname === "salud.estudiomodocasa.com";
}

export function track(event: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  const meta = META_DESDE_EVENTO[event];
  if (meta && window.__mcMetaListo && window.fbq) {
    try {
      window.fbq("trackSingle", META_PIXEL_ID, meta[0], { content_name: meta[1] });
    } catch {
      // La medición nunca tiene que frenar un envío ni un clic.
    }
  }
}

/**
 * Consulta enviada con éxito: el servidor ya la confirmó. Es el evento para
 * la conversión del formulario, igual que en el sitio principal. No se manda
 * `form_submit` a propósito: ese nombre también lo genera sola la etiqueta de
 * Google al apretar Enviar, aunque el envío falle o falten datos.
 */
export function consultaEnviada(): void {
  track("consulta_enviada", { form: "contacto" });
}
