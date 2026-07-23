"use client";

import Link from "next/link";
import Image from "next/image";

const nav = [
  { label: "Episodes", href: "/episodes" },
  { label: "Notes", href: "/newsletter" },
  { label: "About", href: "/about" },
  { label: "Nominate", href: "/nominate" },
  { label: "Sponsors", href: "/sponsors" },
];

const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "YouTube", href: "https://www.youtube.com" },
];

export function SiteFooter() {
  return (
    <footer className="oc-footer">
      <div className="oc-footer-inner">
        <div className="oc-footer-top">
          <Link href="/" className="oc-footer-brand">
            <Image
              src="/brand/oc-logo.jpg"
              alt="Owner's Circle"
              width={36}
              height={36}
              style={{ borderRadius: "50%", border: "1px solid rgba(201,162,94,0.3)" }}
            />
            <span className="wordmark" style={{ color: "var(--parchment)", fontSize: "17px" }}>
              Owner&apos;s Circle
            </span>
          </Link>

          <nav className="oc-footer-nav">
            {nav.map((l) => (
              <Link key={l.label} href={l.href} className="oc-foot-link">
                {l.label}
              </Link>
            ))}
            <span className="oc-footer-sep" aria-hidden />
            {social.map((l) => (
              <Link key={l.label} href={l.href} className="oc-foot-link" target="_blank" rel="noopener">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="oc-footer-base">
          <span>&copy; 2026 Owner&apos;s Circle</span>
        </div>
      </div>

      <style>{`
        .oc-footer {
          background: linear-gradient(180deg, var(--burgundy-deep) 0%, #3D0E14 100%);
          color: var(--parchment);
          padding: 48px 28px 32px;
          border-top: 1px solid rgba(201,162,94,0.12);
        }
        .oc-footer-inner {
          max-width: 960px;
          margin: 0 auto;
        }
        .oc-footer-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .oc-footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--parchment);
          text-decoration: none;
        }
        .oc-footer-nav {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .oc-footer-nav .oc-foot-link {
          font-size: 13px;
          color: var(--parchment);
          opacity: 0.45;
          transition: opacity 0.3s ease, color 0.3s ease;
          text-decoration: none;
        }
        .oc-footer-nav .oc-foot-link:hover {
          opacity: 1;
          color: var(--gold-champagne);
        }
        .oc-footer-sep {
          width: 1px;
          height: 14px;
          background: rgba(245,239,229,0.15);
        }
        .oc-footer-base {
          margin-top: 32px;
          padding-top: 20px;
          border-top: 1px solid rgba(245,239,229,0.08);
          font-size: 11px;
          color: var(--parchment);
          opacity: 0.25;
          letter-spacing: 0.04em;
        }
        @media (max-width: 760px) {
          .oc-footer-top { flex-direction: column; align-items: flex-start; }
          .oc-footer-nav { gap: 16px; }
          .oc-footer-sep { display: none; }
        }
      `}</style>
    </footer>
  );
}
