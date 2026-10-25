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
      // TODO: integrate with Luma/Eventbrite for event management
      await fetch(`${upstashUrl}/lpush/owners-circle:event-waitlist/${encodeURIComponent(JSON.stringify(entry))}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
      });
    } else {
      console.log("[event-waitlist]", entry);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[event-waitlist] error:", error);
    return NextResponse.json({ success: true });
  }
}
