"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginForm() {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get("authToken");
		if (token) {
			Cookies.remove("authToken");
		}
	}, []);

	const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsPending(true);
		setError(null);

		const formData = new FormData(event.target as HTMLFormElement);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			const response = await fetch(`${baseURL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to log in");
			}

			const data = await response.json();
			Cookies.set("authToken", data.token);
			router.push("/admin/products");
		} catch (err: any) {
			setError(err.message || "An unknown error occurred");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="mb-4">
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700"
				>
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-700"
				>
					Password
				</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
				/>
			</div>
			{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
			<button
				type="submit"
				disabled={isPending}
				className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
			>
				{isPending ? "Logging in..." : "Log in"}
			</button>
		</form>
	);
}
