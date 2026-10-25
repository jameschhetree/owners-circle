"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChecklistPhase as Phase } from "@/lib/dashboard-types";

export function ChecklistPhaseView({
  phase,
  onToggleItem,
}: {
  phase: Phase;
  onToggleItem: (itemId: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const done = phase.items.filter((i) => i.completed).length;
  const total = phase.items.length;

  return (
    <div style={{ marginBottom: "8px" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: "100%",
          padding: "10px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--espresso)",
          letterSpacing: "0.02em",
          textAlign: "left",
        }}
      >
        <span
          style={{
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            fontSize: "10px",
          }}
        >
          &#9654;
        </span>
        {phase.name}
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: done === total ? "#16A34A" : "var(--gold)",
            marginLeft: "auto",
          }}
        >
          {done}/{total}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingLeft: "4px", paddingBottom: "8px" }}>
              {phase.items.map((item) => (
                <label
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "7px 0",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: item.completed ? "rgba(76,58,51,0.4)" : "var(--espresso)",
                    textDecoration: item.completed ? "line-through" : "none",
                    transition: "color 0.2s ease",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => onToggleItem(item.id)}
                    style={{
                      width: "18px",
                      height: "18px",
                      marginTop: "1px",
                      accentColor: "var(--burgundy)",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
