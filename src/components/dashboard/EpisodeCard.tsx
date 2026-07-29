"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Episode } from "@/lib/dashboard-types";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";
import { ChecklistPhaseView } from "./ChecklistPhase";

function countItems(ep: Episode) {
  let done = 0;
  let total = 0;
  for (const phase of ep.checklist) {
    for (const item of phase.items) {
      total++;
      if (item.completed) done++;
    }
  }
  return { done, total };
}

export function EpisodeCard({
  episode,
  onUpdate,
  onDelete,
}: {
  episode: Episode;
  onUpdate: (ep: Episode) => void;
  onDelete?: (id: string, type: "podcast" | "notes") => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { done, total } = countItems(episode);

  function toggleItem(itemId: string) {
    const updated: Episode = {
      ...episode,
      checklist: episode.checklist.map((phase) => ({
        ...phase,
        items: phase.items.map((item) =>
          item.id === itemId
            ? {
                ...item,
                completed: !item.completed,
                completedAt: !item.completed ? new Date().toISOString() : undefined,
              }
            : item
        ),
      })),
    };
    onUpdate(updated);
  }

  function setStatus(status: Episode["status"]) {
    onUpdate({ ...episode, status });
  }

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--rule)",
        borderRadius: "12px",
        padding: "20px 24px",
        marginBottom: "12px",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          cursor: "pointer",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div
            style={{
              fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif",
              fontSize: "18px",
              fontWeight: 600,
              color: "var(--burgundy)",
              marginBottom: "4px",
            }}
          >
            {episode.title}
          </div>
          {episode.type === "podcast" && episode.guestName && (
            <div style={{ fontSize: "13px", color: "var(--espresso)", opacity: 0.6 }}>
              {episode.guestName}
              {episode.guestCompany ? ` - ${episode.guestCompany}` : ""}
            </div>
          )}
          {episode.type === "notes" && episode.topic && (
            <div style={{ fontSize: "13px", color: "var(--espresso)", opacity: 0.6 }}>
              {episode.topic}
            </div>
          )}
        </div>
        <div style={{ width: "160px" }}>
          <ProgressBar done={done} total={total} />
        </div>
        <StatusBadge status={episode.status} variant="episode" />
        <span
          style={{
            fontSize: "18px",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
            color: "var(--espresso)",
            opacity: 0.4,
          }}
        >
          &#9660;
        </span>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                borderTop: "1px solid var(--rule)",
                marginTop: "16px",
                paddingTop: "16px",
              }}
            >
              {episode.checklist.map((phase, i) => (
                <ChecklistPhaseView key={i} phase={phase} onToggleItem={toggleItem} />
              ))}

              {episode.notes && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "12px 16px",
                    background: "var(--ivory)",
                    borderRadius: "8px",
                    fontSize: "13px",
                    color: "var(--espresso)",
                    opacity: 0.7,
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {episode.notes}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "16px",
                  flexWrap: "wrap",
                }}
              >
                {episode.status !== "completed" && (
                  <button
                    onClick={() => setStatus("completed")}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid var(--rule)",
                      background: "var(--burgundy)",
                      color: "var(--ivory)",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                    }}
                  >
                    Mark Completed
                  </button>
                )}
                {episode.status !== "archived" && (
                  <button
                    onClick={() => setStatus("archived")}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid var(--rule)",
                      background: "transparent",
                      color: "var(--espresso)",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      opacity: 0.6,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    Archive
                  </button>
                )}
                {episode.status !== "active" && (
                  <button
                    onClick={() => setStatus("active")}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "1px solid var(--rule)",
                      background: "transparent",
                      color: "var(--espresso)",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      opacity: 0.6,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    Reactivate
                  </button>
                )}
                <div style={{ marginLeft: "auto" }}>
                  {confirmDelete ? (
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", color: "#b91c1c", fontWeight: 600 }}>Delete?</span>
                      <button
                        onClick={() => onDelete?.(episode.id, episode.type)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "8px",
                          border: "1px solid #b91c1c",
                          background: "#b91c1c",
                          color: "#fff",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Yes, delete
                      </button>
                      <button
                        onClick={() => setConfirmDelete(false)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "8px",
                          border: "1px solid var(--rule)",
                          background: "transparent",
                          color: "var(--espresso)",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(true)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "1px solid #fecaca",
                        background: "transparent",
                        color: "#b91c1c",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        opacity: 0.7,
                        transition: "opacity 0.2s ease",
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
