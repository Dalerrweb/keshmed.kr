"use client";

import { useState } from "react";

interface Product {
	id: number;
	name: string;
	price: number;
}

interface ProductListProps {
	products: Product[];
	updateProduct: (formData: FormData) => Promise<void>;
	deleteProduct: (formData: FormData) => Promise<void>;
}

export default function ProductList({
	products,
	updateProduct,
	deleteProduct,
}: ProductListProps) {
	const [editingId, setEditingId] = useState<number | null>(null);
	const [isPending, setIsPending] = useState(false);

	return (
		<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<h2 className="text-xl font-bold mb-4">Product List</h2>
			<ul>
				{products.map((product) => (
					<li key={product.id} className="mb-4 p-4 border rounded">
						{editingId === product.id ? (
							<form
								action={async (formData) => {
									setIsPending(true);
									await updateProduct(formData);
									setIsPending(false);
									setEditingId(null);
								}}
							>
								<input
									type="hidden"
									name="id"
									value={product.id}
								/>
								<div className="mb-2">
									<input
										type="text"
										name="name"
										defaultValue={product.name}
										required
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									/>
								</div>
								<div className="mb-2">
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
								<p>${product.price.toFixed(2)}</p>
								<button
									onClick={() => setEditingId(product.id)}
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 mt-2"
								>
									Edit
								</button>
								<form
									action={async (formData) => {
										setIsPending(true);
										await deleteProduct(formData);
										setIsPending(false);
									}}
									className="inline"
								>
									<input
										type="hidden"
										name="id"
										value={product.id}
									/>
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
