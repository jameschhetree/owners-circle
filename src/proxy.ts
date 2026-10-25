import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, verifySession } from "@/lib/studio-auth";
export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname !== "/dashboard/login" &&
    !verifySession(request.cookies.get(COOKIE)?.value)
  )
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  return NextResponse.next();
}
export const config = { matcher: ["/dashboard/:path*"] };
