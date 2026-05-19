"use client";

import { useState } from "react";

export function EventWaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await fetch("/api/event-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `oc-event-${Date.now()}`,
          JSON.stringify({ ...data, timestamp: new Date().toISOString() })
        );
      }
      setSubmitted(true);
    } catch {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `oc-event-${Date.now()}`,
          JSON.stringify({ ...data, timestamp: new Date().toISOString() })
        );
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ padding: "24px 0" }}>
        <p className="serif" style={{ fontSize: "30px", color: "var(--ember)", marginBottom: "10px" }}>
          You&apos;re on the list.
        </p>
        <p style={{ fontSize: "15px", color: "rgba(243,236,225,0.7)" }}>
          We&apos;ll reach out when Owner&apos;s Circle Live has a date.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="oc-form">
      <div className="oc-grid-2">
        <div>
          <label className="oc-label">First name</label>
          <input type="text" name="firstName" required className="oc-input" placeholder="First name" />
        </div>
        <div>
          <label className="oc-label">Last name</label>
          <input type="text" name="lastName" required className="oc-input" placeholder="Last name" />
        </div>
      </div>
      <div>
        <label className="oc-label">Email</label>
        <input type="email" name="email" required className="oc-input" placeholder="you@email.com" />
      </div>
      <div>
        <label className="oc-label">What do you do?</label>
        <input type="text" name="role" className="oc-input" placeholder="Founder, operator, creator, etc." />
      </div>
      <button type="submit" className="pill" disabled={loading} style={{ alignSelf: "flex-start" }}>
        {loading ? "Joining…" : "Join the Event Waitlist"}
      </button>
      <style>{`
        .oc-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        @media (max-width:560px){ .oc-grid-2 { grid-template-columns:1fr; } }
      `}</style>
    </form>
  );
}
