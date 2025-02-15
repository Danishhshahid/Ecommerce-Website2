import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log('Middleware execution path:', request.nextUrl.pathname);
  
  const isLogin = request.cookies.get("isLogin")?.value;
  console.log('Login cookie value:', isLogin);

  const pathname = request.nextUrl.pathname.toLowerCase();

  if (pathname === "/") {
    if (isLogin !== "1") {
      console.log('Redirecting to login page');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

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
   
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};