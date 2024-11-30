import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/properties(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
	const isAdminUser =
		(await auth()).userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID;

	if (!isAdminUser && isAdminRoute(req)) {
		return NextResponse.redirect(new URL("/", req.url));
	}
	if (!isPublicRoute(req)) await auth.protect();
});
export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)"
	]
};
