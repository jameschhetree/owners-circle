"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Episode } from "@/lib/dashboard-types";
import { podcastChecklist, notesChecklist } from "@/lib/checklist-templates";

export function NewEpisodeModal({
  type,
  open,
  onClose,
  onSave,
}: {
  type: "podcast" | "notes";
  open: boolean;
  onClose: () => void;
  onSave: (ep: Episode) => void;
}) {
  const [title, setTitle] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestCompany, setGuestCompany] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const ep: Episode = {
      id: crypto.randomUUID(),
      title: title.trim(),
      type,
      status: "active",
      guestName: type === "podcast" ? guestName.trim() || undefined : undefined,
      guestCompany: type === "podcast" ? guestCompany.trim() || undefined : undefined,
      topic: type === "notes" ? topic.trim() || undefined : undefined,
      createdAt: new Date().toISOString(),
      checklist: type === "podcast" ? podcastChecklist() : notesChecklist(),
      notes: notes.trim(),
    };

    onSave(ep);
    setTitle("");
    setGuestName("");
    setGuestCompany("");
    setTopic("");
    setNotes("");
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(76,58,51,0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "32px",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 24px 80px -16px rgba(76,58,51,0.25)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--burgundy)",
                marginBottom: "24px",
              }}
            >
              New {type === "podcast" ? "Podcast Episode" : "Owner's Note"}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Episode title"
                  required
                  style={inputStyle}
                />
              </div>

              {type === "podcast" && (
                <>
                  <div>
                    <label style={labelStyle}>Guest Name</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Guest full name"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Guest Company</label>
                    <input
                      type="text"
                      value={guestCompany}
                      onChange={(e) => setGuestCompany(e.target.value)}
                      placeholder="Company name"
                      style={inputStyle}
                    />
                  </div>
                </>
              )}

              {type === "notes" && (
                <div>
                  <label style={labelStyle}>Topic</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Episode topic / thesis"
                    style={inputStyle}
                  />
                </div>
              )}

              <div>
                <label style={labelStyle}>Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any initial notes..."
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button type="submit" style={primaryBtnStyle}>
                  Create Episode
                </button>
                <button type="button" onClick={onClose} style={cancelBtnStyle}>
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--espresso)",
  marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "8px",
  border: "1px solid var(--taupe)",
  background: "#fff",
  fontSize: "14px",
  fontFamily: "inherit",
  color: "var(--espresso)",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const primaryBtnStyle: React.CSSProperties = {
  padding: "12px 24px",
  borderRadius: "8px",
  border: "none",
  background: "var(--burgundy)",
  color: "var(--ivory)",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 0.2s ease",
};

const cancelBtnStyle: React.CSSProperties = {
  padding: "12px 24px",
  borderRadius: "8px",
  border: "1px solid var(--rule)",
  background: "transparent",
  color: "var(--espresso)",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
};
