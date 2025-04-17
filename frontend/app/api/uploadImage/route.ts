import { type NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

// Initialize the uploadthing API
const utapi = new UTApi();

export async function POST(request: NextRequest) {
	try {
		// Check for authorization if needed
		const authHeader = request.headers.get("Authorization");
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		// Extract the token
		const token = authHeader.split(" ")[1];

		// Here you would validate the token
		// This is a placeholder for your actual auth logic
		if (!token) {
			return NextResponse.json(
				{ message: "Invalid token" },
				{ status: 401 }
			);
		}

		// Parse the multipart form data
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json(
				{ message: "No file provided" },
				{ status: 400 }
			);
		}

		// Check file type (optional)
		if (!file.type.startsWith("image/")) {
			return NextResponse.json(
				{ message: "File must be an image" },
				{ status: 400 }
			);
		}

		// Upload the file using uploadthing
		const uploadResponse = await utapi.uploadFiles(file);

		console.log(uploadResponse);

		if (!uploadResponse || !uploadResponse.data) {
			return NextResponse.json(
				{ message: "Failed to upload file" },
				{ status: 500 }
			);
		}

		// Return the URL of the uploaded file
		return NextResponse.json({
			url: uploadResponse.data.url,
			message: "File uploaded successfully",
		});
	} catch (error) {
		console.error("Error uploading file:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
