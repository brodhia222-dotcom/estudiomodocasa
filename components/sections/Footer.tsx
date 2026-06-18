import { Container } from "@/components/primitives/Container";
import { Logo } from "@/components/primitives/Logo";
import { Hairline } from "@/components/primitives/Hairline";
import { copy } from "@/lib/copy";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--color-paper)] py-16">
      <Container>
        <div className="grid grid-cols-12 gap-x-6 gap-y-12 items-end">
          <div className="col-span-12 md:col-span-4">
            <a
  href="https://estudiomodocasa.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Ir al sitio principal de ModoCasa estudio"
  className="inline-block hover:opacity-70 transition-opacity"
>
  <Logo size="m" />
</a>

            <p className="mt-4 text-[13px] opacity-55 max-w-[280px]">
              {copy.brand.tagline}. {copy.footer.address}.
            </p>
          </div>

          <nav className="col-span-12 md:col-span-5 flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            {copy.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] tracking-[0.04em] hover:opacity-60 transition-opacity"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="col-span-12 md:col-span-3 md:text-right">
            <a
              href="#contacto"
              className="text-[13px] tracking-[0.06em] uppercase font-medium hover:opacity-60 transition-opacity"
            >
              Coordinar reunión →
            </a>
          </div>
        </div>

        <Hairline className="my-10" static />

        <div className="text-[12px] opacity-55">
          <p>
            © {year} {copy.brand.name} estudio. {copy.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
