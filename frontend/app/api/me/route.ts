import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
	try {
		const payload = await getCurrentUser(request);

		if (!payload) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 }
			);
		}

		// Get user from database (to get the latest data)
		const user = await prisma.user.findUnique({
			where: { id: payload.id },
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!user) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(user);
	} catch (error) {
		console.error("Failed to get current user:", error);
		return NextResponse.json(
			{ error: "Failed to get current user" },
			{ status: 500 }
		);
	}
}
