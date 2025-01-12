import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

async function authenticate(formData: FormData) {
	"use server";

	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	// TODO: Implement your authentication logic here
	if (username === "admin" && password === "password") {
		redirect("/admin/products");
	}

	return { error: "Invalid credentials" };
}

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-96">
				<h1 className="text-2xl font-bold mb-6 text-center">
					Admin Login
				</h1>
				<LoginForm authenticate={authenticate} />
			</div>
		</div>
	);
}
