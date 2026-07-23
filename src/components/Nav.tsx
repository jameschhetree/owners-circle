"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { WaitlistButton } from "@/components/Waitlist";

const links = [
  { label: "Episodes", href: "/episodes" },
  { label: "Notes", href: "/newsletter" },
  { label: "About", href: "/about" },
] as const;

export function Nav({ tone = "ivory" }: { tone?: "ivory" | "burgundy" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onBurgundy = tone === "burgundy";
  const linkColor = onBurgundy
    ? "rgba(245,239,229,0.65)"
    : "rgba(76,58,51,0.6)";
  const wmColor = onBurgundy ? "var(--parchment)" : "var(--burgundy)";

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
        padding: scrolled ? "14px 28px" : "22px 40px",
        transition:
          "padding 0.5s cubic-bezier(0.16,1,0.3,1), background 0.5s ease",
        background: scrolled
          ? onBurgundy
            ? "rgba(97, 24, 35, 0.82)"
            : "rgba(251, 248, 242, 0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: wmColor,
          whiteSpace: "nowrap",
        }}
      >
        <Image
          src="/brand/oc-logo.jpg"
          alt="Owner's Circle"
          width={44}
          height={44}
          style={{ borderRadius: "50%", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)" }}
        />
        <span className="wordmark oc-wm">Owner&apos;s Circle</span>
      </Link>

      <nav
        className="oc-desktop-nav"
        style={{ display: "flex", gap: "32px", alignItems: "center" }}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              fontSize: "13px",
              letterSpacing: "0.02em",
              color: linkColor,
              transition: "color 0.3s ease",
              fontWeight: 500,
            }}
            className="oc-navlink"
          >
            {l.label}
          </Link>
        ))}
        <WaitlistButton
          intent="Newsletter"
          source="Nav"
          className="pill oc-cta"
          style={{ fontSize: "11px", padding: "11px 22px" }}
        >
          Subscribe
        </WaitlistButton>
      </nav>

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
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        {open ? "Close" : "Menu"}
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            top: "60px",
            background: onBurgundy ? "var(--burgundy-deep)" : "var(--ivory)",
            color: onBurgundy ? "var(--parchment)" : "var(--espresso)",
            zIndex: 199,
            padding: "48px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="serif"
              style={{
                fontSize: "36px",
                color: onBurgundy ? "var(--parchment)" : "var(--burgundy)",
                borderBottom: `1px solid ${onBurgundy ? "rgba(245,239,229,0.15)" : "var(--taupe)"}`,
                paddingBottom: "20px",
              }}
            >
              {l.label}
            </Link>
          ))}
          <WaitlistButton
            intent="Newsletter"
            source="Nav (mobile)"
            className={onBurgundy ? "pill pill-gold" : "pill"}
            style={{ marginTop: "12px", alignSelf: "flex-start" }}
            onClick={() => setOpen(false)}
          >
            Subscribe
          </WaitlistButton>
        </div>
      )}

      <style>{`
        .oc-navlink:hover { color: ${onBurgundy ? "var(--parchment)" : "var(--burgundy)"} !important; }
        @media (max-width: 880px) {
          .oc-desktop-nav { display: none !important; }
          .oc-burger { display: block !important; }
          .oc-wm { font-size: 17px !important; }
        }
      `}</style>
    </header>
  );
}
