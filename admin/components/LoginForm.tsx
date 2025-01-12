"use client";

import { useActionState, useState } from "react";

interface LoginFormProps {
	authenticate: (
		formData: FormData
	) => Promise<{ error: string } | undefined>;
}

export default function LoginForm({ authenticate }: LoginFormProps) {
	const [state, formAction] = useActionState(authenticate, undefined);
	const [isPending, setIsPending] = useState(false);

	return (
		<form
			action={async (formData) => {
				setIsPending(true);
				await formAction(formData);
				setIsPending(false);
			}}
		>
			<div className="mb-4">
				<label
					htmlFor="username"
					className="block text-sm font-medium text-gray-700"
				>
					Username
				</label>
				<input
					type="text"
					id="username"
					name="username"
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
			{state?.error && (
				<p className="text-red-500 text-sm mb-4">{state.error}</p>
			)}
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
