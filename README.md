# ModoCasa Estudio — Landing Consultorios Médicos

Landing page de publicidad para la nueva línea de negocio de ModoCasa: arquitectura para consultorios médicos y clínicas privadas. **Demo** sin imágenes reales — los placeholders del módulo de proyectos están listos para ser reemplazados por fotografía propia del estudio.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4**
- **Framer Motion v12** + **Lenis** (smooth scroll)
- **TypeScript**
- **Resend** + **Zod** (formulario de contacto)
- Tipografías: **Inter Tight** + **Instrument Serif Italic** (Google Fonts vía `next/font`)

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completar con la API key de Resend si querés probar el form en vivo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

> Si querés deshabilitar Lenis (para QA o tooling), agregá `?nolenis=1` a la URL.

## Build de producción

```bash
npm run build
npm start
```

## Deploy a Vercel

1. **Push el repo a GitHub** (ver sección abajo).
2. Ir a [vercel.com/new](https://vercel.com/new), importar el repo.
3. Configurar variables de entorno en Project Settings → Environment Variables:
   - `RESEND_API_KEY` — obtener gratis en [resend.com](https://resend.com)
   - `CONTACT_TO_EMAIL` — el email al que querés que lleguen las consultas
   - `CONTACT_FROM_EMAIL` — opcional, default `onboarding@resend.dev`
4. Deploy.

Sin la API key, el endpoint del form igual responde `{ ok: true, devMode: true }` para que la UI funcione, pero no se envían emails.

## Tipografías

Las fuentes "oficiales" del manual de marca son **Acumin Variable** (sans) y **Times Now Semi Light** (serif italic). Ambas son comerciales (Adobe Fonts). Para esta demo usamos las equivalentes gratuitas más cercanas:

| Rol manual | Fuente final (manual) | Stand-in usado (Google Fonts) |
|---|---|---|
| Sans | Acumin Variable Medium/Regular | Inter Tight 400/500 |
| Serif italic | Times Now Semi Light Italic | Instrument Serif Italic |

Para entrega final, reemplazar `lib/fonts.ts` por `next/font/local` cargando los archivos `.woff2` licenciados.

## Estructura

```
app/
  globals.css            ← tokens (paleta B&N, escala tipográfica, hairlines)
  layout.tsx             ← fuentes, metadata SEO, JSON-LD, LenisProvider
  page.tsx               ← ensambla las 12 secciones
  opengraph-image.tsx    ← OG image dinámica (1200×630)
  robots.ts              ← noindex hasta aprobación del cliente
  api/contact/route.ts   ← endpoint del form (Resend + Zod + honeypot + rate limit)

components/
  LenisProvider.tsx      ← smooth scroll global
  primitives/            ← Container, Section, Eyebrow, Hairline, Reveal, MagneticLink, WipeWords, NumberMarker, Logo
  sections/              ← Navbar, Hero, Triple, Manifiesto, Arquitectura, Especialidades, Proyectos, Metodologia, Testimonios, FAQ, Contacto, Footer

lib/
  fonts.ts               ← next/font config
  motion.ts              ← variants tipados (: Variants)
  copy.ts                ← TODO el copy de la página en un solo archivo editable
```

## Decisiones de diseño

- **Editorial Swiss serio** — referencias Pentagram, Made Thought, Manuel Aires Mateus.
- **Tipografía protagónica, fotografía pendiente** — la página vive de la tipografía masthead. Los placeholders de proyectos son intencionalmente austeros (grid sutil + caption).
- **Animaciones cinematográficas pero contenidas** — wipe reveals, parallax de hero, magnetic CTAs, hairlines que se dibujan. Todo respeta `prefers-reduced-motion`.
- **B&N estricto** — fondo `#FFFFFF` y tinta `#08090A` del manual, una sola variación `#F4F4F2` para bandas de sección.
- **Mobile-first** — testeado a 390px. Las animaciones más costosas (magnetic, parallax) están limitadas a desktop con `hover:` queries.

## Próximos pasos para el cliente

- Reemplazar placeholders por fotografía real de proyectos médicos.
- Confirmar copy de FAQ y testimoniales (los actuales son demostrativos).
- Cargar fuentes licenciadas (Acumin Variable + Times Now) cuando estén disponibles.
- Cuando se valide la estética, sacar el `noindex` de `robots.ts` y agregar Google Analytics / Meta Pixel para tracking de campañas.

---

Sitio diseñado y desarrollado por **BrodhIA**.
