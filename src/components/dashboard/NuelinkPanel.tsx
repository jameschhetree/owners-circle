"use client";
import { useState, useEffect } from "react";
import { RefreshCw, ExternalLink, AlertCircle, Link2 } from "lucide-react";
type Data = {
  connected: boolean;
  message?: string;
  brandName?: string;
  asOf?: string;
  partial?: boolean;
  channels?: { id: string; name: string; platform: string; status: string }[];
  posts?: {
    id: number;
    title: string;
    url: string | null;
    status: string;
    message: string;
    at: string;
    channel: string;
    platform: string;
    results: Record<string, number | null>;
  }[];
};
export default function NuelinkPanel() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [setup, setSetup] = useState(false);
  const [filter, setFilter] = useState("all");
  async function sync() {
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/studio/nuelink");
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setData(d);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void sync();
  }, []);
  const posts = (data?.posts || []).filter(
    (p) => filter === "all" || p.status !== "PUBLISHED",
  );
  return (
    <>
      <div className="integration-banner">
        <div className="integration-icon">N</div>
        <div>
          <span className="eyebrow">PUBLISHING INTELLIGENCE</span>
          <h2>
            Nuelink{" "}
            <span className={"badge " + (data?.connected ? "published" : "")}>
              {loading && !data
                ? "Checking connection"
                : data?.connected
                  ? "Connected"
                  : "Not connected"}
            </span>
          </h2>
          <p>
            {data?.message ||
              "Channel health, delivery issues, and the latest post insights available from Nuelink."}
          </p>
        </div>
        <button className="btn secondary" disabled={loading} onClick={sync}>
          <RefreshCw size={16} />
          {loading ? "Checking…" : "Refresh"}
        </button>
        <button className="btn secondary" onClick={() => setSetup(!setup)}>
          <Link2 size={15} />
          {data?.connected ? "Connection" : "Connect Nuelink"}
        </button>
      </div>
      {error && (
        <div className="notice error" role="alert">
          {error}
        </div>
      )}
      {setup && (
        <form
          className="panel studio-form"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const f = new FormData(form);
            setLoading(true);
            setError("");
            try {
              const r = await fetch("/api/studio/nuelink", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  key: f.get("key"),
                  brandId: f.get("brandId"),
                }),
              });
              const d = await r.json();
              if (!r.ok) throw new Error(d.error);
              form.reset();
              setSetup(false);
              await sync();
            } catch (e) {
              setError((e as Error).message);
            } finally {
              setLoading(false);
            }
          }}
        >
          <p className="form-intro">
            Use the API key from your Nuelink settings and the Owners Circle
            brand ID. The key is stored privately on the server and is never
            returned to the browser. This integration only reads Nuelink; it
            does not publish or edit posts.
          </p>
          <div className="form-grid">
            <label className="field">
              <span>Nuelink API key</span>
              <input name="key" type="password" required autoComplete="off" />
            </label>
            <label className="field">
              <span>Owners Circle brand ID</span>
              <input
                name="brandId"
                inputMode="numeric"
                pattern="[0-9]+"
                required
              />
            </label>
          </div>
          <div className="connection-actions">
            <a
              href="https://app.nuelink.com/settings/api"
              target="_blank"
              rel="noreferrer"
            >
              Open Nuelink settings <ExternalLink size={13} />
            </a>
            <button className="btn primary" disabled={loading}>
              {loading ? "Connecting…" : "Verify and connect"}
            </button>
          </div>
        </form>
      )}
      {data?.connected && (
        <>
          <section className="panel">
            <div className="section-title">
              <h2>{data.brandName} · Channel health</h2>
              <small>
                Checked {data.asOf && new Date(data.asOf).toLocaleString()}
              </small>
            </div>
            <div className="channel-grid">
              {data.channels?.map((c) => (
                <div key={c.id}>
                  <strong>{c.name}</strong>
                  <p>{c.platform}</p>
                  <span
                    className={
                      "badge " +
                      (c.status === "ACTIVE" ? "published" : "declined")
                    }
                  >
                    {c.status === "ACTIVE"
                      ? "Active"
                      : "Needs attention: " + c.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
          <section className="panel">
            <div className="section-title">
              <h2>Posts · Last 30 days</h2>
              <select
                aria-label="Filter Nuelink results"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All results</option>
                <option value="issues">Needs attention</option>
              </select>
            </div>
            {data.partial && (
              <p className="form-help">
                Showing up to 100 results per delivery status. More results are
                available in Nuelink; this is a partial view.
              </p>
            )}
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Post / channel</th>
                    <th>Delivery</th>
                    <th>Views</th>
                    <th>Likes</th>
                    <th>Comments</th>
                    <th>Shares</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => (
                    <tr key={p.id}>
                      <td>
                        {p.url ? (
                          <a href={p.url} target="_blank" rel="noreferrer">
                            {p.title}
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          p.title
                        )}
                        <small>
                          {p.channel} · {new Date(p.at).toLocaleDateString()}
                        </small>
                      </td>
                      <td>
                        <span
                          className={
                            "badge " +
                            (p.status === "PUBLISHED"
                              ? "published"
                              : "declined")
                          }
                        >
                          {p.status}
                        </span>
                        {p.message && <small>{p.message}</small>}
                      </td>
                      {["views", "likes", "comments", "shares"].map((k) => (
                        <td key={k}>
                          {typeof p.results[k] === "number"
                            ? p.results[k]?.toLocaleString()
                            : "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!posts.length && (
              <p className="form-help">
                No matching results returned for this period.
              </p>
            )}
          </section>
        </>
      )}
      <div className="analytics-note">
        <AlertCircle size={18} />
        <p>
          Connected insights come from Nuelink’s latest per-post snapshots and
          can lag behind the social platform. Missing metrics are shown as “—”.
          Views and engagement definitions vary by channel.{" "}
          <a
            href="https://docs.nuelink.com/guides/endpoints/#get-brandsbrand_idpublished-posts"
            target="_blank"
            rel="noreferrer"
          >
            About the data ↗
          </a>
        </p>
      </div>
    </>
  );
}
