"use client";

import { useState } from "react";

interface ProductFormProps {
	addProduct: (formData: FormData) => Promise<void>;
}

export default function ProductForm({ addProduct }: ProductFormProps) {
	const [isPending, setIsPending] = useState(false);

	return (
		<form
			action={async (formData) => {
				setIsPending(true);
				await addProduct(formData);
				setIsPending(false);
			}}
			className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
		>
			<div className="mb-4">
				<label
					htmlFor="name"
					className="block text-gray-700 text-sm font-bold mb-2"
				>
					Product Name
				</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="price"
					className="block text-gray-700 text-sm font-bold mb-2"
				>
					Price
				</label>
				<input
					type="number"
					id="price"
					name="price"
					required
					min="0"
					step="0.01"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			<button
				type="submit"
				disabled={isPending}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
			>
				{isPending ? "Adding..." : "Add Product"}
			</button>
		</form>
	);
}
