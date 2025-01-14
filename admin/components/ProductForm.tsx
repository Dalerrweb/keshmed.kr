"use client";

import { useState } from "react";
import Cookies from "js-cookie";

export default function ProductForm() {
	const [isPending, setIsPending] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsPending(true);

		const formData = new FormData(event.target as HTMLFormElement);
		const productData = {
			name: formData.get("name") as string,
			category: formData.get("category") as string,
			price: parseFloat(formData.get("price") as string),
			amount: parseFloat(formData.get("amount") as string),
			image: formData.get("image") as string,
		};

		try {
			const response = await fetch(
				process.env.NEXT_PUBLIC_BASE_URL + "/products",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Cookies.get("authToken")}`,
					},
					body: JSON.stringify(productData),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to add product");
			}

			const data = await response.json();

			console.log("Product added successfully!", data);
		} catch (err: any) {
			console.error("Error adding product:", err.message);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
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
					htmlFor="category"
					className="block text-gray-700 text-sm font-bold mb-2"
				>
					Category
				</label>
				<input
					type="text"
					id="category"
					name="category"
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
			<div className="mb-4">
				<label
					htmlFor="amount"
					className="block text-gray-700 text-sm font-bold mb-2"
				>
					Amount
				</label>
				<input
					type="number"
					id="amount"
					name="amount"
					required
					min="0"
					step="0.01"
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="image"
					className="block text-gray-700 text-sm font-bold mb-2"
				>
					Image URL
				</label>
				<input
					type="text"
					id="image"
					name="image"
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
