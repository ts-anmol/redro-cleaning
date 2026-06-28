import { auth } from "@/lib/auth";

// Next.js 16 renamed `middleware` to `proxy`. This protects every /admin route
// except the login page, redirecting unauthenticated users to /admin/login.
export default auth((req) => {
  const { pathname, origin } = req.nextUrl;

  const isLoginRoute = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute && !isLoginRoute && !req.auth) {
    return Response.redirect(new URL("/admin/login", origin));
  }

  // Already authenticated users shouldn't see the login page.
  if (isLoginRoute && req.auth) {
    return Response.redirect(new URL("/admin", origin));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
