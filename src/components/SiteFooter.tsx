"use client";

import Link from "next/link";
import Image from "next/image";
import { WaitlistButton } from "@/components/Waitlist";

const cols = [
  {
    title: "Explore",
    items: [
      { label: "Episodes", href: "/episodes" },
      { label: "Owner's Notes", href: "/newsletter" },
      { label: "Events", href: "/events" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Get Involved",
    items: [
      { label: "Subscribe", href: "/newsletter" },
      { label: "Nominate a Guest", href: "/nominate" },
      { label: "Sponsor / Partner", href: "/sponsors" },
    ],
  },
  {
    title: "Follow",
    items: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "Instagram", href: "https://www.instagram.com" },
      { label: "YouTube", href: "https://www.youtube.com" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer
      style={{
        background: "var(--espresso)",
        color: "var(--parchment)",
        padding: "100px 28px 48px",
        position: "relative",
        borderTop: "none",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "40px",
          }}
        >
          <Image
            src="/brand/oc-logo.jpg"
            alt="Owner's Circle"
            width={48}
            height={48}
            style={{ borderRadius: "50%" }}
          />
          <span className="wordmark" style={{ color: "var(--parchment)" }}>
            Owner&apos;s Circle
          </span>
        </div>

        <h2
          className="serif"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            lineHeight: 1.08,
            color: "var(--parchment)",
            maxWidth: "500px",
            marginBottom: "32px",
          }}
        >
          Don&apos;t just watch the circle.{" "}
          <em className="serif-it" style={{ color: "var(--gold-champagne)" }}>
            Join it.
          </em>
        </h2>

        <WaitlistButton
          intent="Newsletter"
          source="Footer"
          className="pill"
          style={{ display: "inline-flex" }}
        >
          Subscribe Free
        </WaitlistButton>

        <div
          className="oc-foot-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "40px",
            borderTop: "1px solid rgba(245, 239, 229, 0.15)",
            marginTop: "72px",
            paddingTop: "48px",
          }}
        >
          {cols.map((c) => (
            <div key={c.title}>
              <div
                style={{
                  fontSize: "10.5px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "18px",
                  fontWeight: 600,
                }}
              >
                {c.title}
              </div>
              {c.items.map((it) => (
                <Link
                  key={it.label}
                  href={it.href}
                  className="oc-foot-link"
                  style={{
                    display: "block",
                    fontSize: "14px",
                    color: "var(--parchment)",
                    opacity: 0.5,
                    marginBottom: "12px",
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {it.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div
          className="oc-foot-base"
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "var(--parchment)",
            opacity: 0.35,
            marginTop: "56px",
            gap: "16px",
          }}
        >
          <span>&copy; 2026 Owner&apos;s Circle</span>
          <span>The District &middot; Maryland &middot; Virginia</span>
        </div>
      </div>

      <style>{`
        .oc-foot-link:hover { opacity: 1 !important; color: var(--gold-champagne) !important; }
        @media (max-width: 760px) {
          .oc-foot-cols { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .oc-foot-base { flex-direction: column !important; }
        }
      `}</style>
    </footer>
  );
}
