import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { productSchema } from "@/lib/types";
import { unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { requireAdmin } from "@/lib/middleware/auth-middleware";

// GET a single product by ID - Public route
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		const product = await prisma.product.findUnique({
			where: { id },
		});

		if (!product || product.deletedAt) {
			return NextResponse.json(
				{ error: "Product not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(product);
	} catch (error) {
		console.error("Failed to fetch product:", error);
		return NextResponse.json(
			{ error: "Failed to fetch product" },
			{ status: 500 }
		);
	}
}

// PUT update a product - Protected route (admin only)
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	return requireAdmin(request, async () => {
		try {
			const { id } = await params;
			const body = await request.json();

			// Check if product exists
			const existingProduct = await prisma.product.findUnique({
				where: { id },
			});

			if (!existingProduct || existingProduct.deletedAt) {
				return NextResponse.json(
					{ error: "Product not found" },
					{ status: 404 }
				);
			}

			// Validate input
			const validatedData = productSchema.parse(body);

			// If image is being changed and there was an old image, delete the old one
			if (
				existingProduct.image &&
				validatedData.image &&
				existingProduct.image !== validatedData.image &&
				existingProduct.image.startsWith("/uploads/products/")
			) {
				try {
					// Get the file path from the URL
					const oldImagePath = path.join(
						process.cwd(),
						"public",
						existingProduct.image
					);

					// Check if file exists before attempting to delete
					if (existsSync(oldImagePath)) {
						await unlink(oldImagePath);
					}
				} catch (deleteError) {
					console.error("Failed to delete old image:", deleteError);
					// Continue with the update even if image deletion fails
				}
			}

			// Update product
			const updatedProduct = await prisma.product.update({
				where: { id },
				data: {
					...validatedData,
					updatedAt: new Date(),
				},
			});

			return NextResponse.json(updatedProduct);
		} catch (error: any) {
			console.error("Failed to update product:", error);

			if (error.name === "ZodError") {
				return NextResponse.json(
					{ error: "Validation error", details: error.errors },
					{ status: 400 }
				);
			}

			return NextResponse.json(
				{ error: "Failed to update product" },
				{ status: 500 }
			);
		}
	});
}

// DELETE a product (soft delete) - Protected route (admin only)
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	return requireAdmin(request, async () => {
		try {
			const { id } = await params;

			// Check if product exists
			const existingProduct = await prisma.product.findUnique({
				where: { id },
			});

			if (!existingProduct || existingProduct.deletedAt) {
				return NextResponse.json(
					{ error: "Product not found" },
					{ status: 404 }
				);
			}

			// Soft delete by setting deletedAt
			const deletedProduct = await prisma.product.update({
				where: { id },
				data: {
					deletedAt: new Date(),
					updatedAt: new Date(),
				},
			});

			return NextResponse.json({ success: true });
		} catch (error) {
			console.error("Failed to delete product:", error);
			return NextResponse.json(
				{ error: "Failed to delete product" },
				{ status: 500 }
			);
		}
	});
}

const partialProductSchema = productSchema.partial(); // ← делает все поля необязательными

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	return requireAdmin(request, async () => {
		try {
			const { id } = await params;
			const body = await request.json();

			// Check if product exists
			const existingProduct = await prisma.product.findUnique({
				where: { id },
			});

			if (!existingProduct || existingProduct.deletedAt) {
				return NextResponse.json(
					{ error: "Product not found" },
					{ status: 404 }
				);
			}

			// Partial validation
			const validatedData = partialProductSchema.parse(body);

			// Handle image deletion if changed
			if (
				existingProduct.image &&
				validatedData.image &&
				existingProduct.image !== validatedData.image &&
				existingProduct.image.startsWith("/uploads/products/")
			) {
				try {
					const oldImagePath = path.join(
						process.cwd(),
						"public",
						existingProduct.image
					);

					if (existsSync(oldImagePath)) {
						await unlink(oldImagePath);
					}
				} catch (deleteError) {
					console.error("Failed to delete old image:", deleteError);
				}
			}

			// Update product with only changed fields
			const updatedProduct = await prisma.product.update({
				where: { id },
				data: {
					...validatedData,
					updatedAt: new Date(),
				},
			});

			return NextResponse.json(updatedProduct);
		} catch (error: any) {
			console.error("Failed to update product:", error);

			if (error.name === "ZodError") {
				return NextResponse.json(
					{ error: "Validation error", details: error.errors },
					{ status: 400 }
				);
			}

			return NextResponse.json(
				{ error: "Failed to update product" },
				{ status: 500 }
			);
		}
	});
}
