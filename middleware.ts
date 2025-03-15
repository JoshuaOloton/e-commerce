import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

export async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Role based access control
  const { pathname } = req.nextUrl;

  if (/^\/products\/[^\/]+$/.test(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (pathname === "/" && token?.role === "admin") {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }

  if (pathname === "/home" && token?.role !== "admin") {
    return NextResponse.rewrite(new URL("/denied", req.nextUrl));
  }

  return NextResponse.next();
}

// export const config = {
//     matcher: ['/profile', '/products/:name']
// }
