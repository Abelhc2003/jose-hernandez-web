import { NextResponse, type NextRequest } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { getResend } from "@/lib/resend";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const FROM =
  process.env.RESEND_FROM ?? "onboarding@resend.dev";

const welcomeHtml = (email: string) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Bienvenido</title>
</head>
<body style="margin:0;padding:0;background:#0D0D0D;font-family:Georgia,serif;color:#F5EFE0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D0D;padding:48px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#161616;border:1px solid rgba(201,168,76,0.2);max-width:560px;width:100%;">

          <!-- Cabecera dorada -->
          <tr>
            <td style="padding:40px 48px 0;text-align:center;">
              <p style="margin:0;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#C9A84C;">
                José Hernández Mondéjar
              </p>
              <div style="margin:20px auto 0;width:50px;height:1px;background:#C9A84C;"></div>
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="padding:40px 48px;">
              <h1 style="margin:0 0 24px;font-size:28px;line-height:1.2;color:#F5EFE0;font-weight:normal;">
                Bienvenido a mis letras
              </h1>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:rgba(245,239,224,0.8);">
                Gracias por suscribirte. A partir de ahora serás el primero en saber
                cuándo llega una nueva obra, un artículo o cualquier novedad literaria.
              </p>
              <p style="margin:0 0 32px;font-size:16px;line-height:1.7;color:rgba(245,239,224,0.8);font-style:italic;">
                "Hay trenes que solo pasan una vez… y estaciones en las que nadie quiere bajar."
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#C9A84C;">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://josehernandezmondejar.com"}/obras"
                       style="display:inline-block;padding:14px 32px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#0D0D0D;text-decoration:none;font-family:system-ui,sans-serif;">
                      Ver todas las obras
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Firma -->
          <tr>
            <td style="padding:0 48px 40px;">
              <div style="width:50px;height:1px;background:rgba(201,168,76,0.3);margin-bottom:24px;"></div>
              <p style="margin:0;font-size:14px;color:rgba(245,239,224,0.5);font-style:italic;">
                José Hernández Mondéjar<br/>
                Escritor · Murcia
              </p>
            </td>
          </tr>

          <!-- Pie legal -->
          <tr>
            <td style="padding:24px 48px;border-top:1px solid rgba(201,168,76,0.1);text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(245,239,224,0.3);font-family:system-ui,sans-serif;line-height:1.6;">
                Recibiste este email porque ${email} se suscribió en josehernandezmondejar.com.<br/>
                Si no fuiste tú, ignora este mensaje.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`newsletter:${ip}`, {
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

  const parsed = newsletterSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const { email } = parsed.data;

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const resend = getResend();

  if (!audienceId || !resend) {
    console.warn(
      "[newsletter] RESEND_AUDIENCE_ID o RESEND_API_KEY no configurados; aceptando suscripción sin registrar.",
    );
    return NextResponse.json({ ok: true, subscribed: false });
  }

  // Guardar contacto en la audiencia
  const result = await resend.contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });

  if (result.error) {
    console.error("[newsletter] resend contacts error", result.error);
    return NextResponse.json({ error: "generic" }, { status: 502 });
  }

  // Enviar email de bienvenida (no bloqueante — si falla no afecta al registro)
  resend.emails.send({
    from: FROM,
    to: email,
    subject: "Bienvenido a las letras de José Hernández Mondéjar",
    html: welcomeHtml(email),
  }).catch((err) => console.error("[newsletter] welcome email error", err));

  return NextResponse.json({ ok: true, subscribed: true });
}
