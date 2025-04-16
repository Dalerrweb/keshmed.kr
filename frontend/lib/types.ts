import { z } from "zod";

// Product schema for validation
export const productSchema = z.object({
	name: z.string().min(3).max(100),
	category: z.string().optional(),
	price: z.number().nonnegative().optional(),
	amount: z.number().nonnegative(),
	image: z.string().min(5).optional(),
});

export type Product = z.infer<typeof productSchema> & {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
};

export type ProductInput = z.infer<typeof productSchema>;

// User schema for validation
export const userSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	name: z.string().min(2).optional(),
	role: z.enum(["user", "admin"]).default("user"),
});

export type User = Omit<z.infer<typeof userSchema>, "password"> & {
	id: string;
	passwordHash: string;
	createdAt: Date;
	updatedAt: Date;
};

export type UserInput = z.infer<typeof userSchema>;

// Login schema
export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;

// JWT payload type
export type JWTPayload = {
	id: string;
	email: string;
	role: string;
	iat?: number;
	exp?: number;
};
