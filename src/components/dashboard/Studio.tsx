"use client";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type FormEvent,
} from "react";
import Link from "next/link";
import NuelinkPanel from "./NuelinkPanel";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Clapperboard,
  Plus,
  ArrowUpRight,
  ArrowRight,
  BarChart3,
  Check,
  Circle,
  Film,
  X,
  Search,
  LogOut,
  RefreshCw,
  CalendarDays,
  ExternalLink,
  BookOpen,
  ChevronRight,
  AlertCircle,
  Download,
  Menu,
  Radio,
  CheckCircle2,
} from "lucide-react";
import {
  emptyStudio,
  makeTasks,
  type StudioStore,
  type StudioEpisode,
  type StudioProspect,
  type Metric,
} from "@/lib/studio";
type View =
  | "overview"
  | "prospects"
  | "shot"
  | "episodes"
  | "submit"
  | "analytics"
  | "guide";
const nav = [
  {
    id: "overview",
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "prospects",
    label: "Prospects",
    href: "/dashboard/prospects",
    icon: Users,
  },
  {
    id: "shot",
    label: "Episodes shot",
    href: "/dashboard/shot",
    icon: Clapperboard,
  },
  {
    id: "episodes",
    label: "Production",
    href: "/dashboard/podcast",
    icon: Film,
  },
  {
    id: "submit",
    label: "Submit new episode",
    href: "/dashboard/submit",
    icon: Plus,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    id: "guide",
    label: "Producer playbook",
    href: "/dashboard/guide",
    icon: BookOpen,
  },
];
const title: Record<View, string> = {
  overview: "A great show starts here.",
  prospects: "The next voice in the circle.",
  shot: "Recorded. Ready for the next step.",
  episodes: "From the edit to the audience.",
  submit: "Submit a new episode.",
  analytics: "Know what’s moving the show.",
  guide: "Your seat behind the scenes.",
};
const dateLabel = (d: string) =>
  d
    ? new Date(d + "T12:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Not set";
const today = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
const progress = (e: StudioEpisode) => e.tasks.filter((t) => t.done).length;
function Field({
  label,
  children,
  wide = false,
}: {
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "field wide" : "field"}>
      <span>{label}</span>
      {children}
    </label>
  );
}
function Empty({
  icon: Icon = Film,
  title,
  body,
  action,
}: {
  icon?: typeof Film;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty">
      <span className="empty-icon">
        <Icon size={28} />
      </span>
      <h3>{title}</h3>
      <p>{body}</p>
      {action}
    </div>
  );
}
function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return (
    <dialog ref={ref} className="studio-dialog" onCancel={onClose}>
      <div className="modal-head">
        <h2>{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
function EpisodeRow({
  episode: e,
  onSelect,
}: {
  episode: StudioEpisode;
  onSelect: (id: string) => void;
}) {
  return (
    <button className="episode-row" onClick={() => onSelect(e.id)}>
      <span className="ep-num">{String(e.number).padStart(2, "0")}</span>
      <span className="row-title">
        <strong>{e.title}</strong>
        <small>
          {e.guest || "Guest to be added"} · {e.owner || "Unassigned"}
        </small>
      </span>
      <span className="row-date">
        {dateLabel(e.dropDate)}
        <small>Drop date</small>
      </span>
      <span className={"badge " + e.stage}>
        {e.stage === "shot"
          ? "Waiting to submit"
          : e.stage === "published"
            ? "Published"
            : `${progress(e)}/${e.tasks.length} complete`}
      </span>
      <ChevronRight size={18} />
    </button>
  );
}
export default function Studio({ view = "overview" }: { view?: View }) {
  const router = useRouter();
  const [store, setStore] = useState<StudioStore>(emptyStudio);
  const [revision, setRevision] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState<"episode" | "prospect" | "metric" | null>(
    null,
  );
  const [editing, setEditing] = useState<StudioEpisode | StudioProspect | null>(
    null,
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [shotMode, setShotMode] = useState(false);
  const [legacy, setLegacy] = useState<string | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("oc-dashboard-store");
      if (raw) {
        const d = JSON.parse(raw);
        if (
          d.podcastEpisodes?.length ||
          d.notesEpisodes?.length ||
          d.prospects?.length
        )
          setLegacy(raw);
      }
    } catch {}
  }, []);
  const refresh = useCallback(async () => {
    setError("");
    try {
      const res = await fetch("/api/studio", { cache: "no-store" });
      if (res.status === 401) {
        router.replace("/dashboard/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStore(data.store);
      setRevision(data.revision);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [router]);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  async function save(
    type: "episode" | "prospect" | "metric",
    record: StudioEpisode | StudioProspect | Metric,
  ) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const res = await fetch("/api/studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ revision, action: { type, record } }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStore(data.store);
      setRevision(data.revision);
      setNotice("Saved to your shared workspace.");
      return true;
    } catch (e) {
      setError((e as Error).message);
      return false;
    } finally {
      setBusy(false);
    }
  }
  const episodes = store.episodes.filter((e) => e.stage !== "archived");
  const shots = episodes.filter((e) => e.stage === "shot");
  const active = episodes.filter((e) => e.stage === "production");
  const overdue = active.filter((e) => e.dropDate && e.dropDate < today());
  const upcoming = [...active].sort((a, b) =>
    a.dropDate.localeCompare(b.dropDate),
  );
  const ep = store.episodes.find((e) => e.id === selected);
  function openEpisode(shot = false, record?: StudioEpisode) {
    setEditing(record || null);
    setShotMode(shot);
    setModal("episode");
  }
  const visibleEpisodes = episodes.filter(
    (e) =>
      (view === "shot"
        ? e.stage === "shot"
        : view === "episodes"
          ? e.stage !== "shot"
          : true) &&
      (filter === "all" || e.stage === filter) &&
      `${e.number} ${e.title} ${e.guest}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const visibleProspects = store.prospects.filter(
    (p) =>
      (filter === "all" || p.status === filter) &&
      `${p.name} ${p.company} ${p.role}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const pendingFollowups = store.prospects.filter(
    (p) =>
      p.followUp &&
      p.followUp <= today() &&
      !["recorded", "declined"].includes(p.status),
  );
  const newButton = (
    <button className="btn primary" onClick={() => openEpisode(false)}>
      <Plus size={17} />
      Submit new episode
    </button>
  );

  return (
    <div className="studio">
      <aside className={"studio-sidebar " + (menu ? "open" : "")}>
        <Link href="/" className="studio-brand">
          <img src="/brand/oc-logo.jpg" width="46" height="46" alt="" />
          <span>
            Owner’s Circle<small>PRODUCER STUDIO</small>
          </span>
        </Link>
        <div className="workspace-label">
          WORKSPACE <span>01</span>
        </div>
        <nav aria-label="Producer navigation">
          {nav.map((n) => (
            <Link
              key={n.id}
              href={n.href}
              className={view === n.id ? "active" : ""}
              onClick={() => setMenu(false)}
            >
              <n.icon size={18} />
              {n.label}
              {n.id === "shot" && shots.length > 0 && <b>{shots.length}</b>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="studio-note">
            <Radio size={21} />
            <strong>Make room for the story.</strong>
            <p>One conversation. Every detail.</p>
          </div>
          <Link href="/" className="side-link">
            View public website <ArrowUpRight size={16} />
          </Link>
          <button
            className="side-link"
            onClick={async () => {
              const r = await fetch("/api/auth", { method: "DELETE" });
              if (r.ok) router.push("/dashboard/login");
              else setError("Sign out failed. Try again.");
            }}
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>
      <div className="studio-body">
        <header className="studio-topbar">
          <button
            className="mobile-menu icon-button"
            aria-label="Toggle navigation"
            onClick={() => setMenu(!menu)}
          >
            <Menu size={22} />
          </button>
          <span>
            Workspace <ChevronRight size={13} />{" "}
            <strong>
              {nav.find((n) => n.id === view)?.label || "New episode"}
            </strong>
          </span>
          <div className="topbar-right">
            <span className="shared-dot" /> Shared production workspace{" "}
            <span className="avatar">OC</span>
          </div>
        </header>
        <main className="studio-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                OWNER’S CIRCLE /{" "}
                {view === "overview"
                  ? "THE CONTROL ROOM"
                  : view === "guide"
                    ? "WELCOME ABOARD"
                    : "PRODUCTION"}
              </div>
              <h1>{title[view]}</h1>
              <p>
                {view === "overview"
                  ? "The conversations, the handoffs, and everything before “we’re live.”"
                  : view === "prospects"
                    ? "Build relationships. Book compelling guests. Keep the follow-up personal."
                    : view === "shot"
                      ? "Log the recording now. Submit it when the title and drop date are ready."
                      : view === "analytics"
                        ? "Publishing health and performance, with a clear source for every number."
                        : view === "guide"
                          ? "A simple rhythm for taking each conversation from prospect to published."
                          : "Keep every handoff clear, every asset close, and every episode moving."}
              </p>
            </div>
            {view !== "submit" &&
              view !== "guide" &&
              (view === "prospects" ? (
                <button
                  className="btn primary"
                  onClick={() => {
                    setEditing(null);
                    setModal("prospect");
                  }}
                >
                  <Plus size={17} />
                  Add prospect
                </button>
              ) : view === "shot" ? (
                <button
                  className="btn primary"
                  onClick={() => openEpisode(true)}
                >
                  <Plus size={17} />
                  Log episode shot
                </button>
              ) : view === "analytics" ? (
                <button
                  className="btn primary"
                  onClick={() => setModal("metric")}
                >
                  <Plus size={17} />
                  Add performance report
                </button>
              ) : (
                newButton
              ))}
          </div>
          {error && (
            <div className="notice error" role="alert">
              <AlertCircle size={18} />
              <span>{error}</span>
              <button onClick={refresh}>Refresh workspace</button>
            </div>
          )}
          {notice && (
            <div className="notice success" role="status">
              <CheckCircle2 size={17} />
              {notice}
              <button
                aria-label="Dismiss saved message"
                onClick={() => setNotice("")}
              >
                <X size={16} />
              </button>
            </div>
          )}
          {legacy && (
            <div className="notice">
              <AlertCircle size={18} />
              <span>
                This browser has records from the old dashboard. Export them
                before transferring them to the shared workspace.
              </span>
              <button
                onClick={() => {
                  const url = URL.createObjectURL(
                    new Blob([legacy], { type: "application/json" }),
                  );
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "owners-circle-legacy-records.json";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Export old records
              </button>
            </div>
          )}
          {loading ? (
            <div className="panel empty">Loading your shared workspace…</div>
          ) : (
            <>
              {view === "overview" && (
                <>
                  <div className="stats-grid">
                    {[
                      {
                        label: "Guest prospects",
                        value: store.prospects.filter(
                          (p) => !["recorded", "declined"].includes(p.status),
                        ).length,
                        caption: `${pendingFollowups.length} follow-ups due`,
                        icon: Users,
                        href: "/dashboard/prospects",
                      },
                      {
                        label: "Episodes shot",
                        value: shots.length,
                        caption: "Waiting to submit",
                        icon: Clapperboard,
                        href: "/dashboard/shot",
                      },
                      {
                        label: "In production",
                        value: active.length,
                        caption: `${overdue.length} past their drop date`,
                        icon: Film,
                        href: "/dashboard/podcast",
                      },
                      {
                        label: "Published",
                        value: episodes.filter((e) => e.stage === "published")
                          .length,
                        caption: "Checklists completed",
                        icon: Radio,
                        href: "/dashboard/podcast",
                      },
                    ].map((s) => (
                      <Link href={s.href} className="stat" key={s.label}>
                        <div>
                          <span>{s.label}</span>
                          <s.icon size={18} />
                        </div>
                        <strong>{s.value.toString().padStart(2, "0")}</strong>
                        <small>
                          {s.caption}
                          <ArrowUpRight size={14} />
                        </small>
                      </Link>
                    ))}
                  </div>
                  <div className="overview-grid">
                    <section>
                      <div className="feature-banner">
                        <div>
                          <div className="eyebrow">YOUR NEXT RELEASE</div>
                          <h2>
                            {upcoming[0]?.title ||
                              "The next conversation\nstarts with you."}
                          </h2>
                          <p>
                            {upcoming[0]
                              ? `Episode ${upcoming[0].number} · ${dateLabel(upcoming[0].dropDate)} · ${progress(upcoming[0])} of 7 tasks complete`
                              : "Bring the recording, set the date, and we’ll keep the details in order."}
                          </p>
                          <button
                            className="btn cream"
                            onClick={() =>
                              upcoming[0]
                                ? setSelected(upcoming[0].id)
                                : openEpisode(false)
                            }
                          >
                            {upcoming[0]
                              ? "Open production checklist"
                              : "Submit your first episode"}
                            <ArrowRight size={16} />
                          </button>
                        </div>
                        <div className="record-art" aria-hidden="true">
                          <div>
                            <span>OC</span>
                            <small>ON THE RECORD</small>
                          </div>
                        </div>
                      </div>
                      <section className="panel">
                        <div className="section-title">
                          <h2>On the production desk</h2>
                          <Link href="/dashboard/podcast">
                            View all <ArrowRight size={15} />
                          </Link>
                        </div>
                        {active.length ? (
                          active
                            .slice(0, 5)
                            .map((e) => (
                              <EpisodeRow
                                key={e.id}
                                episode={e}
                                onSelect={setSelected}
                              />
                            ))
                        ) : (
                          <Empty
                            title="A clear desk. A fresh start."
                            body="Submitted episodes appear here with their next handoff and release date."
                            action={
                              <button
                                className="text-button"
                                onClick={() => openEpisode(false)}
                              >
                                Add an episode <Plus size={15} />
                              </button>
                            }
                          />
                        )}
                      </section>
                    </section>
                    <section>
                      <div className="panel attention">
                        <div className="section-title">
                          <h2>Needs your attention</h2>
                          <span className="count">
                            {shots.length +
                              overdue.length +
                              pendingFollowups.length}
                          </span>
                        </div>
                        {shots.length > 0 && (
                          <Link
                            href="/dashboard/shot"
                            className="attention-row"
                          >
                            <Clapperboard size={20} />
                            <div>
                              <strong>
                                {shots.length} recording
                                {shots.length !== 1 ? "s" : ""} to submit
                              </strong>
                              <p>Add a title and drop date.</p>
                            </div>
                            <ChevronRight size={17} />
                          </Link>
                        )}
                        {overdue.map((e) => (
                          <button
                            key={e.id}
                            className="attention-row"
                            onClick={() => setSelected(e.id)}
                          >
                            <CalendarDays size={20} />
                            <div>
                              <strong>Episode {e.number} is overdue</strong>
                              <p>Review the {dateLabel(e.dropDate)} release.</p>
                            </div>
                          </button>
                        ))}
                        {pendingFollowups.length > 0 && (
                          <Link
                            href="/dashboard/prospects"
                            className="attention-row"
                          >
                            <Users size={20} />
                            <div>
                              <strong>
                                {pendingFollowups.length} follow-ups due
                              </strong>
                              <p>Keep the conversation going.</p>
                            </div>
                          </Link>
                        )}
                        {!shots.length &&
                          !overdue.length &&
                          !pendingFollowups.length && (
                            <div className="all-clear">
                              <CheckCircle2 size={25} />
                              <strong>You’re all caught up.</strong>
                              <p>
                                Upcoming handoffs and overdue tasks will appear
                                here.
                              </p>
                            </div>
                          )}
                      </div>
                      <div className="playbook-card">
                        <span className="eyebrow">NEW TO THE STUDIO?</span>
                        <BookOpen size={24} />
                        <h3>Your producer playbook.</h3>
                        <p>
                          A clear path from the first introduction to the final
                          clip.
                        </p>
                        <Link href="/dashboard/guide">
                          Get oriented <ArrowUpRight size={17} />
                        </Link>
                      </div>
                      <div className="activity">
                        <h3>Latest activity</h3>
                        {store.activity.length ? (
                          store.activity.slice(0, 4).map((a) => (
                            <div key={a.id}>
                              <span className="activity-dot" />
                              <p>
                                {a.label}
                                <small>
                                  {new Date(a.at).toLocaleString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                  })}
                                </small>
                              </p>
                            </div>
                          ))
                        ) : (
                          <p>Your team’s saved updates will appear here.</p>
                        )}
                      </div>
                    </section>
                  </div>
                </>
              )}
              {(view === "episodes" || view === "shot") && (
                <section className="panel">
                  <div className="list-toolbar">
                    <div className="search">
                      <Search size={17} />
                      <input
                        aria-label="Search episodes"
                        placeholder="Search episodes, guests, or numbers"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                    {view === "episodes" && (
                      <select
                        aria-label="Filter episode status"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        <option value="all">All production</option>
                        <option value="production">In production</option>
                        <option value="published">Published</option>
                      </select>
                    )}
                    <span>{visibleEpisodes.length} episodes</span>
                  </div>
                  {visibleEpisodes.length ? (
                    visibleEpisodes.map((e) => (
                      <EpisodeRow
                        key={e.id}
                        episode={e}
                        onSelect={setSelected}
                      />
                    ))
                  ) : (
                    <Empty
                      icon={Clapperboard}
                      title={
                        query
                          ? "No matching episodes"
                          : view === "shot"
                            ? "The cameras have stopped. Now what?"
                            : "Your next episode belongs here."
                      }
                      body={
                        view === "shot"
                          ? "Log a completed recording, then submit it to create the publishing checklist."
                          : "Submit an episode with its number, title, and drop date to get started."
                      }
                      action={
                        <button
                          className="btn primary"
                          onClick={() => openEpisode(view === "shot")}
                        >
                          {view === "shot"
                            ? "Log episode shot"
                            : "Submit new episode"}
                          <Plus size={16} />
                        </button>
                      }
                    />
                  )}
                </section>
              )}
              {view === "prospects" && (
                <>
                  <div className="pipeline">
                    {[
                      "identified",
                      "contacted",
                      "interested",
                      "booked",
                      "recorded",
                    ].map((s, i) => (
                      <button
                        key={s}
                        className={filter === s ? "selected" : ""}
                        onClick={() => setFilter(filter === s ? "all" : s)}
                      >
                        <span>
                          0{i + 1} / {s}
                        </span>
                        <strong>
                          {store.prospects.filter((p) => p.status === s).length}
                        </strong>
                        <ArrowRight size={16} />
                      </button>
                    ))}
                  </div>
                  <section className="panel">
                    <div className="list-toolbar">
                      <div className="search">
                        <Search size={17} />
                        <input
                          aria-label="Search prospects"
                          placeholder="Search names, companies, or roles"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                      <select
                        aria-label="Filter prospects"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        {[
                          "all",
                          "identified",
                          "contacted",
                          "interested",
                          "booked",
                          "recorded",
                          "declined",
                        ].map((s) => (
                          <option key={s} value={s}>
                            {s === "all" ? "All stages" : s}
                          </option>
                        ))}
                      </select>
                    </div>
                    {visibleProspects.length ? (
                      <div className="table-scroll">
                        <table>
                          <thead>
                            <tr>
                              <th>Guest prospect</th>
                              <th>Stage</th>
                              <th>Next follow-up</th>
                              <th>Owner</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {visibleProspects.map((p) => (
                              <tr key={p.id}>
                                <td>
                                  <strong>{p.name}</strong>
                                  <small>
                                    {[p.role, p.company]
                                      .filter(Boolean)
                                      .join(" · ") || "Add company details"}
                                  </small>
                                </td>
                                <td>
                                  <span className={"badge " + p.status}>
                                    {p.status}
                                  </span>
                                </td>
                                <td>{dateLabel(p.followUp)}</td>
                                <td>{p.owner || "Unassigned"}</td>
                                <td>
                                  <button
                                    className="text-button"
                                    onClick={() => {
                                      setEditing(p);
                                      setModal("prospect");
                                    }}
                                  >
                                    Open <ArrowUpRight size={15} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <Empty
                        icon={Users}
                        title={
                          query || filter !== "all"
                            ? "No prospects in this view"
                            : "Every great conversation starts with a name."
                        }
                        body="Keep the guest, their story, your notes, and the next follow-up together."
                        action={
                          <button
                            className="btn primary"
                            onClick={() => {
                              setEditing(null);
                              setModal("prospect");
                            }}
                          >
                            Add your first prospect <Plus size={16} />
                          </button>
                        }
                      />
                    )}
                  </section>
                </>
              )}
              {view === "submit" && (
                <div className="panel form-panel">
                  <EpisodeForm
                    busy={busy}
                    onSave={async (record) => {
                      if (await save("episode", record))
                        router.push("/dashboard/podcast");
                    }}
                  />
                </div>
              )}
              {view === "analytics" && (
                <Analytics
                  metrics={store.metrics}
                  onAdd={() => setModal("metric")}
                />
              )}
              {view === "guide" && (
                <div className="guide-grid">
                  {[
                    {
                      n: "01",
                      title: "Build the guest pipeline",
                      body: "Add a prospect, capture why their story matters, assign an owner, and set the next follow-up. Move the relationship through contacted, interested, and booked.",
                      href: "/dashboard/prospects",
                      cta: "Open prospects",
                    },
                    {
                      n: "02",
                      title: "Log the recording",
                      body: "As soon as the episode is shot, log its number, working title, guest, and recording date. It stays in “Episodes shot” until the final handoff.",
                      href: "/dashboard/shot",
                      cta: "Log a recording",
                    },
                    {
                      n: "03",
                      title: "Submit the handoff",
                      body: "Confirm the episode number, title, and drop date. Add the editor’s video link and any production notes. Submission creates the seven-step publishing checklist.",
                      href: "/dashboard/submit",
                      cta: "Submit an episode",
                    },
                    {
                      n: "04",
                      title: "Package, schedule, verify",
                      body: "Receive the edit, put it in Opus, choose clips, review captions and thumbnails, and schedule through Nuelink. Verify the published links before marking the episode published.",
                      href: "/dashboard/podcast",
                      cta: "Open production",
                    },
                    {
                      n: "05",
                      title: "Bring the learning back",
                      body: "Review channel health and publishing status. Add performance numbers from a dated Nuelink report, record what worked, and use it to shape the next episode.",
                      href: "/dashboard/analytics",
                      cta: "Review analytics",
                    },
                  ].map((g) => (
                    <section className="panel guide" key={g.n}>
                      <span>{g.n}</span>
                      <h2>{g.title}</h2>
                      <p>{g.body}</p>
                      <Link href={g.href}>
                        {g.cta}
                        <ArrowRight size={16} />
                      </Link>
                    </section>
                  ))}
                </div>
              )}
              <footer className="studio-footer">
                <span>
                  OWNER’S CIRCLE <i>·</i> THE WORK BEHIND THE CONVERSATION
                </span>
                <button className="text-button" onClick={refresh}>
                  <RefreshCw size={13} />
                  Refresh
                </button>
                <button
                  className="text-button"
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(store, null, 2)], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "owners-circle-workspace.json";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  <Download size={13} />
                  Export workspace
                </button>
              </footer>
            </>
          )}
        </main>
      </div>
      {modal === "episode" && (
        <Modal
          title={
            editing
              ? "Edit episode"
              : shotMode
                ? "Log episode shot"
                : "Submit new episode"
          }
          onClose={() => setModal(null)}
        >
          <EpisodeForm
            existing={editing as StudioEpisode | null}
            shot={shotMode}
            busy={busy}
            onSave={async (record) => {
              if (await save("episode", record)) {
                setModal(null);
                setSelected(record.id);
              }
            }}
          />
          {error && (
            <div className="form-error" role="alert">
              {error}{" "}
              <button type="button" className="text-button" onClick={refresh}>
                Refresh workspace
              </button>
            </div>
          )}
        </Modal>
      )}
      {modal === "prospect" && (
        <Modal
          title={editing ? "Guest prospect" : "Add a prospect"}
          onClose={() => setModal(null)}
        >
          <ProspectForm
            existing={editing as StudioProspect | null}
            busy={busy}
            onSave={async (record) => {
              if (await save("prospect", record)) setModal(null);
            }}
          />
          {error && (
            <div className="form-error" role="alert">
              {error}{" "}
              <button type="button" className="text-button" onClick={refresh}>
                Refresh workspace
              </button>
            </div>
          )}
        </Modal>
      )}
      {modal === "metric" && (
        <Modal title="Add a performance report" onClose={() => setModal(null)}>
          <MetricForm
            busy={busy}
            onSave={async (record) => {
              if (await save("metric", record)) setModal(null);
            }}
          />
          {error && (
            <div className="form-error" role="alert">
              {error}{" "}
              <button type="button" className="text-button" onClick={refresh}>
                Refresh workspace
              </button>
            </div>
          )}
        </Modal>
      )}
      {ep && !modal && (
        <Modal title={`Episode ${ep.number}`} onClose={() => setSelected(null)}>
          <div className="episode-detail">
            <span className={"badge " + ep.stage}>
              {ep.stage === "shot" ? "Shot · waiting to submit" : ep.stage}
            </span>
            <h2>{ep.title}</h2>
            <p>
              {ep.guest || "Guest not set"} · {ep.owner || "Owner unassigned"}
            </p>
            <div className="detail-dates">
              <span>
                DROP DATE<strong>{dateLabel(ep.dropDate)}</strong>
              </span>
              <span>
                RECORDED<strong>{dateLabel(ep.shotDate)}</strong>
              </span>
              <button
                className="btn secondary"
                onClick={() => openEpisode(ep.stage === "shot", ep)}
              >
                Edit details
              </button>
            </div>
            {ep.stage === "shot" ? (
              <div className="handoff-box">
                <h3>Ready for the production desk?</h3>
                <p>
                  Confirm the title and drop date to begin the publishing
                  checklist.
                </p>
                <button
                  className="btn primary"
                  onClick={() => {
                    setEditing({ ...ep, stage: "production" });
                    setShotMode(false);
                    setModal("episode");
                  }}
                >
                  Submit this episode
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="checklist-heading">
                  <h3>Publishing checklist</h3>
                  <span>
                    {progress(ep)} / {ep.tasks.length}
                  </span>
                </div>
                <div className="progress-track">
                  <span
                    style={{
                      width: `${(progress(ep) / ep.tasks.length) * 100}%`,
                    }}
                  />
                </div>
                {ep.tasks.map((task, i) => (
                  <button
                    disabled={busy || ep.stage === "published"}
                    className={"task-row " + (task.done ? "done" : "")}
                    key={task.label}
                    onClick={() =>
                      save("episode", {
                        ...ep,
                        tasks: ep.tasks.map((t, j) =>
                          i === j
                            ? {
                                ...t,
                                done: !t.done,
                                completedAt: !t.done
                                  ? new Date().toISOString()
                                  : undefined,
                              }
                            : t,
                        ),
                      })
                    }
                  >
                    {task.done ? (
                      <CheckCircle2 size={21} />
                    ) : (
                      <Circle size={21} />
                    )}
                    <span>
                      {task.label}
                      {task.completedAt && (
                        <small>
                          Completed{" "}
                          {new Date(task.completedAt).toLocaleDateString()}
                        </small>
                      )}
                    </span>
                  </button>
                ))}
                {ep.stage === "production" && (
                  <button
                    disabled={busy || progress(ep) !== ep.tasks.length}
                    className="btn primary full"
                    onClick={() =>
                      save("episode", { ...ep, stage: "published" })
                    }
                  >
                    Mark episode published
                    <Check size={16} />
                  </button>
                )}
                {ep.stage === "published" && (
                  <button
                    disabled={busy}
                    className="btn secondary full"
                    onClick={() =>
                      save("episode", { ...ep, stage: "production" })
                    }
                  >
                    Reopen production checklist
                  </button>
                )}
              </>
            )}
            {[ep.videoUrl, ep.opusUrl, ep.nuelinkUrl].some(Boolean) && (
              <div className="asset-links">
                {[
                  ["Editor video", ep.videoUrl],
                  ["Opus project", ep.opusUrl],
                  ["Nuelink schedule", ep.nuelinkUrl],
                ].map(
                  ([label, url]) =>
                    url && (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {label}
                        <ExternalLink size={14} />
                      </a>
                    ),
                )}
              </div>
            )}
            {ep.notes && (
              <div className="detail-notes">
                <h3>Handoff notes</h3>
                <p>{ep.notes}</p>
              </div>
            )}
            <p className="form-help">
              Checklist items track your team’s work. Checking one does not
              upload a video or publish a post.
            </p>
            {error && (
              <div className="form-error" role="alert">
                {error}{" "}
                <button type="button" className="text-button" onClick={refresh}>
                  Refresh workspace
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
function EpisodeForm({
  existing,
  shot = false,
  busy,
  onSave,
}: {
  existing?: StudioEpisode | null;
  shot?: boolean;
  busy: boolean;
  onSave: (e: StudioEpisode) => void;
}) {
  return (
    <form
      className="studio-form"
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const f = new FormData(event.currentTarget);
        const s = (key: string) => String(f.get(key) || "");
        onSave({
          id: existing?.id || crypto.randomUUID(),
          number: Number(s("number")),
          title: s("title"),
          guest: s("guest"),
          dropDate: s("dropDate"),
          shotDate: s("shotDate"),
          owner: s("owner"),
          videoUrl: s("videoUrl"),
          opusUrl: s("opusUrl"),
          nuelinkUrl: s("nuelinkUrl"),
          notes: s("notes"),
          stage: shot
            ? "shot"
            : existing?.stage === "published"
              ? "published"
              : "production",
          tasks: existing?.tasks || makeTasks(),
          createdAt: existing?.createdAt || new Date().toISOString(),
        });
      }}
    >
      <p className="form-intro">
        {shot
          ? "Capture the recording. You can finalize the release details when you submit."
          : "Set the release details. Your editor-to-publishing checklist is created automatically."}
      </p>
      <div className="form-grid">
        <Field label="Episode number *">
          <input
            name="number"
            type="number"
            min="1"
            max="99999"
            required
            defaultValue={existing?.number}
            placeholder="e.g. 12"
          />
        </Field>
        <Field label="Drop date (Eastern time)">
          <input
            name="dropDate"
            type="date"
            required={!shot}
            defaultValue={existing?.dropDate}
          />
        </Field>
        <Field label="Episode title *" wide>
          <input
            name="title"
            maxLength={500}
            required
            defaultValue={existing?.title}
            placeholder="Give the conversation a title"
          />
        </Field>
        <Field label="Guest">
          <input
            name="guest"
            defaultValue={existing?.guest}
            placeholder="Guest name"
          />
        </Field>
        <Field label="Producer / owner">
          <input
            name="owner"
            defaultValue={existing?.owner}
            placeholder="Who is driving this episode?"
          />
        </Field>
        <Field label="Date recorded">
          <input
            name="shotDate"
            type="date"
            defaultValue={existing?.shotDate}
          />
        </Field>
        <Field label="Editor video link">
          <input
            name="videoUrl"
            type="url"
            defaultValue={existing?.videoUrl}
            placeholder="https://drive.google.com/…"
          />
        </Field>
        <Field label="Opus project link">
          <input
            name="opusUrl"
            type="url"
            defaultValue={existing?.opusUrl}
            placeholder="https://…"
          />
        </Field>
        <Field label="Nuelink schedule link">
          <input
            name="nuelinkUrl"
            type="url"
            defaultValue={existing?.nuelinkUrl}
            placeholder="https://…"
          />
        </Field>
        <Field label="Handoff notes" wide>
          <textarea
            name="notes"
            rows={3}
            defaultValue={existing?.notes}
            placeholder="Key moments, editor feedback, clip ideas, or anything the producer should know."
          />
        </Field>
      </div>
      {!shot && (
        <div className="checklist-preview">
          <span className="eyebrow">AUTOMATIC CHECKLIST</span>
          <p>
            Editor delivery <ChevronRight size={13} /> Opus{" "}
            <ChevronRight size={13} /> Best clips <ChevronRight size={13} />{" "}
            Review <ChevronRight size={13} /> Nuelink <ChevronRight size={13} />{" "}
            Full episode <ChevronRight size={13} /> Verify
          </p>
        </div>
      )}
      <button className="btn primary full" disabled={busy}>
        {busy
          ? "Saving…"
          : existing
            ? "Save episode"
            : shot
              ? "Save recording"
              : "Submit episode"}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
function ProspectForm({
  existing: p,
  busy,
  onSave,
}: {
  existing?: StudioProspect | null;
  busy: boolean;
  onSave: (p: StudioProspect) => void;
}) {
  return (
    <form
      className="studio-form"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const s = (k: string) => String(f.get(k) || "");
        onSave({
          id: p?.id || crypto.randomUUID(),
          name: s("name"),
          company: s("company"),
          role: s("role"),
          email: s("email"),
          profileUrl: s("profileUrl"),
          status: s("status") as StudioProspect["status"],
          owner: s("owner"),
          followUp: s("followUp"),
          notes: s("notes"),
          createdAt: p?.createdAt || new Date().toISOString(),
        });
      }}
    >
      <div className="form-grid">
        {[
          ["name", "Guest name *"],
          ["company", "Company"],
          ["role", "Role"],
          ["email", "Email"],
          ["profileUrl", "Profile / website"],
          ["owner", "Relationship owner"],
        ].map(([key, label]) => (
          <Field key={key} label={label}>
            <input
              name={key}
              required={key === "name"}
              type={
                key === "email"
                  ? "email"
                  : key === "profileUrl"
                    ? "url"
                    : "text"
              }
              defaultValue={p?.[key as keyof StudioProspect]}
            />
          </Field>
        ))}
        <Field label="Stage">
          <select name="status" defaultValue={p?.status || "identified"}>
            {[
              "identified",
              "contacted",
              "interested",
              "booked",
              "recorded",
              "declined",
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Next follow-up">
          <input name="followUp" type="date" defaultValue={p?.followUp} />
        </Field>
        <Field label="Story angle & relationship notes" wide>
          <textarea
            name="notes"
            rows={5}
            defaultValue={p?.notes}
            placeholder="Why this guest? What did you discuss? What comes next?"
          />
        </Field>
      </div>
      <button className="btn primary full" disabled={busy}>
        {busy ? "Saving…" : "Save prospect"}
        <Check size={16} />
      </button>
    </form>
  );
}
function MetricForm({
  busy,
  onSave,
}: {
  busy: boolean;
  onSave: (m: Metric) => void;
}) {
  return (
    <form
      className="studio-form"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const s = (k: string) => String(f.get(k) || "");
        onSave({
          id: crypto.randomUUID(),
          channel: s("channel") as Metric["channel"],
          episodeNumber: s("episodeNumber")
            ? Number(s("episodeNumber"))
            : undefined,
          start: s("start"),
          end: s("end"),
          views: Number(s("views")),
          engagements: Number(s("engagements")),
          followers: Number(s("followers")),
          sourceUrl: s("sourceUrl"),
          notes: s("notes"),
          createdAt: new Date().toISOString(),
        });
      }}
    >
      <p className="form-intro">
        Enter the numbers from a Nuelink or native-channel report. These are
        labeled as manually entered snapshots, not a live sync.
      </p>
      <div className="form-grid">
        <Field label="Channel">
          <select name="channel">
            {[
              "Instagram",
              "YouTube",
              "TikTok",
              "LinkedIn",
              "Facebook",
              "X",
              "Other",
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Episode number (optional)">
          <input name="episodeNumber" type="number" min="1" />
        </Field>
        <Field label="Period start *">
          <input name="start" type="date" required />
        </Field>
        <Field label="Period end *">
          <input name="end" type="date" required />
        </Field>
        {[
          ["views", "Views / impressions"],
          ["engagements", "Engagements"],
          ["followers", "Total followers"],
        ].map(([key, label]) => (
          <Field key={key} label={label + " *"}>
            <input name={key} type="number" min="0" required />
          </Field>
        ))}
        <Field label="Source report URL">
          <input name="sourceUrl" type="url" />
        </Field>
        <Field label="What worked / next action" wide>
          <textarea name="notes" rows={3} />
        </Field>
      </div>
      <button className="btn primary full" disabled={busy}>
        {busy ? "Saving…" : "Save performance report"}
        <Check size={16} />
      </button>
    </form>
  );
}
function Analytics({
  metrics,
  onAdd,
}: {
  metrics: Metric[];
  onAdd: () => void;
}) {
  return (
    <>
      <NuelinkPanel />
      <div className="section-title standalone">
        <div>
          <h2>Channel performance</h2>
          <p>
            Latest manually entered report per channel. Periods may differ;
            totals are not combined.
          </p>
        </div>
      </div>
      {metrics.length ? (
        <>
          <div className="performance-grid">
            {Array.from(new Set(metrics.map((m) => m.channel))).map(
              (channel) => {
                const m = [
                  ...metrics.filter((m) => m.channel === channel),
                ].sort(
                  (a, b) =>
                    b.end.localeCompare(a.end) ||
                    b.createdAt.localeCompare(a.createdAt),
                )[0];
                return (
                  <div className="panel performance" key={channel}>
                    <span className="eyebrow">{channel}</span>
                    <h2>{m.views.toLocaleString()}</h2>
                    <p>Views / impressions</p>
                    <div>
                      <span>
                        Engagements <b>{m.engagements.toLocaleString()}</b>
                      </span>
                      <span>
                        Followers <b>{m.followers.toLocaleString()}</b>
                      </span>
                    </div>
                    <small>
                      {dateLabel(m.start)} – {dateLabel(m.end)} · Manual report
                    </small>
                    {m.notes && <p className="insight">{m.notes}</p>}
                    {m.sourceUrl && (
                      <a href={m.sourceUrl} target="_blank" rel="noreferrer">
                        Source report <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                );
              },
            )}
          </div>
          <section className="panel">
            <div className="section-title">
              <h2>Report history</h2>
              <span>{metrics.length} snapshots</span>
            </div>
            {metrics.map((m) => (
              <div className="report-row" key={m.id}>
                <strong>
                  {m.channel}
                  {m.episodeNumber ? ` · EP ${m.episodeNumber}` : ""}
                </strong>
                <span>
                  {dateLabel(m.start)} – {dateLabel(m.end)}
                </span>
                <span>{m.views.toLocaleString()} views</span>
                <small>Manually entered</small>
              </div>
            ))}
          </section>
        </>
      ) : (
        <section className="panel">
          <Empty
            icon={BarChart3}
            title="The story behind the numbers."
            body="Add your first dated performance report to compare channels and capture the lessons for the next release."
            action={
              <button className="btn primary" onClick={onAdd}>
                Add performance report
                <Plus size={16} />
              </button>
            }
          />
        </section>
      )}
    </>
  );
}
