import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { Arquitectura } from "@/components/sections/Arquitectura";
import { Especialidades } from "@/components/sections/Especialidades";
import { Proyectos } from "@/components/sections/Proyectos";
import { Metodologia } from "@/components/sections/Metodologia";
// Testimonios oculto en la demo (sin testimonios reales todavía). El componente
// vive en components/sections/Testimonios.tsx — reactivar el import cuando
// haya quotes confirmados por el cliente.
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
        <Manifiesto />
        <Arquitectura />
        <Especialidades />
        <Proyectos />
        <Metodologia />
        {/* Testimonios oculto para la demo — reactivar cuando haya quotes reales */}
        <FAQ />
        <CTAFinal />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
