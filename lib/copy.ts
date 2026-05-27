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
    lead: "15 años de interiorismo de alta gama, aplicados a consultorios y clínicas privadas en CABA.",
    primaryCta: "Coordinar reunión privada",
    microInfo: "30 min · Sin compromiso · Respuesta en 24hs",
    image: {
      src: "/images/placeholders/hero-clinic.jpg",
      alt: "Consultorio médico minimalista en blanco y negro, fotografía o video que va detrás del shader.",
      // Label superpuesto al placeholder mientras no haya media real.
      placeholderLabel: "VIDEO O FOTOGRAFÍA · ATMÓSFERA",
    },
  },

  // Value props compactos. Cada card tiene un micro-ícono SVG line-art
  // que se dibuja al entrar en viewport.
  valueProps: [
    {
      number: "01",
      title: "Centrado en el paciente",
      body: "Espacios pensados desde la experiencia del paciente: confort, privacidad y bienestar en cada decisión proyectual.",
      icon: "patient" as const,
      imgSrc: "/images/valueprops/01-paciente.png",
    },
    {
      number: "02",
      title: "Excelencia médica",
      body: "Cada detalle comunica precisión y profesionalismo. Tu espacio refleja tu estándar.",
      icon: "precision" as const,
      imgSrc: "/images/valueprops/02-excelencia.png",
    },
    {
      number: "03",
      title: "Confianza inmediata",
      body: "Ambientes que transmiten cuidado desde la primera consulta, antes del diagnóstico.",
      icon: "trust" as const,
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

  // Tipologías de espacio que componen una práctica médica. Reemplaza
  // a Especialidades + Proyectos hasta que el cliente tenga más obras
  // médicas reales para mostrar. Las imágenes son obras del estudio
  // (residencial premium) — el caption `origin` deja claro el origen
  // sin pretender que son consultorios.
  espacios: {
    eyebrow: "Espacios que diseñamos",
    headline: "El espacio define la experiencia.",
    sub: "Cada tipología que compone la práctica médica privada está pensada en función del paciente, del profesional y del equipo.",
    items: [
      {
        id: "recepcion",
        title: "Recepción",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        placeholderLabel: "01 · RECEPCIÓN",
        imgSrc: "/images/spaces/recepcion.png",
        origin: "Obra de ModoCasa estudio · CABA",
      },
      {
        id: "sala-espera",
        title: "Sala de espera",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        placeholderLabel: "02 · SALA DE ESPERA",
        imgSrc: "/images/spaces/sala-espera.png",
        origin: "Obra de ModoCasa estudio · CABA",
      },
      {
        id: "privado",
        title: "Privado",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        placeholderLabel: "03 · PRIVADO",
        imgSrc: "/images/spaces/privado.png",
        origin: "Obra de ModoCasa estudio · CABA",
      },
      {
        id: "soporte",
        title: "Reuniones, sanitarios y office",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        placeholderLabel: "04 · ESPACIOS DE SOPORTE",
        imgSrc: "/images/spaces/soporte.png",
        origin: "Obra de ModoCasa estudio · CABA",
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
    // Placeholders genéricos hasta revisión con el cliente.
    items: [
      {
        q: "Pregunta 1",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        q: "Pregunta 2",
        a: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        q: "Pregunta 3",
        a: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      },
      {
        q: "Pregunta 4",
        a: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet.",
      },
      {
        q: "Pregunta 5",
        a: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      },
      {
        q: "Pregunta 6",
        a: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
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
