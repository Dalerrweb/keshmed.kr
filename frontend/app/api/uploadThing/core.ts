import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique route key
	imageUploader: f({ image: { maxFileSize: "4MB" } })
		// Set permissions and file types for this FileRoute
		.middleware(async ({ req }) => {
			// This code runs on your server before upload
			// You can use this to verify authentication
			const auth = req.headers.get("authorization");

			// This is a simplified check - implement your actual auth logic
			if (!auth) {
				throw new Error("Unauthorized");
			}

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { auth };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log("Upload complete with auth:", metadata.auth);
			console.log("file url", file.url);

			// Return the file URL or any other data you want to send back
			return { url: file.url };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
