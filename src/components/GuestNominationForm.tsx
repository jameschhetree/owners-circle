"use client";

import { useState } from "react";

export function GuestNominationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await fetch("/api/nominate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `oc-nomination-${Date.now()}`,
          JSON.stringify({ ...data, timestamp: new Date().toISOString() })
        );
      }
      setSubmitted(true);
    } catch {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `oc-nomination-${Date.now()}`,
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
          Nomination received.
        </p>
        <p style={{ fontSize: "15px", color: "rgba(243,236,225,0.7)" }}>
          We&apos;ll review and reach out. Thank you for helping build the circle.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="oc-form">
      <div className="oc-grid-2">
        <div>
          <label className="oc-label">Your name</label>
          <input type="text" name="yourName" required className="oc-input" placeholder="Your full name" />
        </div>
        <div>
          <label className="oc-label">Your email</label>
          <input type="email" name="yourEmail" required className="oc-input" placeholder="you@email.com" />
        </div>
      </div>
      <div className="oc-grid-2">
        <div>
          <label className="oc-label">Nominee name</label>
          <input type="text" name="guestName" required className="oc-input" placeholder="Nominee's full name" />
        </div>
        <div>
          <label className="oc-label">Nominee company</label>
          <input type="text" name="guestCompany" className="oc-input" placeholder="Company or organization" />
        </div>
      </div>
      <div className="oc-grid-2">
        <div>
          <label className="oc-label">Nominee role</label>
          <input type="text" name="guestRole" className="oc-input" placeholder="Founder, CEO, Operator…" />
        </div>
        <div>
          <label className="oc-label">Nominee email or LinkedIn</label>
          <input type="text" name="guestLink" className="oc-input" placeholder="https://linkedin.com/in/…" />
        </div>
      </div>
      <div>
        <label className="oc-label">What category fits them?</label>
        <select name="category" className="oc-input">
          <option value="">Select a category</option>
          <option>Ownership</option>
          <option>Growth</option>
          <option>Leadership</option>
          <option>Technology</option>
          <option>The Room</option>
        </select>
      </div>
      <div>
        <label className="oc-label">Why they belong — story, audience, business, or network</label>
        <textarea name="reason" required className="oc-input" placeholder="Tell us their story…" style={{ height: "120px" }} />
      </div>
      <button type="submit" className="pill" disabled={loading} style={{ alignSelf: "flex-start" }}>
        {loading ? "Sending…" : "Nominate a Guest"}
      </button>
      <style>{`
        .oc-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        @media (max-width:560px){ .oc-grid-2 { grid-template-columns:1fr; } }
      `}</style>
    </form>
  );
}
