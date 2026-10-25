"use client";

import type { ProspectStatus } from "@/lib/dashboard-types";

const prospectColors: Record<ProspectStatus, { bg: string; color: string }> = {
  identified: { bg: "rgba(76,58,51,0.1)", color: "#4C3A33" },
  researched: { bg: "rgba(59,130,246,0.12)", color: "#2563EB" },
  contacted: { bg: "rgba(184,146,63,0.15)", color: "#96751F" },
  confirmed: { bg: "rgba(34,197,94,0.12)", color: "#16A34A" },
  scheduled: { bg: "rgba(122,31,43,0.12)", color: "#7A1F2B" },
  completed: { bg: "rgba(76,58,51,0.85)", color: "#FBF8F2" },
  declined: { bg: "rgba(76,58,51,0.06)", color: "rgba(76,58,51,0.45)" },
};

const episodeColors: Record<string, { bg: string; color: string }> = {
  active: { bg: "rgba(34,197,94,0.12)", color: "#16A34A" },
  completed: { bg: "rgba(76,58,51,0.85)", color: "#FBF8F2" },
  archived: { bg: "rgba(76,58,51,0.06)", color: "rgba(76,58,51,0.45)" },
};

export function StatusBadge({
  status,
  variant = "prospect",
}: {
  status: string;
  variant?: "prospect" | "episode";
}) {
  const colors =
    variant === "prospect"
      ? prospectColors[status as ProspectStatus] || prospectColors.identified
      : episodeColors[status] || episodeColors.active;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "capitalize",
        background: colors.bg,
        color: colors.color,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}
