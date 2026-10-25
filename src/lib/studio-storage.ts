import { get, put } from "@vercel/blob";
import { emptyStudio, type StudioStore } from "./studio";
const path = "studio/workspace-v1.json";
export async function readStudio(): Promise<{
  store: StudioStore;
  revision: string | null;
}> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    if (process.env.NODE_ENV === "production")
      throw new Error("Shared storage is not connected");
    const fs = await import("node:fs/promises");
    try {
      return JSON.parse(await fs.readFile(".studio-dev.json", "utf8"));
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT")
        return { store: emptyStudio(), revision: null };
      throw e;
    }
  }
  const result = await get(path, { access: "private", useCache: false });
  if (!result) return { store: emptyStudio(), revision: null };
  if (result.statusCode !== 200) throw new Error("Could not read workspace");
  return {
    store: await new Response(result.stream).json(),
    revision: result.blob.etag,
  };
}
export async function writeStudio(store: StudioStore, revision: string | null) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    if (process.env.NODE_ENV === "production")
      throw new Error("Shared storage is not connected");
    const fs = await import("node:fs/promises");
    const current = await readStudio();
    if (current.revision !== revision) throw new Error("CONFLICT");
    const next = crypto.randomUUID();
    await fs.writeFile(
      ".studio-dev.json",
      JSON.stringify({ store, revision: next }),
    );
    return next;
  }
  try {
    const result = await put(path, JSON.stringify(store), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: !!revision,
      ...(revision ? { ifMatch: revision } : {}),
    });
    return result.etag;
  } catch (e) {
    if (/precondition|already exists|412/i.test(String(e)))
      throw new Error("CONFLICT");
    throw e;
  }
}
