export const copy = {
  brand: {
    name: "ModoCasa",
    subtitle: "estudio",
    full: "ModoCasa estudio",
    tagline: "Arquitectura para consultorios médicos",
  },

  nav: {
    items: [
      { label: "Espacios", href: "#espacios" },
      { label: "Proyecto", href: "#proyecto" },
      { label: "Metodología", href: "#metodologia" },
    ],
    cta: "Coordinar reunión",
  },

  hero: {
    eyebrow: "Estudio de arquitectura · Buenos Aires",
    // El headline se renderiza en 3 segmentos. El segmento `italic` se setea
    // en Times Now Italic (Instrument Serif como fallback) sin cambiar de tamaño.
    headlinePre: "Diseñamos espacios médicos que",
    headlineItalic: "elevan",
    headlinePost: "tu práctica y la experiencia de tus pacientes.",
    lead: "Trasladamos ese estándar al diseño de consultorios y clínicas privadas en CABA.",
    primaryCta: "Coordinar reunión privada",
    microInfo: "30 min · Sin compromiso · Reunión privada",
    image: {
      src: "/images/placeholders/hero-clinic.jpg",
      alt: "Consultorio médico minimalista en blanco y negro, fotografía o video que va detrás del shader.",
      // Label superpuesto al placeholder mientras no haya media real.
      placeholderLabel: "VIDEO O FOTOGRAFÍA · ATMÓSFERA",
    },
  },

  // Título de una sola línea arriba de las 3 tarjetas (jerarquiza los 15 años).
  valuePropsTitle: "15 años de experiencia en interiorismo de alta gama",

  // 3 bloques tipográficos con foto de fondo. La tarjeta 02 se reformuló:
  // la agencia pidió no afirmar "excelencia médica" (no la garantiza el
  // estudio) y hablar de la experiencia del equipo y la circulación.
  valueProps: [
    {
      number: "01",
      title: "Centrado en el paciente",
      body: "Espacios pensados desde la experiencia del paciente: confort, privacidad y bienestar en cada decisión proyectual.",
      imgSrc: "/images/valueprops/01-paciente.png",
    },
    {
      number: "02",
      title: "Precisión y profesionalismo",
      body: "Organizamos circulaciones y recorridos entre profesionales y pacientes. Cada decisión proyectual refleja el estándar de tu práctica.",
      imgSrc: "/images/chinski/chinski-0997.jpg",
    },
    {
      number: "03",
      title: "Confianza inmediata",
      body: "Ambientes que transmiten cuidado desde la primera consulta, antes del diagnóstico.",
      imgSrc: "/images/valueprops/03-confianza.png",
    },
  ],

  // Fusión de Manifiesto (Quiénes somos) + Arquitectura (Filosofía) en una
  // sola sección visual. Pull quote masivo + contador animado + keywords
  // como pills sutiles + intro corta. Reduce dos secciones de texto a una.
  filosofia: {
    eyebrow: "Quiénes somos · Filosofía",
    intro:
      "Quince años proyectando interiorismo de alta gama, trasladados al diseño de espacios médicos. Reconfiguramos consultorios y clínicas con intención.",
    figure: "15",
    figureLabel: "Años de trayectoria en interiorismo de alta gama trasladados al ámbito médico.",
    quote: "Cada entorno de salud que proyectamos promueve bienestar, funcionalidad y cuidado.",
    keywords: [
      "Confort",
      "Privacidad",
      "Interacción fluida",
      "Sustentabilidad",
      "Identidad",
      "Calidez",
    ],
  },

  // Tipologías de espacio que componen una práctica médica. Categorías
  // definidas con la agencia: Recepción, Sala de Espera, Wellness, Áreas
  // Privadas. Cada tarjeta despliega una galería al hacer clic.
  // Las imágenes son placeholders (fotos reales de Chinski + obras del
  // estudio) hasta que Florentina envíe la selección de renders por
  // categoría. Reemplazar los arrays `gallery` cuando lleguen.
  espacios: {
    eyebrow: "Espacios que diseñamos",
    headline: "El espacio define la experiencia.",
    sub: "Cada tipología que compone la práctica médica privada está pensada en función del paciente, del profesional y del equipo. Pasá el cursor sobre cada espacio para ver la galería.",
    categories: [
      {
        id: "recepcion",
        title: "Recepción",
        cover: "/images/espacios/recepcion-01.png",
        // 1 foto real; las otras 3 celdas quedan como placeholder.
        gallery: [
          { src: "/images/espacios/recepcion-01.png", alt: "Hall de acceso con luminaria escultórica" },
        ],
      },
      {
        id: "sala-espera",
        title: "Sala de Espera",
        cover: "/images/espacios/sala-espera-01.png",
        gallery: [
          { src: "/images/espacios/sala-espera-01.png", alt: "Sala de espera con sofá curvo y parasoles de madera" },
          { src: "/images/espacios/sala-espera-02.png", alt: "Sala de espera con vegetación y sofá curvo" },
          { src: "/images/espacios/sala-espera-03.jpg", alt: "Sala de espera con sofá blanco y poufs" },
          { src: "/images/espacios/sala-espera-04.png", alt: "Cabinas privadas con divisorios vidriados" },
        ],
      },
      {
        id: "wellness",
        title: "Wellness",
        cover: "/images/espacios/wellness-01.png",
        // 3 fotos reales; la 4ta celda queda como placeholder.
        gallery: [
          { src: "/images/espacios/wellness-01.png", alt: "Gimnasio con equipamiento y espejos" },
          { src: "/images/espacios/wellness-02.png", alt: "Sala de masajes con camillas" },
          { src: "/images/espacios/wellness-03.png", alt: "Kitchenette con muebles de madera" },
        ],
      },
      {
        id: "areas-privadas",
        title: "Áreas Privadas",
        cover: "/images/espacios/areas-01.png",
        gallery: [
          { src: "/images/espacios/areas-01.png", alt: "Sala de reuniones con mesa y estación de café" },
          { src: "/images/espacios/areas-02.png", alt: "Oficina privada con mesa de trabajo" },
          { src: "/images/espacios/areas-03.jpg", alt: "Consultorio panorámico con sillón y parasoles" },
          { src: "/images/espacios/areas-04.jpg", alt: "Sala de reuniones con mesa redonda" },
        ],
      },
    ],
  },

  metodologia: {
    eyebrow: "Cómo trabajamos",
    headline: "Metodología en seis etapas.",
    sub: "Un proceso ordenado, transparente y diseñado para que el profesional pueda enfocarse en su práctica mientras nosotros nos ocupamos de cada detalle.",
    steps: [
      {
        num: "01",
        title: "Diagnóstico estratégico",
        body: "Analizamos tu especialidad, dinámica de trabajo y perfil de paciente para fundamentar cada decisión proyectual.",
      },
      {
        num: "02",
        title: "Definición de flujos y programa",
        body: "Organizamos circulaciones, áreas técnicas y recorridos. Diferenciamos lo público de lo privado, lo limpio de lo séptico.",
      },
      {
        num: "03",
        title: "Concepto espacial + identidad",
        body: "Traducimos tu posicionamiento profesional en lenguaje arquitectónico: materiales, atmósfera, paleta y mobiliario.",
      },
      {
        num: "04",
        title: "Proyecto ejecutivo especializado",
        body: "Resolución técnica, normativa de habilitación y detalle constructivo. Pliegos, planimetrías y especificaciones.",
      },
      {
        num: "05",
        title: "Ejecución y dirección de obra",
        body: "Control de obra con estándar alto y coherencia total. Coordinamos gremios, tiempos y entregas.",
      },
      {
        num: "06",
        title: "Entrega",
        body: "Un espacio listo para funcionar el primer día, no solo para verse bien en fotos.",
      },
    ],
  },

  testimonios: {
    eyebrow: "Lo que dicen",
    items: [
      {
        quote: "Entendieron que el consultorio es la primera consulta. Mis pacientes lo nombran antes que el diagnóstico.",
        author: "Dr. Mariano L.",
        spec: "Ginecología · CABA",
      },
      {
        quote: "Resolvieron el flujo del quirófano y la recepción con una sensibilidad que no había encontrado en otros estudios.",
        author: "Dra. Florencia V.",
        spec: "Odontología · Recoleta",
      },
      {
        quote: "El proyecto se ejecutó en tiempo, con la habilitación lista. Cero retrabajo. Eso vale tanto como el diseño.",
        author: "Dr. Sebastián R.",
        spec: "Estética · Palermo",
      },
    ],
  },

  // CTA de cierre que reemplaza a la sección de FAQ (eliminada). Se ubica
  // sobre el bookend del logo, enganchando con el formulario de contacto.
  cierre: {
    text: "¿Tenés alguna duda?",
    cta: "Agendar reunión",
  },

  contacto: {
    eyebrow: "Coordinar reunión",
    headline: "Tu espacio define la percepción del paciente.",
    sub: "Conversemos sobre tu proyecto. La primera reunión es privada, sin costo y sin compromiso.",
    form: {
      name: "Nombre",
      email: "Email",
      message: "Contanos brevemente sobre tu proyecto",
      submit: "Enviar",
      sending: "Enviando…",
      success: "Recibimos tu mensaje. Te contactamos a la brevedad para coordinar la reunión.",
      error: "No pudimos enviar el mensaje. Probá de nuevo o escribinos por WhatsApp.",
    },
    whatsapp: {
      label: "Escribir por WhatsApp",
      number: "5491122419804",
      message: "Hola, vi la página de consultorios médicos y me gustaría coordinar una reunión.",
    },
  },

  footer: {
    address: "Buenos Aires · Argentina",
    rights: "Todos los derechos reservados.",
    credit: "Sitio por BrodhIA",
  },
} as const;

export const whatsappLink = (() => {
  const { number, message } = copy.contacto.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
})();
