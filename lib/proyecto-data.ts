export type ProjectImage = {
  src: string;
  alt: string;
  category: string;
};

// NOTA: el nombre real del cliente ("Chinski") se quitó por pedido de la
// agencia (el cliente no autorizó el crédito). `name` y `stats` quedan como
// placeholder hasta que Morena envíe especialización y memoria descriptiva.
// La especialidad es cirugía plástica / rinoplastia.
export const proyectoData = {
  headline: "Nuestro último proyecto",
  name: "Consultorio de cirugía plástica",
  sub: "Reconfiguramos tres unidades independientes en un único consultorio coherente, integrando recepción, áreas de atención y espacios privados con una circulación fluida y materialidad de alta gama.",
  stats: [
    { label: "Especialidad", value: "Cirugía plástica" },
    { label: "Ubicación", value: "CABA, Buenos Aires" },
    { label: "Año", value: "2024" },
    { label: "Superficie", value: "A confirmar" },
  ],
  filters: ["Todo", "Recepción", "Sala de espera", "Consultorio", "Áreas privadas"],
  initialCount: 6,
  // Orden = recorrido por el consultorio (entrada → recepción → espera →
  // atención → áreas privadas). Las 17 fotos del proyecto.
  images: [
    // ── Recepción ──
    { src: "/images/chinski/chinski-0786b.jpg", alt: "Recepción panorámica con mostrador de mármol", category: "Recepción" },
    { src: "/images/chinski/chinski-0754b.jpg", alt: "Recepción con paneles de madera y luminaria lineal", category: "Recepción" },
    // ── Sala de espera ──
    { src: "/images/chinski/chinski-0862b.jpg", alt: "Sala de espera con escultura de rostro y sofás", category: "Sala de espera" },
    { src: "/images/chinski/chinski-0794b.jpg", alt: "Vista panorámica de espera con poufs", category: "Sala de espera" },
    // ── Consultorio ──
    { src: "/images/chinski/chinski-0952b.jpg", alt: "Consultorio con escritorio y sillón", category: "Consultorio" },
    { src: "/images/chinski/chinski-0959.jpg", alt: "Consultorio con escritorio y equipamiento", category: "Consultorio" },
    { src: "/images/chinski/chinski-0997.jpg", alt: "Oficina médica con escritorio y sillas", category: "Consultorio" },
    { src: "/images/chinski/chinski-0831.jpg", alt: "Consultorio con sillón y parasoles de madera", category: "Consultorio" },
    { src: "/images/chinski/chinski-0939.jpg", alt: "Sillón con iluminación cenital", category: "Consultorio" },
    { src: "/images/chinski/chinski-1000.jpg", alt: "Consultorio con equipamiento de diagnóstico", category: "Consultorio" },
    // ── Áreas privadas ──
    { src: "/images/chinski/chinski-0980.jpg", alt: "Sala de reuniones desde la puerta", category: "Áreas privadas" },
    { src: "/images/chinski/chinski-0660.jpg", alt: "Área administrativa con estaciones de trabajo", category: "Áreas privadas" },
    { src: "/images/chinski/chinski-0700.jpg", alt: "Office con muebles de madera", category: "Áreas privadas" },
    { src: "/images/chinski/chinski-0682.jpg", alt: "Paneles de madera y armarios", category: "Áreas privadas" },
    { src: "/images/chinski/chinski-1018.jpg", alt: "Pasillo con señalética e iluminación lineal", category: "Áreas privadas" },
    { src: "/images/chinski/chinski-1008.jpg", alt: "Corredor con puertas de consultorios", category: "Áreas privadas" },
    { src: "/images/chinski/chinski-0624.jpg", alt: "Sanitario accesible con barras de apoyo", category: "Áreas privadas" },
  ] satisfies ProjectImage[],
};
