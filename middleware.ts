import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth } from "next-auth/middleware";

export async function middleware(req: NextRequestWithAuth) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Role based access control
  const { pathname } = req.nextUrl;

  // if (/^\/products\/[^\/]+$/.test(pathname) && !token) {
  //   const loginUrl = new URL("/login", req.nextUrl);
  //   loginUrl.searchParams.set("auth", "denied");
  //   return NextResponse.redirect(loginUrl);
  // }

  // if (pathname === "/" && token?.role === "admin") {
  //   console.log('Redirecting to /home');
  //   console.log(token);
  //   console.log(token.role);
  //   return NextResponse.redirect(new URL("/home", req.nextUrl));
  // }

  // if (pathname === "/home" && token?.role !== "admin") {
  //   return NextResponse.rewrite(new URL("/denied", req.nextUrl));
  // }

  // return NextResponse.next();

  const publicRoutes = ["/", "/products"];

  const isAuthenticated = !!token;
  const isAdmin = token?.role === "admin";
  const isBasicUser = token?.role === "user";

  // Allow access to public routes
  if (publicRoutes.includes(pathname)) {
    // Redirect admin users to dashboard if they try to access "/"
    if (isAuthenticated && isAdmin && pathname === "/") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    return NextResponse.next();
  }

  // Protect single product pages (/products/:id)
  if (pathname.startsWith("/products/") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Protect admin dashboard
  if (pathname.startsWith("/home")) {
    if (!isAuthenticated || isBasicUser) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

// export const config = {
//     matcher: ['/profile', '/products/:name']
// }
