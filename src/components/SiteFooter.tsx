"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const cols = [
  {
    title: "Owner's Circle",
    items: [
      { label: "Real owners. Real stories. Real rooms.", href: "/about" },
      { label: "DMV-first. Built to go national.", href: "/about" },
    ],
  },
  {
    title: "Explore",
    items: [
      { label: "Episodes", href: "/episodes" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Events", href: "/events" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Get Involved",
    items: [
      { label: "Join the Circle", href: "/newsletter" },
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
      { label: "X", href: "https://x.com" },
    ],
  },
];

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], [80, -20]);

  return (
    <footer
      ref={ref}
      style={{
        background: "var(--field-lo)",
        color: "var(--bone)",
        padding: "150px 56px 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        aria-hidden
        className="serif serif-it"
        style={{
          fontSize: "clamp(140px, 26vw, 320px)",
          lineHeight: 0.78,
          color: "rgba(224,112,60,0.10)",
          position: "absolute",
          right: "-20px",
          bottom: "-54px",
          pointerEvents: "none",
          x: reduce ? 0 : ghostX,
        }}
      >
        Circle
      </motion.div>

      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h2
          className="serif"
          style={{
            fontSize: "clamp(44px, 6.2vw, 88px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            maxWidth: "760px",
          }}
        >
          Don&apos;t just watch the circle.{" "}
          <em className="serif-it" style={{ color: "var(--ember)" }}>
            Join it.
          </em>
        </h2>

        <Link
          href="/newsletter"
          className="pill"
          style={{ marginTop: "44px", display: "inline-flex" }}
        >
          Join the Circle
        </Link>

        <div
          className="oc-foot-cols"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "40px",
            borderTop: "1px solid rgba(243,236,225,0.18)",
            marginTop: "90px",
            paddingTop: "60px",
          }}
        >
          {cols.map((c) => (
            <div key={c.title}>
              <div
                style={{
                  fontSize: "10.5px",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "var(--ember)",
                  marginBottom: "20px",
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
                    color: "rgba(243,236,225,0.6)",
                    marginBottom: "13px",
                    transition: "color 0.3s ease",
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
            color: "rgba(243,236,225,0.4)",
            marginTop: "70px",
            gap: "16px",
          }}
        >
          <span>© 2026 Owner&apos;s Circle</span>
          <span>The District · Maryland · Virginia</span>
        </div>
      </div>

      <style>{`
        .oc-foot-link:hover { color: var(--bone) !important; }
        @media (max-width: 760px) {
          .oc-foot-cols { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
          .oc-foot-base { flex-direction: column !important; }
        }
      `}</style>
    </footer>
  );
}
