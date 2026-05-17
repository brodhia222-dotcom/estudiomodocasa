import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ModoCasa Estudio · Arquitectura para consultorios médicos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090A",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em" }}>
              ModoCasa
            </span>
            <span
              style={{
                fontSize: 26,
                fontStyle: "italic",
                fontFamily: "Georgia, 'Times New Roman', serif",
                opacity: 0.9,
              }}
            >
              estudio
            </span>
          </div>
          <span
            style={{
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.55,
            }}
          >
            Buenos Aires · MMXXV
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span
            style={{
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.55,
            }}
          >
            — Sección 01 / Consultorios médicos
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              lineHeight: 0.98,
              letterSpacing: "-0.04em",
              fontWeight: 500,
            }}
          >
            <span style={{ display: "flex" }}>Arquitectura para</span>
            <span
              style={{
                display: "flex",
                fontStyle: "italic",
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              consultorios médicos.
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <span style={{ fontSize: 18, maxWidth: 720, lineHeight: 1.4, opacity: 0.75 }}>
            Quince años de interiorismo de alta gama trasladados al diseño de espacios médicos.
          </span>
          <span
            style={{
              fontSize: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Coordinar reunión →
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
