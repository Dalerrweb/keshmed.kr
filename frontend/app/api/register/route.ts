import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { userSchema } from "@/lib/types";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		console.log("Request body:", body);

		// Validate input
		const validatedData = userSchema.parse(body);
		console.log("Validated data:", validatedData);

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email: validatedData.email },
		});
		console.log("Existing user:", existingUser);

		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 409 }
			);
		}

		// Hash password
		const passwordHash = await hashPassword(validatedData.password);
		console.log("Password hash:", passwordHash);

		// Create user
		const user = await prisma.user.create({
			data: {
				email: validatedData.email,
				passwordHash,
				name: validatedData.name,
				role: validatedData.role,
			},
			select: {
				id: true,
				email: true,
				name: true,
				role: true,
				createdAt: true,
			},
		});

		return NextResponse.json(user, { status: 201 });
	} catch (error: any) {
		console.error("Failed to register user:", error);

		if (error.name === "ZodError") {
			console.error("Validation error details:", error.errors);
			return NextResponse.json(
				{ error: "Validation error", details: error.errors },
				{ status: 400 }
			);
		}

		console.error("Unknown error:", error);
		return NextResponse.json(
			{ error: "Failed to register user" },
			{ status: 500 }
		);
	}
}
