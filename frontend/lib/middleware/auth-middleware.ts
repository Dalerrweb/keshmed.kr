import { type NextRequest, NextResponse } from "next/server";
import { getCurrentUser, isAdmin } from "@/lib/auth";

/**
 * Middleware to check if the user is authenticated
 */
export async function requireAuth(
	request: NextRequest,
	handler: (request: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
	const user = await getCurrentUser(request);

	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	return handler(request);
}

/**
 * Middleware to check if the user is an admin
 */
export async function requireAdmin(
	request: NextRequest,
	handler: (request: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
	const isUserAdmin = await isAdmin(request);

	if (!isUserAdmin) {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	return handler(request);
}
