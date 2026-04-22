import { NextResponse, type NextRequest } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { getResend } from "@/lib/resend";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

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

  try {
    const result = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });
    if (result.error) {
      console.error("[newsletter] resend error", result.error);
      return NextResponse.json({ error: "generic" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, subscribed: true });
  } catch (err) {
    console.error("[newsletter] exception", err);
    return NextResponse.json({ error: "generic" }, { status: 502 });
  }
}
