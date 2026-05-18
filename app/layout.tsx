import type { Metadata, Viewport } from "next";
import { interTight, instrumentSerif } from "@/lib/fonts";
import { LenisProvider } from "@/components/LenisProvider";
import { WhatsAppBubble } from "@/components/ui/whatsapp-bubble";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://modocasa-medicos.vercel.app"),
  title: {
    default: "ModoCasa Estudio · Arquitectura para consultorios médicos",
    template: "%s · ModoCasa Estudio",
  },
  description:
    "Quince años de interiorismo de alta gama aplicados al diseño de consultorios médicos y clínicas privadas. Espacios que comunican precisión y elevan la experiencia del paciente.",
  keywords: [
    "arquitectura consultorios médicos",
    "diseño de clínicas privadas",
    "interiorismo médico Buenos Aires",
    "ModoCasa Estudio",
    "diseño de consultorios CABA",
  ],
  authors: [{ name: "ModoCasa Estudio" }],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "ModoCasa Estudio",
    title: "ModoCasa Estudio · Arquitectura para consultorios médicos",
    description:
      "Quince años de interiorismo de alta gama aplicados al diseño de consultorios médicos y clínicas privadas.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ModoCasa Estudio · Arquitectura para consultorios médicos",
    description:
      "Quince años de interiorismo de alta gama aplicados al diseño de consultorios médicos y clínicas privadas.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://modocasa-medicos.vercel.app/#organization",
  name: "ModoCasa Estudio",
  description:
    "Estudio de arquitectura e interiorismo especializado en diseño de consultorios médicos y clínicas privadas.",
  url: "https://modocasa-medicos.vercel.app",
  telephone: "+54 11 2241-9804",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
  areaServed: ["Buenos Aires", "Argentina"],
  serviceType: "Diseño de consultorios médicos",
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
        <LenisProvider>{children}</LenisProvider>
        <WhatsAppBubble />
      </body>
    </html>
  );
}
