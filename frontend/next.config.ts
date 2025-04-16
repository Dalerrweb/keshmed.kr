import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	// Ensure Next.js serves files from the public directory
	// This is the default behavior, but we're making it explicit
	experimental: {
		serverComponentsExternalPackages: ["sharp"],
	},
	env: {
		ALLOWED_ORIGIN: "http://localhost:3001",
	},
};

export default withNextIntl(nextConfig);
