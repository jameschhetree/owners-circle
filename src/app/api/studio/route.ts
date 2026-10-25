import { cookies } from "next/headers";
import { COOKIE, verifySession, sameOrigin } from "@/lib/studio-auth";
import { readStudio, writeStudio } from "@/lib/studio-storage";
import { actionSchema, applyAction } from "@/lib/studio";
export const dynamic = "force-dynamic";
export async function GET() {
  if (!verifySession((await cookies()).get(COOKIE)?.value))
    return Response.json({ error: "Sign in required" }, { status: 401 });
  try {
    return Response.json(await readStudio(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json(
      { error: "Shared workspace could not be loaded. Please retry." },
      { status: 503 },
    );
  }
}
export async function POST(request: Request) {
  if (!verifySession((await cookies()).get(COOKIE)?.value))
    return Response.json({ error: "Sign in required" }, { status: 401 });
  if (!sameOrigin(request))
    return Response.json({ error: "Invalid origin" }, { status: 403 });
  try {
    const raw = await request.text();
    if (raw.length > 50000)
      return Response.json({ error: "Record is too large" }, { status: 413 });
    const body = JSON.parse(raw);
    const parsed = actionSchema.safeParse(body.action);
    if (!parsed.success)
      return Response.json(
        { error: parsed.error.issues[0].message },
        { status: 400 },
      );
    const { store, revision } = await readStudio();
    if (body.revision !== revision)
      return Response.json(
        {
          error:
            "Someone else updated the workspace. Refresh, then save again.",
        },
        { status: 409 },
      );
    const next = applyAction(store, parsed.data);
    const newRevision = await writeStudio(next, revision);
    return Response.json({ store: next, revision: newRevision });
  } catch (e) {
    if (String(e).includes("CONFLICT"))
      return Response.json(
        { error: "Workspace changed. Refresh and try again." },
        { status: 409 },
      );
    if (String(e).includes("already exists"))
      return Response.json(
        { error: "That episode number already exists" },
        { status: 400 },
      );
    return Response.json(
      {
        error:
          "Could not save. Your changes have not been saved; please retry.",
      },
      { status: 503 },
    );
  }
}
