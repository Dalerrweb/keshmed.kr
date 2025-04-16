import { unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

/**
 * Deletes a file from the public directory
 * @param filePath The path relative to the public directory (e.g., /uploads/products/image.jpg)
 * @returns Promise<boolean> True if the file was deleted, false otherwise
 */
export async function deletePublicFile(filePath: string): Promise<boolean> {
	try {
		// Ensure the path starts with a slash and is within the uploads directory
		if (!filePath.startsWith("/uploads/")) {
			console.error("Invalid file path for deletion:", filePath);
			return false;
		}

		// Get the absolute path
		const absolutePath = path.join(process.cwd(), "public", filePath);

		// Check if file exists
		if (!existsSync(absolutePath)) {
			console.warn("File not found for deletion:", absolutePath);
			return false;
		}

		// Delete the file
		await unlink(absolutePath);
		return true;
	} catch (error) {
		console.error("Error deleting file:", error);
		return false;
	}
}

/**
 * Validates if a file type is allowed
 * @param mimeType The MIME type of the file
 * @param allowedTypes Array of allowed MIME types
 * @returns boolean True if the file type is allowed
 */
export function isAllowedFileType(
	mimeType: string,
	allowedTypes: string[]
): boolean {
	return allowedTypes.includes(mimeType);
}

/**
 * Validates if a file size is within the limit
 * @param fileSize The size of the file in bytes
 * @param maxSize The maximum allowed size in bytes
 * @returns boolean True if the file size is within the limit
 */
export function isFileSizeValid(fileSize: number, maxSize: number): boolean {
	return fileSize <= maxSize;
}
