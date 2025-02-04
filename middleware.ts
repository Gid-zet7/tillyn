import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req: any) {
    const { token, user } = req.kindeAuth || {};

    const { pathname } = req.nextUrl;

    // Protect the /dashboard route: Only accessible if the user has the 'admin' or 'seller' permission
    if (pathname.startsWith("/dashboard")) {
      if (
        !token?.permissions?.includes("admin") &&
        !token?.permissions?.includes("retailer")
      ) {
        return new Response("Forbidden", { status: 403 });
      }

      // For product management, sellers can only access their own products
      if (
        pathname.includes("/dashboard/products") &&
        token?.permissions?.includes("retailer")
      ) {
        const productId = pathname.split("/")[3];

        if (productId === undefined) return;

        if (productId !== "new") {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`
            );
            const product = await response.json();

            if (product?.seller?.email !== user?.email) {
              return new Response(
                "Forbidden: You can only manage your own products",
                { status: 403 }
              );
            }
          } catch (error) {
            console.error("Error checking product ownership:", error);
            return new Response("Internal Server Error", { status: 500 });
          }
        }
      }
    }

    // Protect other routes: Only accessible if the user is authenticated
    const protectedPaths = ["/profile", "/checkout"];
    if (protectedPaths.some((path) => pathname.startsWith(path))) {
      if (!user) {
        // console.log("User is not authenticated. Redirecting to login.");
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
    if (pathname.startsWith("/profile")) {
      const profileEmail = pathname.split("/")[2]; // Extract email from the URL path

      if (profileEmail !== user?.email) {
        // console.log(`Unauthorized access attempt to /profile/${profileEmail}`);
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
