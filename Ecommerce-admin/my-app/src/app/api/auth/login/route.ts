import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (email === "danishhshahid@gmail.com" && password === "1234567") {
      const response = NextResponse.json(
        { 
          message: "Login Successful!",
          // Add a success flag for frontend validation
          success: true 
        }
      );
      
      // Modified cookie settings
      response.cookies.set("isLogin", "1", {
        httpOnly: true,
        secure: true, // Always use secure in modern apps
        sameSite: 'lax', // Changed from strict to lax for better compatibility
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        // Add domain in production
        ...(process.env.NODE_ENV === 'production' && {
          domain: process.env.NEXT_PUBLIC_DOMAIN || '.vercel.app'
        })
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

      // Clear the cookie
      response.cookies.delete("isLogin");

      return response;
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        message: "Authentication error", 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}