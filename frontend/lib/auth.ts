import { compare, hash } from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import type { JWTPayload } from "./types";

// JWT constants
const JWT_SECRET = new TextEncoder().encode(
	process.env.JWT_SECRET || "your-secret-key-at-least-32-characters-long"
);
const JWT_EXPIRES_IN = "24h";

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
	return hash(password, 10);
}

/**
 * Compare a password with a hash
 */
export async function comparePassword(
	password: string,
	hashedPassword: string
): Promise<boolean> {
	return compare(password, hashedPassword);
}

/**
 * Create a JWT token
 */
export async function createToken(payload: JWTPayload): Promise<string> {
	const token = await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(JWT_EXPIRES_IN)
		.sign(JWT_SECRET);

	return token;
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
	try {
		const { payload } = await jwtVerify(token, JWT_SECRET);
		return payload as JWTPayload;
	} catch (error) {
		return null;
	}
}

/**
 * Get the JWT token from cookies or authorization header
 */
export function getTokenFromRequest(request: NextRequest): string | null {
	// Try to get token from Authorization header
	const authHeader = request.headers.get("authorization");
	if (authHeader && authHeader.startsWith("Bearer ")) {
		return authHeader.substring(7);
	}

	// Try to get token from cookies
	const cookieStore = cookies();
	const token = cookieStore.get("token")?.value;
	return token || null;
}

/**
 * Get the current user from the request
 */
export async function getCurrentUser(
	request: NextRequest
): Promise<JWTPayload | null> {
	const token = getTokenFromRequest(request);
	if (!token) return null;

	return verifyToken(token);
}

/**
 * Check if the user is authenticated and has admin role
 */
export async function isAdmin(request: NextRequest): Promise<boolean> {
	const user = await getCurrentUser(request);
	return !!user && user.role === "admin";
}
