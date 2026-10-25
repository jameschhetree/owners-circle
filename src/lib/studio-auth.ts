import { createHmac, timingSafeEqual } from "node:crypto";
export const COOKIE = "oc-dash-auth";
function sign(value: string) {
  const secret = process.env.DASHBOARD_PASSWORD;
  if (!secret) throw new Error("Dashboard sign-in is not configured");
  return createHmac("sha256", secret)
    .update("owners-circle-session:" + value)
    .digest("hex");
}
export function issueSession() {
  const value = String(Date.now() + 7 * 86400000);
  return value + "." + sign(value);
}
export function verifySession(token?: string) {
  try {
    if (!token) return false;
    const [expiry, signature] = token.split(".");
    if (!/^\d+$/.test(expiry) || Number(expiry) < Date.now() || !signature)
      return false;
    const expected = Buffer.from(sign(expiry));
    const actual = Buffer.from(signature);
    return (
      expected.length === actual.length && timingSafeEqual(expected, actual)
    );
  } catch {
    return false;
  }
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}
