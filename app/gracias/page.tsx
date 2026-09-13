import type { Metadata } from "next";
import { GraciasContent } from "./GraciasContent";

export const metadata: Metadata = {
  // La marca la agrega el template del layout.
  title: "Gracias",
  description:
    "Recibimos tus datos. Te contactamos a la brevedad para coordinar la reunión.",
  // Página de confirmación: no queremos que se indexe ni que aparezca
  // suelta en búsquedas, solo se llega tras enviar el formulario.
  robots: { index: false, follow: false },
};

export default function GraciasPage() {
  return <GraciasContent />;
}
