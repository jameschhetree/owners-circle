import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * /api/contact — the universal contact endpoint.
 *
 * Every site form (newsletter, apply/waitlist, nominate, sponsor, events,
 * generic contact) funnels through here. Delivery is a single transactional
 * email to jchhetree@gmail.com via Resend, using the free-tier
 * `onboarding@resend.dev` sender (verified destination, no domain DNS
 * required).
 *
 * Contract:
 *   POST  { email: string (required), name?: string, message?: string,
 *           source?: "Newsletter" | "Apply" | "Nominate" | "Contact" | string }
 *
 *   200   { success: true, id: string }                — Resend accepted
 *   400   { success: false, error: "..." }             — validation failed
 *   429   { success: false, error: "rate_limited" }    — >5 req/min/IP
 *   500   { success: false, error: "<resend.message>" } — Resend upstream error
 *
 * The API key is read from process.env.RESEND_API_KEY and is never echoed in
 * any response, log, or error message.
 */

const TO_EMAIL = "jchhetree@gmail.com";
const FROM_EMAIL = "Owner's Circle <onboarding@resend.dev>";

// RFC-ish email regex — pragmatic, not pedantic. Catches the obvious bad
// cases (missing @, missing TLD, spaces) without rejecting valid edge cases.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUBJECT_PREFIX: Record<string, string> = {
  newsletter: "[OC Newsletter]",
  apply: "[OC Apply]",
  waitlist: "[OC Apply]",
  nominate: "[OC Nominate]",
  contact: "[OC Contact]",
};

function subjectPrefixFor(source: string): string {
  const key = source.trim().toLowerCase();
  return SUBJECT_PREFIX[key] ?? "[OC Form]";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// --- In-memory rate limit (5 req/min/IP) -----------------------------------
// Sufficient for a low-volume marketing site on a single Vercel instance.
// Production-grade would use Upstash; this is the right size for now.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const ipHits = new Map<string, number[]>();

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const hits = (ipHits.get(ip) ?? []).filter((t) => t > cutoff);
  if (hits.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: "rate_limited" },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const source = String(body.source ?? "").trim();

  if (!email) {
    return NextResponse.json(
      { success: false, error: "email_required" },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, error: "email_invalid" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY not configured");
    return NextResponse.json(
      { success: false, error: "email_service_unconfigured" },
      { status: 500 }
    );
  }

  const timestamp = new Date().toISOString();
  const referer = request.headers.get("referer") || "";
  const subjectName = name || email;
  const subject = `${subjectPrefixFor(source)} ${subjectName}`;

  const rows: Array<[string, string]> = [
    ["Name", name || "(none)"],
    ["Email", email],
    ["Message", message || "(none)"],
    ["Source", source || "(none)"],
    ["Referer", referer || "(none)"],
    ["IP", ip],
    ["Submitted", timestamp],
  ];

  const text = [
    "New Owner's Circle submission",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const html = `<!doctype html>
<html>
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0a;color:#f5f5f5;margin:0;padding:32px;">
    <div style="max-width:640px;margin:0 auto;background:#141414;border:1px solid #262626;border-radius:12px;padding:32px;">
      <h1 style="margin:0 0 8px 0;font-size:20px;font-weight:600;letter-spacing:-0.01em;">New Owner&apos;s Circle submission</h1>
      <p style="margin:0 0 24px 0;color:#a3a3a3;font-size:14px;">${escapeHtml(source || "Form")} &mdash; ${escapeHtml(subjectName)}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${rows
          .map(
            ([label, value]) => `
            <tr>
              <td style="padding:10px 12px;border-bottom:1px solid #262626;color:#a3a3a3;width:120px;vertical-align:top;">${escapeHtml(label)}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #262626;color:#f5f5f5;white-space:pre-wrap;">${escapeHtml(value)}</td>
            </tr>`
          )
          .join("")}
      </table>
    </div>
  </body>
</html>`;

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (result.error) {
      const errMessage =
        (result.error as { message?: string }).message ??
        JSON.stringify(result.error);
      console.error("[contact] resend error:", result.error);
      return NextResponse.json(
        { success: false, error: errMessage },
        { status: 500 }
      );
    }

    const id = result.data?.id;
    if (!id) {
      console.error("[contact] resend returned no id:", result);
      return NextResponse.json(
        { success: false, error: "resend_no_id" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id });
  } catch (e) {
    const errMessage = e instanceof Error ? e.message : String(e);
    console.error("[contact] resend threw:", errMessage);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
