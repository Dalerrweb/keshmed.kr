import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { productSchema } from "@/lib/types";
import { requireAdmin } from "@/lib/middleware/auth-middleware";

// GET all products - Public route
export async function GET(request: NextRequest) {
	try {
		// Get query parameters
		const { searchParams } = new URL(request.url);
		const category = searchParams.get("category");
		const search = searchParams.get("search");

		// Build filter conditions
		const where: any = { deletedAt: null };

		if (category) {
			where.category = category;
		}

		if (search) {
			where.OR = [
				{ name: { contains: search, mode: "insensitive" } },
				{ category: { contains: search, mode: "insensitive" } },
			];
		}

		// Get products with filters
		const products = await prisma.product.findMany({
			where,
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(products);
	} catch (error) {
		console.error("Failed to fetch products:", error);
		return NextResponse.json(
			{ error: "Failed to fetch products" },
			{ status: 500 }
		);
	}
}

// POST create a new product - Protected route (admin only)
export async function POST(request: NextRequest) {
	return requireAdmin(request, async (req) => {
		try {
			const body = await req.json();

			// Validate input
			const validatedData = productSchema.parse(body);

			// Create product
			const product = await prisma.product.create({
				data: {
					...validatedData,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			});

			return NextResponse.json(product, { status: 201 });
		} catch (error: any) {
			console.error("Failed to create product:", error);

			if (error.name === "ZodError") {
				return NextResponse.json(
					{ error: "Validation error", details: error.errors },
					{ status: 400 }
				);
			}

			return NextResponse.json(
				{ error: "Failed to create product" },
				{ status: 500 }
			);
		}
	});
}
