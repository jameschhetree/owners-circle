"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Prospect, ProspectStatus, Episode } from "@/lib/dashboard-types";
import { StatusBadge } from "./StatusBadge";

export function ProspectTable({
  prospects,
  episodes,
  onUpdate,
}: {
  prospects: Prospect[];
  episodes: Episode[];
  onUpdate: (p: Prospect) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<ProspectStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"date" | "status">("date");

  const filtered = prospects.filter((p) => filterStatus === "all" || p.status === filterStatus);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    }
    const statusOrder: ProspectStatus[] = [
      "identified",
      "researched",
      "contacted",
      "confirmed",
      "scheduled",
      "completed",
      "declined",
    ];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });

  function updateField(id: string, field: Partial<Prospect>) {
    const p = prospects.find((pr) => pr.id === id);
    if (p) onUpdate({ ...p, ...field });
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as ProspectStatus | "all")}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            border: "1px solid var(--taupe)",
            fontSize: "13px",
            fontFamily: "inherit",
            color: "var(--espresso)",
            background: "#fff",
            cursor: "pointer",
            appearance: "none",
          }}
        >
          <option value="all">All Statuses</option>
          <option value="identified">Identified</option>
          <option value="researched">Researched</option>
          <option value="contacted">Contacted</option>
          <option value="confirmed">Confirmed</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="declined">Declined</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date" | "status")}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            border: "1px solid var(--taupe)",
            fontSize: "13px",
            fontFamily: "inherit",
            color: "var(--espresso)",
            background: "#fff",
            cursor: "pointer",
            appearance: "none",
          }}
        >
          <option value="date">Sort by Date</option>
          <option value="status">Sort by Status</option>
        </select>
        <span style={{ fontSize: "13px", color: "var(--espresso)", opacity: 0.5, marginLeft: "auto" }}>
          {sorted.length} prospect{sorted.length !== 1 ? "s" : ""}
        </span>
      </div>

      {sorted.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--espresso)",
            opacity: 0.4,
            fontSize: "14px",
          }}
        >
          No prospects yet.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        {sorted.map((p) => {
          const isExpanded = expandedId === p.id;
          return (
            <div
              key={p.id}
              style={{
                background: "#fff",
                border: "1px solid var(--rule)",
                borderRadius: "10px",
                marginBottom: "8px",
                overflow: "hidden",
              }}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : p.id)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 1fr 100px 90px 90px",
                  alignItems: "center",
                  padding: "14px 20px",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "var(--espresso)",
                  gap: "8px",
                  transition: "background 0.15s ease",
                }}
              >
                <span style={{ fontWeight: 600 }}>{p.name}</span>
                <span style={{ opacity: 0.7 }}>{p.company}</span>
                <span style={{ opacity: 0.5, fontSize: "12px" }}>{p.role}</span>
                <StatusBadge status={p.status} variant="prospect" />
                <span style={{ opacity: 0.4, fontSize: "12px" }}>
                  {new Date(p.addedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <span style={{ opacity: 0.4, fontSize: "12px" }}>
                  {p.lastContactedAt
                    ? new Date(p.lastContactedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    : "-"}
                </span>
              </div>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      style={{
                        borderTop: "1px solid var(--rule)",
                        padding: "16px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                        {p.linkedIn && (
                          <div>
                            <span style={detailLabel}>LinkedIn</span>
                            <a
                              href={p.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: "13px", color: "var(--burgundy)", textDecoration: "underline" }}
                            >
                              Profile
                            </a>
                          </div>
                        )}
                        {p.twitter && (
                          <div>
                            <span style={detailLabel}>Twitter</span>
                            <span style={{ fontSize: "13px" }}>{p.twitter}</span>
                          </div>
                        )}
                        {p.email && (
                          <div>
                            <span style={detailLabel}>Email</span>
                            <a
                              href={`mailto:${p.email}`}
                              style={{ fontSize: "13px", color: "var(--burgundy)", textDecoration: "underline" }}
                            >
                              {p.email}
                            </a>
                          </div>
                        )}
                      </div>

                      {p.source && (
                        <div>
                          <span style={detailLabel}>Source</span>
                          <span style={{ fontSize: "13px" }}>{p.source}</span>
                        </div>
                      )}

                      {p.notes && (
                        <div
                          style={{
                            padding: "10px 14px",
                            background: "var(--ivory)",
                            borderRadius: "8px",
                            fontSize: "13px",
                            lineHeight: 1.6,
                            color: "var(--espresso)",
                            opacity: 0.7,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {p.notes}
                        </div>
                      )}

                      <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                        <div>
                          <span style={detailLabel}>Status</span>
                          <select
                            value={p.status}
                            onChange={(e) => updateField(p.id, { status: e.target.value as ProspectStatus })}
                            style={{
                              padding: "6px 10px",
                              borderRadius: "6px",
                              border: "1px solid var(--taupe)",
                              fontSize: "12px",
                              fontFamily: "inherit",
                              cursor: "pointer",
                              appearance: "none",
                            }}
                          >
                            <option value="identified">Identified</option>
                            <option value="researched">Researched</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="declined">Declined</option>
                          </select>
                        </div>

                        <div>
                          <span style={detailLabel}>Link to Episode</span>
                          <select
                            value={p.episodeId || ""}
                            onChange={(e) => updateField(p.id, { episodeId: e.target.value || undefined })}
                            style={{
                              padding: "6px 10px",
                              borderRadius: "6px",
                              border: "1px solid var(--taupe)",
                              fontSize: "12px",
                              fontFamily: "inherit",
                              cursor: "pointer",
                              appearance: "none",
                              maxWidth: "200px",
                            }}
                          >
                            <option value="">No episode</option>
                            {episodes
                              .filter((ep) => ep.status === "active")
                              .map((ep) => (
                                <option key={ep.id} value={ep.id}>
                                  {ep.title}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const detailLabel: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--espresso)",
  opacity: 0.45,
  marginBottom: "4px",
};
