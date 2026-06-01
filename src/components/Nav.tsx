"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/nav";
import { WaitlistButton } from "@/components/Waitlist";

/**
 * Dir 2 chrome: tiny centered tracked wordmark, minimal nav, single bone pill.
 * `tone` controls contrast over field (bone) vs paper (ink) heroes.
 */
export function Nav({ tone = "field" }: { tone?: "field" | "paper" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onField = tone === "field";
  const linkColor = onField
    ? "rgba(243,236,225,0.62)"
    : "rgba(28,20,16,0.55)";
  const wmColor = onField ? "var(--bone)" : "var(--ink)";

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: scrolled ? "18px 40px" : "28px 56px",
        transition: "padding 0.5s cubic-bezier(0.16,1,0.3,1), background 0.5s ease",
        background: scrolled
          ? onField
            ? "rgba(60,13,10,0.72)"
            : "rgba(246,241,232,0.82)"
          : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
      }}
    >
      <nav
        className="oc-desktop-nav"
        style={{ display: "flex", gap: "34px", flex: 1 }}
      >
        {navLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontSize: "12px",
              letterSpacing: "0.02em",
              color: linkColor,
              transition: "color 0.3s ease",
            }}
            className="oc-navlink"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/"
        className="wordmark oc-wm"
        style={{
          flex: 1,
          textAlign: "center",
          color: wmColor,
          whiteSpace: "nowrap",
        }}
      >
        Owner&apos;s Circle
      </Link>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <WaitlistButton
          intent="Waitlist"
          source="Nav"
          className="pill oc-cta"
        >
          Join the Waitlist
        </WaitlistButton>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="oc-burger"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: wmColor,
            fontSize: "13px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: "64px",
            background: "var(--field)",
            color: "var(--bone)",
            zIndex: 199,
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="serif"
              style={{ fontSize: "34px", color: "var(--bone)" }}
            >
              {l.label}
            </Link>
          ))}
          <WaitlistButton
            intent="Waitlist"
            source="Nav (mobile)"
            className="pill"
            style={{ marginTop: "20px", alignSelf: "flex-start" }}
            onClick={() => setOpen(false)}
          >
            Join the Waitlist
          </WaitlistButton>
        </div>
      )}

      <style>{`
        .oc-navlink:hover { color: ${onField ? "var(--bone)" : "var(--field)"} !important; }
        @media (max-width: 880px) {
          .oc-desktop-nav { display: none !important; }
          .oc-cta { display: none !important; }
          .oc-burger { display: block !important; }
          .oc-wm { text-align: left !important; flex: 1 !important; }
        }
      `}</style>
    </header>
  );
}
