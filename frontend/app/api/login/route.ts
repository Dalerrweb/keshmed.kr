import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/db";
import { comparePassword, createToken } from "@/lib/auth";
import { loginSchema } from "@/lib/types";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		// Validate input
		const validatedData = loginSchema.parse(body);

		// Find user
		const user = await prisma.user.findUnique({
			where: { email: validatedData.email },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Verify password
		const isPasswordValid = await comparePassword(
			validatedData.password,
			user.passwordHash
		);

		if (!isPasswordValid) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// Create JWT token
		const token = await createToken({
			id: user.id,
			email: user.email,
			role: user.role,
		});

		// Set cookie
		// Set cookie
		const cookieStore = await cookies();
		cookieStore.set("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24, // 1 day
			path: "/",
		});

		return NextResponse.json({
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				role: user.role,
			},
			token,
		});
	} catch (error: any) {
		console.error("Failed to login:", error);

		if (error.name === "ZodError") {
			return NextResponse.json(
				{ error: "Validation error", details: error.errors },
				{ status: 400 }
			);
		}

		return NextResponse.json({ error: "Failed to login" }, { status: 500 });
	}
}
