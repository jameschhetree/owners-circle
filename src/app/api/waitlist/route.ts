import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Single shared submission endpoint for every CTA on the site.
 *
 * Primary delivery: Resend transactional email to jchhetree@gmail.com using
 * the free-tier `onboarding@resend.dev` sender (allowed because destination
 * is the verified Resend account email — no domain setup needed).
 *
 * Durability: every submission is console-logged and persisted to Upstash
 * (when configured), so a lead is never lost even if Resend errors. The
 * endpoint always returns 200 (graceful degradation, matching the existing
 * newsletter/nominate/sponsor/event-waitlist routes), and surfaces
 * `delivery: "sent" | "failed"` plus the Resend message ID or upstream
 * error in the JSON response.
 */

type Delivery = "sent" | "failed";

const TO_EMAIL = "jchhetree@gmail.com";
const FROM_EMAIL = "Owner's Circle <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function persistUpstash(entry: Record<string, unknown>) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return;
  try {
    await fetch(
      `${url}/lpush/owners-circle:waitlist/${encodeURIComponent(
        JSON.stringify(entry)
      )}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (e) {
    console.error("[waitlist] upstash persist failed:", e);
  }
}

export async function POST(request: Request) {
  let entry: Record<string, unknown> = {};
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const intent = String(body.intent || "Waitlist").trim();
    const message = String(body.message || "").trim();
    const source = String(body.source || "").trim();
    const referer = request.headers.get("referer") || "";
    const timestamp = new Date().toISOString();

    entry = { name, email, intent, message, source, referer, timestamp };
    console.log("[waitlist] submission", entry);

    // Durable record first — a lead is never lost regardless of Resend.
    await persistUpstash(entry);

    const subjectName = name || email || "anonymous";
    const subject = `Owner's Circle — ${intent} — ${subjectName}`;

    const rows: Array<[string, string]> = [
      ["Name", name || "(none)"],
      ["Email", email || "(none)"],
      ["Intent", intent || "(none)"],
      ["Source", source || intent || "(none)"],
      ["Message", message || "(none)"],
      ["Referer", referer || "(none)"],
      ["Submitted", timestamp],
    ];

    const html = `<!doctype html>
<html>
  <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0a;color:#f5f5f5;margin:0;padding:32px;">
    <div style="max-width:640px;margin:0 auto;background:#141414;border:1px solid #262626;border-radius:12px;padding:32px;">
      <h1 style="margin:0 0 8px 0;font-size:20px;font-weight:600;letter-spacing:-0.01em;">New Owner's Circle submission</h1>
      <p style="margin:0 0 24px 0;color:#a3a3a3;font-size:14px;">${escapeHtml(intent)} — ${escapeHtml(subjectName)}</p>
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

    const text = [
      `New Owner's Circle submission`,
      ``,
      ...rows.map(([label, value]) => `${label}: ${value}`),
    ].join("\n");

    let delivery: Delivery = "failed";
    let messageId: string | null = null;
    let upstreamError: string | null = null;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      upstreamError = "RESEND_API_KEY not configured";
      console.error("[waitlist]", upstreamError);
    } else {
      try {
        const resend = new Resend(apiKey);
        const result = await resend.emails.send({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          replyTo: email || undefined,
          subject,
          html,
          text,
        });
        if (result.error) {
          upstreamError =
            (result.error as { message?: string }).message ||
            JSON.stringify(result.error);
          console.error("[waitlist] resend error:", result.error);
        } else if (result.data?.id) {
          delivery = "sent";
          messageId = result.data.id;
        } else {
          upstreamError = "Resend returned no id";
          console.error("[waitlist] resend no id:", result);
        }
      } catch (e) {
        upstreamError = e instanceof Error ? e.message : String(e);
        console.error("[waitlist] resend threw:", e);
      }
    }

    return NextResponse.json({
      success: true,
      delivery,
      messageId,
      upstreamError,
    });
  } catch (error) {
    console.error("[waitlist] error:", error, entry);
    return NextResponse.json({
      success: true,
      delivery: "failed" as Delivery,
      messageId: null,
      upstreamError: error instanceof Error ? error.message : String(error),
    });
  }
}
