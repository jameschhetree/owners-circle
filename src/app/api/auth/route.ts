import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const password = String(body.password || "");

  if (password !== process.env.DASHBOARD_PASSWORD) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("oc-dash-auth", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return Response.json({ success: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("oc-dash-auth");
  return Response.json({ success: true });
}
