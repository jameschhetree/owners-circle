"use client";

import { useState } from "react";
import { useDashboardStore } from "@/hooks/useDashboardStore";
import { EpisodeCard } from "@/components/dashboard/EpisodeCard";
import { NewEpisodeModal } from "@/components/dashboard/NewEpisodeModal";
import type { Episode } from "@/lib/dashboard-types";

export default function NotesPage() {
  const { store, loaded, addNotesEpisode, updateEpisode } = useDashboardStore();
  const [showNew, setShowNew] = useState(false);

  if (!loaded) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", color: "var(--espresso)", opacity: 0.4 }}>
        Loading...
      </div>
    );
  }

  const episodes = store.notesEpisodes;
  const active = episodes.filter((e) => e.status === "active");
  const completed = episodes.filter((e) => e.status === "completed");
  const archived = episodes.filter((e) => e.status === "archived");

  function renderGroup(label: string, eps: Episode[]) {
    if (eps.length === 0) return null;
    return (
      <div style={{ marginBottom: "32px" }}>
        <h3
          style={{
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--espresso)",
            opacity: 0.45,
            marginBottom: "12px",
          }}
        >
          {label} ({eps.length})
        </h3>
        {eps.map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} onUpdate={updateEpisode} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "var(--burgundy)",
              marginBottom: "4px",
            }}
          >
            Owner&apos;s Notes
          </h1>
          <p style={{ fontSize: "13px", color: "var(--espresso)", opacity: 0.45 }}>
            Solo episode pipeline
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          style={{
            padding: "12px 24px",
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
          + New Episode
        </button>
      </div>

      {episodes.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--rule)",
            borderRadius: "12px",
            padding: "60px 20px",
            textAlign: "center",
            color: "var(--espresso)",
            opacity: 0.4,
            fontSize: "14px",
          }}
        >
          No notes episodes yet. Create your first one.
        </div>
      ) : (
        <>
          {renderGroup("Active", active)}
          {renderGroup("Completed", completed)}
          {renderGroup("Archived", archived)}
        </>
      )}

      <NewEpisodeModal
        type="notes"
        open={showNew}
        onClose={() => setShowNew(false)}
        onSave={addNotesEpisode}
      />
    </div>
  );
}
