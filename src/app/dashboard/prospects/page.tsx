"use client";

import { useState } from "react";
import { useDashboardStore } from "@/hooks/useDashboardStore";
import { ProspectTable } from "@/components/dashboard/ProspectTable";
import { NewProspectModal } from "@/components/dashboard/NewProspectModal";

export default function ProspectsPage() {
  const { store, loaded, addProspect, updateProspect } = useDashboardStore();
  const [showNew, setShowNew] = useState(false);

  if (!loaded) {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", color: "var(--espresso)", opacity: 0.4 }}>
        Loading...
      </div>
    );
  }

  const activeEpisodes = store.podcastEpisodes.filter((e) => e.status === "active");

  return (
    <div style={{ maxWidth: "1000px" }}>
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
            Prospects
          </h1>
          <p style={{ fontSize: "13px", color: "var(--espresso)", opacity: 0.45 }}>
            Guest prospect pipeline
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
          + Add Prospect
        </button>
      </div>

      <div
        style={{
          display: "none",
        }}
        className="prospect-table-header"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 100px 90px 90px",
            padding: "8px 20px",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--espresso)",
            opacity: 0.4,
            gap: "8px",
          }}
        >
          <span>Name</span>
          <span>Company</span>
          <span>Role</span>
          <span>Status</span>
          <span>Added</span>
          <span>Last Contact</span>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .prospect-table-header { display: block !important; margin-bottom: 4px; }
        }
      `}</style>

      <ProspectTable
        prospects={store.prospects}
        episodes={activeEpisodes}
        onUpdate={updateProspect}
      />

      <NewProspectModal
        open={showNew}
        onClose={() => setShowNew(false)}
        onSave={addProspect}
      />
    </div>
  );
}
