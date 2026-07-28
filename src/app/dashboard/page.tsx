"use client";

import { useRouter } from "next/navigation";
import { useDashboardStore } from "@/hooks/useDashboardStore";

export default function DashboardHome() {
  const { store, loaded, recentActivity } = useDashboardStore();
  const router = useRouter();

  if (!loaded) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", color: "var(--espresso)", opacity: 0.4 }}>
        Loading...
      </div>
    );
  }

  const totalPodcast = store.podcastEpisodes.length;
  const totalNotes = store.notesEpisodes.length;
  const totalProspects = store.prospects.length;
  const inProgress =
    store.podcastEpisodes.filter((e) => e.status === "active").length +
    store.notesEpisodes.filter((e) => e.status === "active").length;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
    { label: "Podcast Episodes", value: totalPodcast, color: "var(--burgundy)" },
    { label: "Owner's Notes", value: totalNotes, color: "var(--gold)" },
    { label: "Prospects", value: totalProspects, color: "var(--espresso)" },
    { label: "In Progress", value: inProgress, color: "#16A34A" },
  ];

  return (
    <div style={{ maxWidth: "900px" }}>
      <div style={{ marginBottom: "36px" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif",
            fontSize: "32px",
            fontWeight: 700,
            color: "var(--burgundy)",
            marginBottom: "6px",
          }}
        >
          Welcome back
        </h1>
        <p style={{ fontSize: "14px", color: "var(--espresso)", opacity: 0.45 }}>{today}</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "36px",
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff",
              border: "1px solid var(--rule)",
              borderRadius: "12px",
              padding: "24px",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: s.color,
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--espresso)",
                opacity: 0.45,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "36px", flexWrap: "wrap" }}>
        <button
          onClick={() => router.push("/dashboard/podcast")}
          style={{
            padding: "14px 28px",
            borderRadius: "10px",
            border: "none",
            background: "var(--burgundy)",
            color: "var(--ivory)",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
        >
          + New Podcast Episode
        </button>
        <button
          onClick={() => router.push("/dashboard/notes")}
          style={{
            padding: "14px 28px",
            borderRadius: "10px",
            border: "1px solid var(--rule)",
            background: "#fff",
            color: "var(--espresso)",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
        >
          + New Owner&apos;s Note
        </button>
      </div>

      <div>
        <h2
          style={{
            fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif",
            fontSize: "20px",
            fontWeight: 600,
            color: "var(--burgundy)",
            marginBottom: "16px",
          }}
        >
          Recent Activity
        </h2>

        {recentActivity.length === 0 ? (
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--rule)",
              borderRadius: "12px",
              padding: "40px 20px",
              textAlign: "center",
              color: "var(--espresso)",
              opacity: 0.4,
              fontSize: "14px",
            }}
          >
            No activity yet. Create an episode to get started.
          </div>
        ) : (
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--rule)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {recentActivity.map((a, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  borderBottom: i < recentActivity.length - 1 ? "1px solid var(--rule)" : "none",
                  fontSize: "13px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--gold)",
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1, color: "var(--espresso)" }}>
                  <strong>{a.label}</strong>
                  <span style={{ opacity: 0.5 }}> in {a.episodeTitle}</span>
                </span>
                <span style={{ fontSize: "12px", color: "var(--espresso)", opacity: 0.35, whiteSpace: "nowrap" }}>
                  {new Date(a.completedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
