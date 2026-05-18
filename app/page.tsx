import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { Filosofia } from "@/components/sections/Filosofia";
import { Especialidades } from "@/components/sections/Especialidades";
import { Proyectos } from "@/components/sections/Proyectos";
import { Metodologia } from "@/components/sections/Metodologia";
// Testimonios oculto en la demo (sin testimonios reales todavía). El componente
// vive en components/sections/Testimonios.tsx — reactivar cuando haya quotes.
// Manifiesto + Arquitectura fusionados en Filosofia.tsx (Fase 10).
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Contacto } from "@/components/sections/Contacto";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <Filosofia />
        <Especialidades />
        <Proyectos />
        <Metodologia />
        <FAQ />
        <CTAFinal />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
