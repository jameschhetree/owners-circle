"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";

export function DashboardShell({
  children,
  isLoginPage,
}: {
  children: React.ReactNode;
  isLoginPage: boolean;
}) {
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--ivory)" }}>
      <Sidebar />
      <main
        className="dash-main"
        style={{
          flex: 1,
          marginLeft: "260px",
          padding: "32px 40px",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
      <style>{`
        @media (max-width: 768px) {
          .dash-main {
            margin-left: 0 !important;
            padding: 72px 20px 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
