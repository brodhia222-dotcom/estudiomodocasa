import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2, "Ingresá tu nombre completo."),
  phone: z.string().min(6, "Ingresá un teléfono válido."),
  email: z.string().email("Email inválido."),
  location: z.string().min(2, "Ingresá tu ubicación."),
  website: z.string().max(0).optional().or(z.literal("")),
});

// Rate limit en memoria — suficiente para una landing demo
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count++;
  if (entry.count > MAX_PER_WINDOW) return true;
  return false;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anon";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, errors: { message: "Demasiados intentos. Probá en un minuto." } },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0]?.toString() ?? "form";
        errors[k] = issue.message;
      }
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Honeypot: si tiene contenido, simulamos éxito sin mandar nada
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const { name, phone, email, location } = parsed.data;
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL || "ModoCasa Landing <onboarding@resend.dev>";

    if (!apiKey || !to) {
      console.warn("[contact] Resend no configurado. Datos recibidos:", { name, phone, email, location });
      // En demo sin API key, devolvemos éxito para no romper la UX
      return NextResponse.json({ ok: true, devMode: true });
    }

    const resend = new Resend(apiKey);
    // CONTACT_TO_EMAIL admite lista separada por comas — el mismo lead
    // llega en paralelo a las casillas configuradas.
    const toList = to.split(",").map((s) => s.trim()).filter(Boolean);
    const { error } = await resend.emails.send({
      from,
      to: toList,
      replyTo: email,
      subject: `Nueva consulta — ${name}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; padding: 24px; color: #08090a;">
          <h2 style="margin: 0 0 16px; font-weight: 500;">Nueva consulta desde la landing de consultorios médicos</h2>
          <hr style="border: 0; border-top: 1px solid #08090a; margin: 16px 0;" />
          <p style="margin: 0 0 8px;"><strong>Nombre y Apellido:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 0 0 8px;"><strong>Teléfono:</strong> <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></p>
          <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p style="margin: 0 0 8px;"><strong>Ubicación:</strong> ${escapeHtml(location)}</p>
        </div>
      `,
      text: `Nueva consulta — ${name}\n\nTeléfono: ${phone}\nEmail: ${email}\nUbicación: ${location}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    // Best-effort: persistir el lead en la Google Sheet vía Apps Script.
    // Si Sheets falla (timeout, error, etc.) el mail ya se mandó — no
    // rompemos la respuesta al usuario.
    const sheetWebhook = process.env.SHEET_WEBHOOK_URL;
    if (sheetWebhook) {
      try {
        await fetch(sheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, email, location }),
          signal: AbortSignal.timeout(8000),
        });
      } catch (sheetErr) {
        console.error("[contact] Sheet webhook error:", sheetErr);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
