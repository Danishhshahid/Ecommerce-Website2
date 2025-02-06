import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (email === "danishhshahid@gmail.com" && password === "1234567") {
      const response = NextResponse.json({ message: "Login Successful!" });
      
      // Set secure, httpOnly cookie
      response.cookies.set("isLogin", "1", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });

      return response;
    } else {
      const response = NextResponse.json(
        { message: "Invalid email or password" }, 
        { status: 401 }
      );
      
      // Clear login cookie on failed attempt
      response.cookies.set("isLogin", "0", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 0 // Immediately expire the cookie
      });

      return response;
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Authentication error", error }, 
      { status: 500 }
    );
  }
}