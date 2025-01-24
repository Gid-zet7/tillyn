import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: any) {
    const { token, user } = req.kindeAuth || {};

    const { pathname } = req.nextUrl;

    console.log("token", token);
    console.log("token", user);

    // Protect the /dashboard route: Only accessible if the user has the 'admin' permission
    if (pathname.startsWith("/dashboard")) {
      if (!token?.permissions?.includes("admin")) {
        console.log("User is not authorized to access /dashboard");
        return new Response("Forbidden", { status: 403 });
      }
    }

    // Protect other routes: Only accessible if the user is authenticated
    const protectedPaths = ["/profile", "/checkout"];
    if (protectedPaths.some((path) => pathname.startsWith(path))) {
      if (!user) {
        console.log("User is not authenticated. Redirecting to login.");
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
    if (pathname.startsWith("/profile")) {
      const profileEmail = pathname.split("/")[2]; // Extract email from the URL path

      if (profileEmail !== user?.email) {
        console.log(`Unauthorized access attempt to /profile/${profileEmail}`);
        return NextResponse.redirect(
          new URL(`/profile/${user?.email}`, req.url) // Redirect to the correct user's profile
        );
      }
    }
  },
  {
    isReturnToCurrentPage: true, // Redirects back to the page after login
    publicPaths: ["/public", "/products", "/privacypolicy", "/termsofservice"], // Paths that don't require authentication
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/checkout"],
};
