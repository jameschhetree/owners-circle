"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Prospect, ProspectStatus } from "@/lib/dashboard-types";

export function NewProspectModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (p: Prospect) => void;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<ProspectStatus>("identified");
  const [notes, setNotes] = useState("");
  const [source, setSource] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !company.trim()) return;

    const p: Prospect = {
      id: crypto.randomUUID(),
      name: name.trim(),
      company: company.trim(),
      role: role.trim(),
      linkedIn: linkedIn.trim() || undefined,
      twitter: twitter.trim() || undefined,
      email: email.trim() || undefined,
      status,
      notes: notes.trim(),
      source: source.trim(),
      addedAt: new Date().toISOString(),
    };

    onSave(p);
    setName("");
    setCompany("");
    setRole("");
    setLinkedIn("");
    setTwitter("");
    setEmail("");
    setStatus("identified");
    setNotes("");
    setSource("");
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
              maxWidth: "520px",
              maxHeight: "90vh",
              overflowY: "auto",
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
              Add Prospect
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Company *</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company"
                    required
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={labelStyle}>Role</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Title / Role"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProspectStatus)}
                    style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}
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
              </div>

              <div>
                <label style={labelStyle}>LinkedIn</label>
                <input
                  type="url"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={labelStyle}>Twitter / X</label>
                  <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="@handle"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@company.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Source</label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="How you found them"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Why they'd be a good guest..."
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button type="submit" style={primaryBtnStyle}>
                  Add Prospect
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
