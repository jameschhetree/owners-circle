import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, firstName } = body;

    const entry = {
      email,
      firstName: firstName || "",
      timestamp: new Date().toISOString(),
    };

    // Persist to Upstash Redis if configured
    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (upstashUrl && upstashToken) {
      await fetch(`${upstashUrl}/lpush/owners-circle:newsletter/${encodeURIComponent(JSON.stringify(entry))}`, {
        headers: { Authorization: `Bearer ${upstashToken}` },
      });
    } else {
      // Graceful fallback: log to console when Upstash is not configured
      console.log("[newsletter]", entry);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[newsletter] error:", error);
    return NextResponse.json({ success: true }); // always return 200 for graceful degradation
  }
}
