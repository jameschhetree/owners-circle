"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError("Invalid password");
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--ivory)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: "36px" }}>
          <Image
            src="/brand/oc-logo.jpg"
            alt="Owner's Circle"
            width={64}
            height={64}
            style={{
              borderRadius: "50%",
              border: "2px solid rgba(184,146,63,0.3)",
              margin: "0 auto 16px",
            }}
          />
          <h1
            style={{
              fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif",
              fontSize: "28px",
              fontWeight: 700,
              color: "var(--burgundy)",
              marginBottom: "6px",
            }}
          >
            Dashboard
          </h1>
          <p style={{ fontSize: "14px", color: "var(--espresso)", opacity: 0.45 }}>
            Owner&apos;s Circle Production
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "32px",
            border: "1px solid var(--rule)",
            boxShadow: "0 4px 24px -8px rgba(76,58,51,0.08)",
          }}
        >
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--espresso)",
                marginBottom: "8px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter dashboard password"
              autoFocus
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "10px",
                border: `1px solid ${error ? "var(--burgundy)" : "var(--taupe)"}`,
                background: "#fff",
                fontSize: "14px",
                fontFamily: "inherit",
                color: "var(--espresso)",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                fontSize: "13px",
                color: "var(--burgundy)",
                marginBottom: "16px",
                textAlign: "left",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "var(--burgundy)",
              color: "var(--ivory)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "background 0.2s ease, opacity 0.2s ease",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
