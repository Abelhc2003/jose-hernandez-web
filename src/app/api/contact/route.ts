import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/validation";
import { getResend } from "@/lib/resend";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const SUBJECT_LABELS: Record<string, string> = {
  presentation: "Presentación",
  interview: "Entrevista",
  work: "Consulta sobre obra",
  other: "Otro",
};

const FROM_ADDRESS = process.env.RESEND_FROM ?? "onboarding@resend.dev";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`contact:${ip}`, {
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const { name, email, subject, message, locale } = parsed.data;

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    console.warn("[contact] CONTACT_EMAIL no configurado; aceptando mensaje sin envío.");
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = getResend();
  if (!resend) {
    console.warn("[contact] RESEND_API_KEY no configurado; aceptando mensaje sin envío.");
    return NextResponse.json({ ok: true, delivered: false });
  }

  const subjectLabel = SUBJECT_LABELS[subject] ?? subject;
  const emailSubject = `[Web JHM] ${subjectLabel} — ${name}`;

  const html = `
    <div style="font-family: Georgia, serif; color: #1a1a1a;">
      <h2 style="margin:0 0 16px; font-family: 'Playfair Display', Georgia, serif;">Nuevo mensaje desde josehernandezmondejar.com</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Asunto:</strong> ${escapeHtml(subjectLabel)}</p>
      <p><strong>Idioma:</strong> ${escapeHtml(locale ?? "es")}</p>
      <hr style="border:0; border-top:1px solid #C9A84C; margin:24px 0;" />
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      replyTo: email,
      subject: emailSubject,
      html,
    });
    if (result.error) {
      console.error("[contact] resend error", result.error);
      return NextResponse.json({ error: "generic" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] exception", err);
    return NextResponse.json({ error: "generic" }, { status: 502 });
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
