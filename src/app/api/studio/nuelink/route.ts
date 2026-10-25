import { cookies } from "next/headers";
import { get, put } from "@vercel/blob";
import { COOKIE, verifySession, sameOrigin } from "@/lib/studio-auth";
const base = "https://app.nuelink.com/api/public/v1";
const configPath = "studio/nuelink-connection.json";
type Connection = { key: string; brandId: string; brandName: string };
async function request(key: string, path: string) {
  const r = await fetch(base + path, {
    headers: { Authorization: `Bearer ${key}`, Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(20000),
  });
  if (!r.ok)
    throw new Error(
      r.status === 401
        ? "Nuelink rejected this API key."
        : r.status === 429
          ? "Nuelink rate limit reached. Try again in a minute."
          : "Nuelink could not complete the request. Check brand access and try again.",
    );
  return r.json();
}
async function connection(): Promise<Connection | null> {
  if (process.env.NUELINK_API_KEY && process.env.NUELINK_BRAND_ID)
    return {
      key: process.env.NUELINK_API_KEY,
      brandId: process.env.NUELINK_BRAND_ID,
      brandName: "Owners Circle",
    };
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  const c = await get(configPath, { access: "private", useCache: false });
  return c?.statusCode === 200 ? new Response(c.stream).json() : null;
}
export async function POST(req: Request) {
  if (!verifySession((await cookies()).get(COOKIE)?.value))
    return Response.json({ error: "Sign in required" }, { status: 401 });
  if (!sameOrigin(req))
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  try {
    const body = await req.json();
    if (
      typeof body.key !== "string" ||
      body.key.length < 10 ||
      body.key.length > 1000 ||
      !/^[0-9]+$/.test(String(body.brandId))
    )
      return Response.json(
        { error: "Enter a valid API key and numeric brand ID." },
        { status: 400 },
      );
    if (!process.env.BLOB_READ_WRITE_TOKEN)
      return Response.json(
        {
          error:
            "Shared storage must be connected before saving Nuelink access.",
        },
        { status: 503 },
      );
    const brands = await request(body.key, "/brands?per_page=100");
    const brand = brands.data?.find(
      (b: { id: number }) => String(b.id) === String(body.brandId),
    );
    if (!brand)
      return Response.json(
        {
          error:
            "That brand was not found among the first 100 accessible brands. Check the ID.",
        },
        { status: 400 },
      );
    if (!/owner.?s?\s*circle/i.test(brand.title))
      return Response.json(
        {
          error:
            "Select the Owners Circle brand so another business’s data is not mixed into this workspace.",
        },
        { status: 400 },
      );
    await put(
      configPath,
      JSON.stringify({
        key: body.key,
        brandId: String(brand.id),
        brandName: brand.title,
      }),
      {
        access: "private",
        allowOverwrite: true,
        addRandomSuffix: false,
        contentType: "application/json",
      },
    );
    return Response.json({ connected: true, brandName: brand.title });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 502 });
  }
}
export async function GET() {
  if (!verifySession((await cookies()).get(COOKIE)?.value))
    return Response.json({ error: "Sign in required" }, { status: 401 });
  try {
    const c = await connection();
    if (!c)
      return Response.json(
        {
          connected: false,
          message:
            "Connect your Owners Circle Nuelink brand to see channel health, delivery issues, and post performance.",
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    const from = new Date(Date.now() - 30 * 86400000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const statuses = ["PUBLISHED", "FAILED", "RETRYING", "SKIPPED", "SENT"];
    const [channels, ...pages] = await Promise.all([
      request(c.key, `/brands/${c.brandId}/channels?per_page=100`),
      ...statuses.map((status) =>
        request(
          c.key,
          `/brands/${c.brandId}/published-posts?status=${status}&per_page=100&published_from=${encodeURIComponent(from)}`,
        ),
      ),
    ]);
    const posts = pages.flatMap((p) => p.data || []);
    return Response.json(
      {
        connected: true,
        brandName: c.brandName,
        asOf: new Date().toISOString(),
        periodStart: from,
        partial:
          pages.some((p) => (p.pagination?.lastPage || 1) > 1) ||
          (channels.pagination?.lastPage || 1) > 1,
        channels: (channels.data || []).map(
          (v: { id: number; name: string; type: string; status: string }) => ({
            id: String(v.id),
            name: v.name,
            platform: v.type,
            status: v.status,
          }),
        ),
        posts: posts.map(
          (p: {
            id: number;
            body: string;
            url: string;
            status: string;
            message: string;
            publishedAt: string;
            channel: { name: string; type: string };
            results: Record<string, number | null>;
          }) => ({
            id: p.id,
            title: p.body?.slice(0, 150) || "Untitled post",
            url: /^https?:\/\//.test(p.url || "") ? p.url : null,
            status: p.status,
            message: p.message,
            at: p.publishedAt,
            channel: p.channel?.name || "Unknown channel",
            platform: p.channel?.type || "",
            results: p.results || {},
          }),
        ),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 502 });
  }
}
