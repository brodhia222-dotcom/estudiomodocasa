import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { whatsappLink } from "@/lib/copy";

export const metadata = { title: "Página no encontrada" };

export default function NoEncontrada() {
  return (
    <main className="flex min-h-[80vh] items-center bg-[var(--color-paper)] text-[var(--color-ink)]">
      <Container>
        <div className="max-w-[720px] py-32">
          <p className="eyebrow">Página no encontrada</p>
          <h1 className="display-l mt-6">Esta página no existe.</h1>
          <p className="body-l mt-5 max-w-[48ch] text-[var(--color-ink)]/70">
            El link puede estar mal escrito o la página ya no está disponible. Desde el inicio podés ver los espacios
            que diseñamos y coordinar una reunión.
          </p>
          <div className="flex flex-wrap gap-4 pt-10">
            <Link
              href="/"
              className="inline-flex items-center border border-[var(--color-ink)] bg-[var(--color-ink)] px-7 py-4 text-[14px] font-medium tracking-[0.06em] text-[var(--color-paper)] uppercase transition-colors duration-500 hover:bg-transparent hover:text-[var(--color-ink)]"
            >
              Volver al inicio
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-[var(--color-ink)]/30 px-7 py-4 text-[14px] font-medium tracking-[0.06em] uppercase transition-colors duration-500 hover:border-[var(--color-ink)]"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
