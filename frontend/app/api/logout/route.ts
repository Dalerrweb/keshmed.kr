import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
	const cookieStore = await cookies();

	// Clear the token cookie
	cookieStore.set("token", "", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		expires: new Date(0),
		path: "/",
	});

	return NextResponse.json({ success: true });
}
