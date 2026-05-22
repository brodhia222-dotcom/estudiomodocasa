import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { Espacios } from "@/components/sections/Espacios";
import { Metodologia } from "@/components/sections/Metodologia";
// Filosofia.tsx y Testimonios.tsx existen fuera del render — pendientes para
// cuando haya contenido real. Especialidades/Proyectos quedaron archivados
// en components/sections/_archived hasta que el cliente tenga más obras
// médicas para mostrar; se reactivan importando desde ahí.
import { FAQ } from "@/components/sections/FAQ";
import { LogoFlourish } from "@/components/sections/LogoFlourish";
import { Contacto } from "@/components/sections/Contacto";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProps />
        <Espacios />
        <Metodologia />
        <FAQ />
        <LogoFlourish />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
