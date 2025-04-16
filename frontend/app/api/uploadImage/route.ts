import { NextResponse, type NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { requireAdmin } from "@/lib/middleware/auth-middleware";

// Supported image types
const ALLOWED_FILE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Ensure upload directory exists
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "products");

// POST upload an image - Protected route (admin only)
export async function POST(request: NextRequest) {
	return requireAdmin(request, async (req) => {
		try {
			// Ensure upload directory exists
			if (!existsSync(UPLOAD_DIR)) {
				await mkdir(UPLOAD_DIR, { recursive: true });
			}

			const formData = await req.formData();
			const file = formData.get("file") as File | null;

			// Validate file exists
			if (!file) {
				return NextResponse.json(
					{ error: "No file provided" },
					{ status: 400 }
				);
			}

			// Validate file type
			if (!ALLOWED_FILE_TYPES.includes(file.type)) {
				return NextResponse.json(
					{
						error: "Invalid file type. Supported types: JPEG, PNG, WebP, GIF",
					},
					{ status: 400 }
				);
			}

			// Validate file size
			if (file.size > MAX_FILE_SIZE) {
				return NextResponse.json(
					{ error: "File size exceeds the 5MB limit" },
					{ status: 400 }
				);
			}

			// Generate a unique filename
			const fileExtension = file.name.split(".").pop();
			const fileName = `${uuidv4()}.${fileExtension}`;
			const filePath = path.join(UPLOAD_DIR, fileName);

			// Convert file to buffer and save it
			const buffer = Buffer.from(await file.arrayBuffer());
			await writeFile(filePath, buffer);

			// Generate the public URL for the file
			const fileUrl = `/uploads/products/${fileName}`;

			return NextResponse.json({
				success: true,
				url: fileUrl,
				fileName: fileName,
			});
		} catch (error) {
			console.error("Error uploading image:", error);
			return NextResponse.json(
				{ error: "Failed to upload image" },
				{ status: 500 }
			);
		}
	});
}

// Set the maximum request body size
export const config = {
	api: {
		bodyParser: false,
	},
};
