import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import { COOKIE, issueSession, sameOrigin } from "@/lib/studio-auth";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  try {
    const { password } = await request.json();
    const configured = process.env.DASHBOARD_PASSWORD;
    if (!configured)
      return Response.json(
        { error: "Dashboard sign-in is not configured" },
        { status: 503 },
      );
    const a = Buffer.from(String(password || ""));
    const b = Buffer.from(configured);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      await new Promise((r) => setTimeout(r, 1000));
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }
    (await cookies()).set(COOKIE, issueSession(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 604800,
    });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Unable to sign in" }, { status: 400 });
  }
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  (await cookies()).delete(COOKIE);
  return Response.json({ success: true });
}
