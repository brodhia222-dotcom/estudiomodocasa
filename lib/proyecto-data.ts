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
  // Orden = recorrido por el consultorio (entrada → espera → atención →
  // áreas privadas). Selección curada: fotos que muestran espacialidad,
  // sin detalles repetitivos.
  images: [
    { src: "/images/chinski/chinski-0786b.jpg", alt: "Recepción panorámica con mostrador de mármol", category: "Recepción" },
    { src: "/images/chinski/chinski-0774b.jpg", alt: "Recepción frontal con mostrador de mármol", category: "Recepción" },
    { src: "/images/chinski/chinski-0862b.jpg", alt: "Sala de espera con escultura de rostro y sofás", category: "Sala de espera" },
    { src: "/images/chinski/chinski-0909b.jpg", alt: "Sala de espera con poufs y escultura", category: "Sala de espera" },
    { src: "/images/chinski/chinski-0848b.jpg", alt: "Consultorio panorámico con sillón y parasoles", category: "Consultorio" },
    { src: "/images/chinski/chinski-0952b.jpg", alt: "Consultorio con escritorio y sillón", category: "Consultorio" },
    { src: "/images/chinski/chinski-0959.jpg", alt: "Consultorio con escritorio y equipamiento", category: "Consultorio" },
    { src: "/images/chinski/chinski-0985.jpg", alt: "Sala de reuniones con mesa redonda", category: "Áreas privadas" },
    { src: "/images/chinski/chinski-0700.jpg", alt: "Office con muebles de madera", category: "Áreas privadas" },
    { src: "/images/chinski/chinski-0660.jpg", alt: "Área administrativa con estaciones de trabajo", category: "Áreas privadas" },
    { src: "/images/chinski/chinski-1018.jpg", alt: "Pasillo con señalética e iluminación lineal", category: "Áreas privadas" },
  ] satisfies ProjectImage[],
};
