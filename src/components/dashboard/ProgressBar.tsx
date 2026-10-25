"use client";

export function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          flex: 1,
          height: "6px",
          borderRadius: "3px",
          background: "var(--ivory)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: "3px",
            background: "linear-gradient(90deg, #B8923F, #D4AF5A)",
            transition: "width 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </div>
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "var(--espresso)",
          opacity: 0.6,
          minWidth: "42px",
          textAlign: "right",
        }}
      >
        {done}/{total}
      </span>
    </div>
  );
}
