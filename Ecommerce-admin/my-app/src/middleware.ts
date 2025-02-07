import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Add debugging logs for production
  console.log('Middleware execution path:', request.nextUrl.pathname);
  
  const isLogin = request.cookies.get("isLogin")?.value;
  console.log('Login cookie value:', isLogin);

  // Normalize the pathname to handle case sensitivity
  const pathname = request.nextUrl.pathname.toLowerCase();

  // Handle root path
  if (pathname === "/") {
    if (isLogin !== "1") {
      console.log('Redirecting to login page');
      return NextResponse.redirect(new URL('/Login', request.url));
    }
  }

  // Handle login path (both /login and /Login)
  if (pathname === "/login") {
    if (isLogin === "1") {
      console.log('Redirecting to home page');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};