"use client";

import { useState } from "react";

export function SponsorInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `oc-sponsor-${Date.now()}`,
          JSON.stringify({ ...data, timestamp: new Date().toISOString() })
        );
      }
      setSubmitted(true);
    } catch {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `oc-sponsor-${Date.now()}`,
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
          Inquiry received.
        </p>
        <p style={{ fontSize: "15px", color: "rgba(243,236,225,0.7)" }}>
          We&apos;ll be in touch to start the conversation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="oc-form">
      <div className="oc-grid-2">
        <div>
          <label className="oc-label">Contact name</label>
          <input type="text" name="contactName" required className="oc-input" placeholder="Your full name" />
        </div>
        <div>
          <label className="oc-label">Company</label>
          <input type="text" name="company" required className="oc-input" placeholder="Company name" />
        </div>
      </div>
      <div className="oc-grid-2">
        <div>
          <label className="oc-label">Email</label>
          <input type="email" name="email" required className="oc-input" placeholder="you@company.com" />
        </div>
        <div>
          <label className="oc-label">Website</label>
          <input type="url" name="website" className="oc-input" placeholder="https://" />
        </div>
      </div>
      <div>
        <label className="oc-label">Interest area</label>
        <select name="interestArea" required className="oc-input">
          <option value="">Select an area</option>
          <option>Podcast sponsorship</option>
          <option>Newsletter sponsorship</option>
          <option>Event sponsorship</option>
          <option>Community partnership</option>
          <option>Content collaboration</option>
          <option>Multiple / Custom</option>
        </select>
      </div>
      <div>
        <label className="oc-label">Message</label>
        <textarea
          name="message"
          className="oc-input"
          placeholder="Tell us about your goals and how you'd like to partner."
          style={{ height: "120px" }}
        />
      </div>
      <button type="submit" className="pill" disabled={loading} style={{ alignSelf: "flex-start" }}>
        {loading ? "Sending…" : "Start the Conversation"}
      </button>
      <style>{`
        .oc-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        @media (max-width:560px){ .oc-grid-2 { grid-template-columns:1fr; } }
      `}</style>
    </form>
  );
}
