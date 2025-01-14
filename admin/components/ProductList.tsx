"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function ProductList() {
	const [products, setProducts] = useState([]);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const token = Cookies.get("authToken");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/products`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (!res.ok) throw new Error("Failed to fetch products");
				const data = await res.json();

				setProducts(data.data);
			} catch (err: any) {
				setError(err.message);
			}
		};
		fetchProducts();
	}, []);

	const deleteProduct = async (id: string) => {
		try {
			setIsPending(true);
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (!res.ok) throw new Error("Failed to delete product");
			setProducts((prev) =>
				prev.filter((product: any) => product.id !== id)
			);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsPending(false);
		}
	};

	const updateProduct = async (formData: FormData) => {
		try {
			setIsPending(true);
			const id = formData.get("id") as string;
			const updatedProduct = {
				name: formData.get("name"),
				category: formData.get("category"),
				price: parseFloat(formData.get("price") as string),
				amount: parseFloat(formData.get("amount") as string),
				image: formData.get("image"),
			};

			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`,
				{
					method: "PATCH",
					body: JSON.stringify(updatedProduct),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (!res.ok) throw new Error("Failed to update product");

			const { data } = await res.json();

			setProducts((prev: any) =>
				prev.map((product: any) => (product.id === id ? data : product))
			);
			setEditingId(null);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<h2 className="text-xl font-bold mb-4">Product List</h2>
			{error && <p className="text-red-500">{error}</p>}
			<ul>
				{products.map((product: any) => (
					<li key={product.id} className="mb-4 p-4 border rounded">
						{editingId === product.id ? (
							<form
								onSubmit={async (e) => {
									e.preventDefault();
									const formData = new FormData(
										e.currentTarget
									);
									await updateProduct(formData);
								}}
							>
								<input
									type="hidden"
									name="id"
									value={product.id}
								/>
								<div className="mb-2">
									<label className="block text-gray-700 text-sm font-bold mb-1">
										Name
									</label>
									<input
										type="text"
										name="name"
										defaultValue={product.name}
										required
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
								</div>
								<div className="mb-2">
									<label className="block text-gray-700 text-sm font-bold mb-1">
										Category
									</label>
									<input
										type="text"
										name="category"
										defaultValue={product.category}
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
								</div>
								<div className="mb-2">
									<label className="block text-gray-700 text-sm font-bold mb-1">
										Price
									</label>
									<input
										type="number"
										name="price"
										defaultValue={product.price}
										required
										min="0"
										step="0.01"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
								</div>
								<div className="mb-2">
									<label className="block text-gray-700 text-sm font-bold mb-1">
										Amount
									</label>
									<input
										type="number"
										name="amount"
										defaultValue={product.amount}
										required
										min="0"
										step="1"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
								</div>
								<div className="mb-2">
									<label className="block text-gray-700 text-sm font-bold mb-1">
										Image URL
									</label>
									<input
										type="text"
										name="image"
										defaultValue={product.image}
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
								</div>
								<button
									type="submit"
									disabled={isPending}
									className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2 disabled:opacity-50"
								>
									{isPending ? "Saving..." : "Save"}
								</button>
								<button
									type="button"
									onClick={() => setEditingId(null)}
									className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
								>
									Cancel
								</button>
							</form>
						) : (
							<>
								<p className="font-bold">{product.name}</p>
								<p>Category: {product.category}</p>
								<p>
									Price: ${Number(product.price).toFixed(2)}
								</p>
								<p>Amount: {product.amount}</p>
								{product.image && (
									<img
										src={product.image}
										alt={product.name}
										className="w-16 h-16"
									/>
								)}
								<button
									onClick={() => setEditingId(product.id)}
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 mt-2"
								>
									Edit
								</button>
								<form
									onSubmit={async (e) => {
										e.preventDefault();
										await deleteProduct(product.id);
									}}
									className="inline"
								>
									<button
										type="submit"
										disabled={isPending}
										className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2 disabled:opacity-50"
									>
										{isPending ? "Deleting..." : "Delete"}
									</button>
								</form>
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
