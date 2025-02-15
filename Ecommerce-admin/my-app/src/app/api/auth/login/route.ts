import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (email === "danishhshahid@gmail.com" && password === "1234567") {
      const response = NextResponse.json({
        message: "Login Successful!",
        success: true
      });

      // Universal cookie settings (works for both dev and production)
      response.cookies.set({
        name: "isLogin",
        value: "1",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Auto-adapt security
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        // Remove explicit domain setting (let browsers handle it)
      });

      return response;
    } else {
      const response = NextResponse.json(
        { 
          message: "Invalid email or password",
          success: false
        },
        { status: 401 }
      );

      // Proper cookie invalidation
      response.cookies.set({
        name: "isLogin",
        value: "",
        path: "/",
        expires: new Date(0), // Immediate expiration
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      });

      return response;
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        message: "Authentication error", 
        success: false
      },
      { status: 500 }
    );
  }
}