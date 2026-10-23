import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false, // deja de anunciar con qué está hecho el sitio
  // Encabezados de seguridad que no rompen nada (los mismos del sitio
  // principal). Sin política de contenido (CSP): mal puesta corta la medición
  // (Tag Manager, píxel de Meta). El https obligatorio ya lo manda Vercel.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // No adivinar el tipo de archivo (evita que una imagen se ejecute como script).
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Que nadie meta el sitio dentro de un marco y lo haga pasar por propio.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Al salir del sitio, no contar la dirección completa de dónde venía la persona.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Apagar cámara, micrófono y ubicación: el sitio no los usa.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
