import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = request.cookies.get("isLogin")?.value;

  // Redirect logic for different routes
  if (request.nextUrl.pathname === "/") {
    if (isLogin !== "1") {
      return NextResponse.redirect(new URL('/Login', request.url));
    }
  }

  if (request.nextUrl.pathname === "/Login") {
    if (isLogin === "1") {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/Login"]
};