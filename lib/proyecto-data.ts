export type ProjectImage = {
  src: string;
  alt: string;
  category: string;
  size: "wide" | "tall" | "normal";
};

export const proyectoData = {
  headline: "Nuestro último proyecto",
  name: "Consultorio Chinski",
  sub: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  stats: [
    { label: "Especialidad", value: "Lorem ipsum" },
    { label: "Ubicación", value: "Lorem ipsum" },
    { label: "Año", value: "Lorem" },
    { label: "Superficie", value: "Lorem" },
  ],
  filters: ["Todo", "Recepción", "Sala de espera", "Consultorio", "Espacios comunes"],
  initialCount: 6,
  images: [
    // First 6: all "normal" for a clean 2×3 grid without gaps
    { src: "/images/chinski/chinski-0786b.jpg", alt: "Recepción panorámica con mostrador de mármol", category: "Recepción", size: "normal" },
    { src: "/images/chinski/chinski-0909b.jpg", alt: "Detalle de escultura y poufs mostaza", category: "Sala de espera", size: "normal" },
    { src: "/images/chinski/chinski-0848b.jpg", alt: "Consultorio panorámico con sillón y parasoles", category: "Consultorio", size: "normal" },
    { src: "/images/chinski/chinski-0985.jpg", alt: "Sala de reuniones con mesa redonda", category: "Espacios comunes", size: "normal" },
    { src: "/images/chinski/chinski-0862b.jpg", alt: "Sala de espera con escultura de rostro y sofás", category: "Sala de espera", size: "normal" },
    { src: "/images/chinski/chinski-0939.jpg", alt: "Sillón oftalmológico con iluminación cenital", category: "Consultorio", size: "normal" },
    // ── Hidden behind "Mostrar más" — bento variety kicks in ──
    { src: "/images/chinski/chinski-0794b.jpg", alt: "Vista panorámica de espera con poufs", category: "Sala de espera", size: "wide" },
    { src: "/images/chinski/chinski-0831.jpg", alt: "Consultorio con sillón azul y parasoles", category: "Consultorio", size: "normal" },
    { src: "/images/chinski/chinski-0766b.jpg", alt: "Recepción desde ángulo lateral con sofá", category: "Recepción", size: "normal" },
    { src: "/images/chinski/chinski-0914b.jpg", alt: "Detalle lateral de la escultura", category: "Sala de espera", size: "normal" },
    { src: "/images/chinski/chinski-0997.jpg", alt: "Oficina médica con escritorio y sillas", category: "Consultorio", size: "normal" },
    { src: "/images/chinski/chinski-0738b.jpg", alt: "Estación de café y paneles iluminados", category: "Sala de espera", size: "normal" },
    { src: "/images/chinski/chinski-0682.jpg", alt: "Paneles de madera y armarios", category: "Espacios comunes", size: "tall" },
    { src: "/images/chinski/chinski-0820b.jpg", alt: "Detalle del mostrador de mármol", category: "Recepción", size: "normal" },
    { src: "/images/chinski/chinski-0959.jpg", alt: "Consultorio con escritorio y equipamiento", category: "Consultorio", size: "normal" },
    { src: "/images/chinski/chinski-0880b.jpg", alt: "Estación de café y sofás", category: "Sala de espera", size: "normal" },
    { src: "/images/chinski/chinski-1000.jpg", alt: "Consultorio con equipamiento de diagnóstico", category: "Consultorio", size: "normal" },
    { src: "/images/chinski/chinski-0980.jpg", alt: "Sala de reuniones desde la puerta", category: "Espacios comunes", size: "normal" },
    { src: "/images/chinski/chinski-0918.jpg", alt: "Detalle de kitchenette y café", category: "Espacios comunes", size: "normal" },
    { src: "/images/chinski/chinski-1008.jpg", alt: "Corredor con puertas de consultorios", category: "Espacios comunes", size: "normal" },
    { src: "/images/chinski/chinski-0652.jpg", alt: "Pasillo con iluminación y puerta abierta", category: "Espacios comunes", size: "normal" },
    { src: "/images/chinski/chinski-0624.jpg", alt: "Sanitario accesible con barras de apoyo", category: "Espacios comunes", size: "normal" },
    { src: "/images/chinski/chinski-0632.jpg", alt: "Sanitario con espejo retroiluminado", category: "Espacios comunes", size: "normal" },
  ] satisfies ProjectImage[],
};
