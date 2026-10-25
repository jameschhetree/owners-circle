import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const entry = {
      ...body,
      timestamp: new Date().toISOString(),
    };

    // Persist to Upstash Redis if configured
    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (upstashUrl && upstashToken) {
      // TODO: integrate with Airtable/Supabase/Google Sheets for CRM
      await fetch(`${upstashUrl}/lpush/owners-circle:nominations/${encodeURIComponent(JSON.stringify(entry))}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
      });
    } else {
      console.log("[nominate]", entry);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[nominate] error:", error);
    return NextResponse.json({ success: true });
  }
}
