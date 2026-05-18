import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { Manifiesto } from "@/components/sections/Manifiesto";
import { Arquitectura } from "@/components/sections/Arquitectura";
import { Especialidades } from "@/components/sections/Especialidades";
import { Proyectos } from "@/components/sections/Proyectos";
import { Metodologia } from "@/components/sections/Metodologia";
import { Testimonios } from "@/components/sections/Testimonios";
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
        <Testimonios />
        <FAQ />
        <CTAFinal />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
