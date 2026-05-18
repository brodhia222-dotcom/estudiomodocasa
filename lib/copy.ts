export const copy = {
  brand: {
    name: "ModoCasa",
    subtitle: "estudio",
    full: "ModoCasa estudio",
    tagline: "Arquitectura para consultorios médicos",
  },

  nav: {
    items: [
      { label: "Filosofía", href: "#filosofia" },
      { label: "Especialidades", href: "#especialidades" },
      { label: "Metodología", href: "#metodologia" },
      { label: "Proyectos", href: "#proyectos" },
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
    lead: "Quince años de interiorismo de alta gama, aplicados a consultorios y clínicas privadas en CABA.",
    primaryCta: "Coordinar reunión privada",
    microInfo: "30 min · Sin compromiso · Respuesta en 24hs",
    image: {
      src: "/images/placeholders/hero-clinic.jpg",
      alt: "Consultorio médico minimalista en blanco y negro, fotografía o video que va detrás del shader.",
      // Label superpuesto al placeholder mientras no haya media real.
      placeholderLabel: "VIDEO O FOTOGRAFÍA · ATMÓSFERA",
    },
  },

  // Value props compactos (Fase 3 del refactor). Reemplazan el bloque triple
  // gigante anterior. Tres ideas distintas — no repetir "confianza" tres veces.
  valueProps: [
    {
      number: "01",
      title: "Centrado en el paciente",
      body: "Espacios pensados desde la experiencia del paciente: confort, privacidad y bienestar en cada decisión proyectual.",
    },
    {
      number: "02",
      title: "Excelencia médica",
      body: "Cada detalle comunica precisión y profesionalismo. Tu espacio refleja tu estándar.",
    },
    {
      number: "03",
      title: "Confianza inmediata",
      body: "Ambientes que transmiten cuidado desde la primera consulta, antes del diagnóstico.",
    },
  ],

  manifiesto: {
    eyebrow: "Quiénes somos",
    body: "Llevamos quince años proyectando interiorismo de alta gama. Trasladamos esa misma exigencia a entornos médicos: consultorios y clínicas que reflejan el estándar de excelencia del profesional, inspiran confianza en el paciente y reducen la ansiedad asociada a la consulta.",
    figure: "15",
    figureLabel: "Años de trayectoria en interiorismo de alta gama trasladados al ámbito médico.",
  },

  arquitectura: {
    eyebrow: "Filosofía",
    headline: "Diseño de arquitectura interior.",
    body: "Reconfiguramos los espacios con intención: optimizamos la planificación y la circulación para crear consultorios y clínicas más funcionales, intuitivos y coherentes con la identidad del profesional.",
    quote: "Cada entorno de salud que proyectamos promueve bienestar, funcionalidad y cuidado.",
    body2: "Priorizamos espacios cálidos, eficientes y centrados en el paciente, que potencian la productividad del equipo y elevan la experiencia de atención. Confort, privacidad, interacción fluida y sustentabilidad.",
  },

  especialidades: {
    eyebrow: "Para quién diseñamos",
    headline: "Especialidades atendidas.",
    sub: "Trabajamos con profesionales y clínicas privadas que entienden que el espacio es parte del tratamiento.",
    // 4 cards curadas para ExpandingCards. Cada una representa una dimensión
    // distinta del trabajo del estudio (técnico / premium / sensible / escala).
    // Las 8 especialidades anteriores quedan implícitas dentro de estos grupos.
    items: [
      {
        id: "odontologia",
        title: "Odontología",
        description:
          "Quirófano, RX, recepción y áreas estériles. Resolvemos la complejidad técnica del consultorio odontológico sin perder la calidez del espacio.",
        placeholderLabel: "01 · ODONTOLOGÍA",
      },
      {
        id: "estetica",
        title: "Estética & Dermatología",
        description:
          "Cabinas, salas de procedimientos y lounge. Diseñamos espacios premium donde el paciente vive una experiencia de cuidado integral.",
        placeholderLabel: "02 · ESTÉTICA & DERMATOLOGÍA",
      },
      {
        id: "salud-mental",
        title: "Salud mental",
        description:
          "Consultorio acústicamente aislado, privacidad visual y atmósfera que reduce la ansiedad. Cada decisión proyectual sostiene el vínculo terapéutico.",
        placeholderLabel: "03 · SALUD MENTAL",
      },
      {
        id: "clinicas",
        title: "Clínicas multidisciplinarias",
        description:
          "Ginecología, oftalmología, pediatría, kinesiología y más bajo un mismo techo. Resolvemos circulaciones, áreas comunes y core técnico a escala.",
        placeholderLabel: "04 · CLÍNICAS MULTIDISCIPLINARIAS",
      },
    ],
  },

  proyectos: {
    eyebrow: "Obras seleccionadas",
    headline: "Proyectos destacados.",
    sub: "Una selección curada de espacios donde la arquitectura sostiene la práctica médica.",
    // 3 proyectos en grid asimétrico 1+2 (Fase 4 del refactor). El primero
    // ocupa la fila completa (el más reciente, 2024). Aspect uniforme 4:3 según brief.
    items: [
      {
        name: "Centro de Estética Almagro",
        spec: "Estética · CABA · 2024",
        image: "/images/placeholders/project-aesthetic-almagro.jpg",
        alt: "Centro de Estética Almagro, fotografía Unsplash usada como placeholder hasta entregar obra real.",
      },
      {
        name: "Consultorio Odontológico Recoleta",
        spec: "Odontología · CABA · 2023",
        image: "/images/placeholders/project-dental-recoleta.jpg",
        alt: "Consultorio Odontológico Recoleta, fotografía Unsplash usada como placeholder.",
      },
      {
        name: "Clínica Ginecológica Palermo",
        spec: "Ginecología · CABA · 2023",
        image: "/images/placeholders/project-ginecology-palermo.jpg",
        alt: "Clínica Ginecológica Palermo, fotografía Unsplash usada como placeholder.",
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

  faq: {
    eyebrow: "Preguntas frecuentes",
    headline: "Antes de coordinar la reunión.",
    items: [
      {
        q: "¿Cuánto tiempo toma desarrollar un proyecto completo?",
        a: "Entre la etapa de diagnóstico y la entrega final, un consultorio promedio toma entre cuatro y seis meses. Una clínica multidisciplinaria, entre ocho y doce. Definimos cronograma realista en la primera reunión.",
      },
      {
        q: "¿Trabajan con la normativa de habilitación municipal?",
        a: "Sí. Resolvemos el proyecto cumpliendo los requisitos del Ministerio de Salud y de Habilitaciones de cada jurisdicción donde operamos. Coordinamos con tu profesional habilitante o aportamos el nuestro.",
      },
      {
        q: "¿Qué zonas atienden?",
        a: "CABA, Gran Buenos Aires, Pilar, Nordelta, y obras puntuales en el interior cuando el alcance lo justifica. La dirección de obra a distancia se coordina con un capataz local de confianza.",
      },
      {
        q: "¿Cómo es la estructura de honorarios?",
        a: "Propuesta personalizada según superficie, complejidad y alcance. Discriminamos proyecto, dirección de obra y FF&E. Sin sorpresas: el presupuesto se cierra antes de firmar.",
      },
      {
        q: "¿Pueden trabajar sobre un local en propiedad ajena (alquiler)?",
        a: "Sí, y es algo que resolvemos con frecuencia. Diseñamos pensando en la reversión del local al finalizar el contrato si el propietario lo exige.",
      },
      {
        q: "¿Ofrecen llave en mano o solo proyecto?",
        a: "Ambas modalidades. La mayoría de nuestros clientes elige llave en mano por la coherencia entre diseño, materiales y ejecución. También trabajamos solo proyecto + dirección si ya tenés equipo de obra.",
      },
    ],
  },

  // Bookend del Hero antes del form de Contacto. El brief lo pidió como
  // "banner-transición" — calmo, centrado, mismo CTA del hero pero más aire.
  ctaFinal: {
    headline: "Tus espacios definen la percepción del paciente.",
    sub: "Conversemos sobre tu proyecto.",
    primaryCta: "Coordinar reunión privada",
    microInfo: "30 min · Sin compromiso · Respuesta en 24hs",
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
      success: "Recibimos tu mensaje. Te respondemos dentro de las próximas 24 horas hábiles.",
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
