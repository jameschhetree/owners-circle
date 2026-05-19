"use client";

import { useState } from "react";

interface NewsletterFormProps {
  variant?: "full" | "inline";
  tone?: "field" | "paper";
}

export function NewsletterForm({ variant = "full", tone = "paper" }: NewsletterFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement)?.value || "",
    };

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `oc-newsletter-${Date.now()}`,
          JSON.stringify({ ...data, timestamp: new Date().toISOString() })
        );
      }
      setSubmitted(true);
    } catch {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          `oc-newsletter-${Date.now()}`,
          JSON.stringify({ ...data, timestamp: new Date().toISOString() })
        );
      }
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  const onField = tone === "field";

  if (submitted) {
    return (
      <div style={{ padding: "20px 0" }}>
        <p
          className="serif"
          style={{
            fontSize: "26px",
            color: onField ? "var(--bone)" : "var(--field)",
            marginBottom: "8px",
          }}
        >
          You&apos;re in. Welcome to the Circle.
        </p>
        <p
          style={{
            fontSize: "14px",
            color: onField ? "rgba(243,236,225,0.6)" : "#5a4a3c",
          }}
        >
          Watch your inbox for Inside the Circle.
        </p>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit}>
        <div className="news-form">
          <input
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            aria-label="Email address"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Joining…" : "Join the Circle"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="oc-form">
      <div className="oc-form-2">
        <div>
          <label className="oc-label">First name (optional)</label>
          <input type="text" name="firstName" className="oc-input" placeholder="First name" />
        </div>
        <div>
          <label className="oc-label">Email address</label>
          <input
            type="email"
            name="email"
            required
            className="oc-input"
            placeholder="you@company.com"
          />
        </div>
      </div>
      <button
        type="submit"
        className={onField ? "pill" : "pill"}
        disabled={loading}
        style={{ alignSelf: "flex-start", marginTop: "4px" }}
      >
        {loading ? "Joining…" : "Join the Circle"}
      </button>
      <style>{`
        .oc-form-2 { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        @media (max-width:560px){ .oc-form-2 { grid-template-columns:1fr; } }
      `}</style>
    </form>
  );
}
