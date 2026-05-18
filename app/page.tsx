import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { Especialidades } from "@/components/sections/Especialidades";
import { Proyectos } from "@/components/sections/Proyectos";
import { Metodologia } from "@/components/sections/Metodologia";
// Filosofia.tsx existe pero está fuera del render — el bloque visual se
// trasladó a Proyectos (que ahora usa el componente expand-cards).
// Testimonios oculto en la demo (sin testimonios reales todavía).
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
