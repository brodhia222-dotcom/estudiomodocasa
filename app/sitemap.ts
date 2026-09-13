import type { MetadataRoute } from "next";

const SITE_URL = "https://salud.estudiomodocasa.com";

// Las fotos reales de obra van en el sitemap para que Google Imágenes las asocie a la landing
// (búsquedas tipo "diseño de consultorios médicos" muestran muchas imágenes).
const IMAGENES = [
  "/images/chinski/chinski-0786b.jpg",
  "/images/chinski/chinski-0754b.jpg",
  "/images/chinski/chinski-0862b.jpg",
  "/images/chinski/chinski-0794b.jpg",
  "/images/chinski/chinski-0952b.jpg",
  "/images/chinski/chinski-0959.jpg",
  "/images/chinski/chinski-0997.jpg",
  "/images/chinski/chinski-0831.jpg",
  "/images/chinski/chinski-0985.jpg",
  "/images/espacios/recepcion-03.jpg",
  "/images/espacios/sala-espera-01.jpg",
  "/images/espacios/sala-espera-04.jpg",
  "/images/espacios/wellness-01.jpg",
  "/images/espacios/areas-01.jpg",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
      images: IMAGENES.map((ruta) => `${SITE_URL}${ruta}`),
    },
  ];
}
