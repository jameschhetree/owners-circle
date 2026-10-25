"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/dashboard", icon: "◈" },
  { label: "OC Podcast", href: "/dashboard/podcast", icon: "▶" },
  { label: "Owner's Notes", href: "/dashboard/notes", icon: "✎" },
  { label: "Prospects", href: "/dashboard/prospects", icon: "⚑" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/dashboard/login");
  }

  const sidebarContent = (
    <>
      <div style={{ padding: "28px 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image
            src="/brand/oc-logo.jpg"
            alt="OC"
            width={40}
            height={40}
            style={{ borderRadius: "50%", border: "2px solid rgba(184,146,63,0.3)" }}
          />
          <span
            style={{
              fontFamily: "var(--font-serif), 'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#fff",
              letterSpacing: "0.02em",
            }}
          >
            Owner&apos;s Circle
          </span>
        </Link>
      </div>

      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: active ? 600 : 400,
                color: active ? "#fff" : "rgba(255,255,255,0.55)",
                background: active ? "rgba(184,146,63,0.18)" : "transparent",
                borderLeft: active ? "3px solid var(--gold)" : "3px solid transparent",
                marginBottom: "4px",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "transparent",
            color: "rgba(255,255,255,0.5)",
            fontSize: "13px",
            fontFamily: "inherit",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          Log Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        style={{
          width: "260px",
          minHeight: "100vh",
          background: "var(--burgundy-deep)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 100,
        }}
        className="dash-sidebar-desktop"
      >
        {sidebarContent}
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="dash-hamburger"
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 200,
          width: "44px",
          height: "44px",
          borderRadius: "10px",
          background: "var(--burgundy-deep)",
          border: "none",
          color: "#fff",
          fontSize: "20px",
          cursor: "pointer",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="dash-mobile-overlay"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 150,
            }}
          >
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "260px",
                height: "100%",
                background: "var(--burgundy-deep)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {sidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .dash-sidebar-desktop { display: none !important; }
          .dash-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
