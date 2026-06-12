import type { Metadata, Viewport } from "next";
import { interTight, instrumentSerif } from "@/lib/fonts";
import { LenisProvider } from "@/components/LenisProvider";
import { WhatsAppBubble } from "@/components/ui/whatsapp-bubble";
import "./globals.css";

const SITE_URL = "https://modocasa-medicos.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "ModoCasa Estudio · Arquitectura para consultorios médicos en Buenos Aires",
    template: "%s · ModoCasa Estudio",
  },
  description:
    "Estudio de arquitectura con +15 años en interiorismo de alta gama. Diseñamos consultorios médicos y clínicas privadas en CABA que comunican precisión, elevan la experiencia del paciente y consolidan la autoridad profesional.",
  applicationName: "ModoCasa Estudio",
  category: "architecture",
  keywords: [
    "arquitectura consultorios médicos",
    "diseño de consultorios médicos",
    "diseño de clínicas privadas",
    "interiorismo médico",
    "interiorismo de alta gama",
    "arquitectura para médicos",
    "diseño de consultorios CABA",
    "diseño de consultorios Palermo",
    "ModoCasa Estudio",
    "consultorio cirugía plástica",
    "arquitectura para clínicas",
    "diseño de áreas privadas",
    "diseño de salas de espera",
    "diseño wellness médico",
    "estudio modo casa",
  ],
  authors: [{ name: "ModoCasa Estudio", url: SITE_URL }],
  creator: "ModoCasa Estudio",
  publisher: "ModoCasa Estudio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "ModoCasa Estudio",
    title:
      "ModoCasa Estudio · Arquitectura para consultorios médicos en Buenos Aires",
    description:
      "15 años de interiorismo de alta gama trasladados al diseño de consultorios médicos y clínicas privadas en CABA.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ModoCasa Estudio · Arquitectura para consultorios médicos",
    description:
      "Diseño de consultorios médicos y clínicas privadas en CABA. Interiorismo de alta gama, +15 años de trayectoria.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  // Cuando esté el token de Search Console:
  // verification: { google: "TOKEN" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "ModoCasa Estudio",
  alternateName: "ModoCasa",
  description:
    "Estudio de arquitectura e interiorismo especializado en diseño de consultorios médicos y clínicas privadas en Buenos Aires.",
  url: SITE_URL,
  telephone: "+54 11 2241-9804",
  image: `${SITE_URL}/opengraph-image`,
  logo: `${SITE_URL}/opengraph-image`,
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Palermo",
    addressRegion: "CABA",
    addressCountry: "AR",
  },
  areaServed: [
    { "@type": "City", name: "Buenos Aires" },
    { "@type": "Country", name: "Argentina" },
  ],
  serviceType: "Diseño de consultorios médicos y clínicas privadas",
  knowsAbout: [
    "Interiorismo de alta gama",
    "Diseño de consultorios médicos",
    "Diseño de clínicas privadas",
    "Arquitectura para áreas médicas",
    "Diseño de salas de espera",
    "Diseño de áreas terapéuticas y rehabilitación",
  ],
  makesOffer: [
    { "@type": "Offer", name: "Diseño integral de consultorios médicos" },
    { "@type": "Offer", name: "Diseño de clínicas privadas" },
    {
      "@type": "Offer",
      name: "Diseño de áreas terapéuticas y de rehabilitación",
    },
    { "@type": "Offer", name: "Dirección de obra y proyecto ejecutivo" },
  ],
  foundingDate: "2010",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+54-11-2241-9804",
    contactType: "Customer Service",
    areaServed: "AR",
    availableLanguage: ["Spanish"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "ModoCasa Estudio",
  description:
    "Arquitectura para consultorios médicos y clínicas privadas en Buenos Aires.",
  inLanguage: "es-AR",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${interTight.variable} ${instrumentSerif.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <LenisProvider>{children}</LenisProvider>
        <WhatsAppBubble />
      </body>
    </html>
  );
}
