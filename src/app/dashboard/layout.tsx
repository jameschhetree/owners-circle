import { cookies } from "next/headers";
import { DashboardShell } from "./DashboardShell";

export const metadata = {
  title: "Dashboard | Owner's Circle",
  robots: "noindex, nofollow",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("oc-dash-auth");
  const isAuthenticated = !!auth?.value;

  return <DashboardShell isLoginPage={!isAuthenticated}>{children}</DashboardShell>;
}
