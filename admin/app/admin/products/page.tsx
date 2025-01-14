"use client";
import ProductList from "@/components/ProductList";
import ProductForm from "@/components/ProductForm";
import { useState } from "react";

export default function ProductsPage() {
	const [update, setUpdate] = useState<boolean>(false);

	return (
		<div>
			<h1 className="text-2xl text-black font-bold mb-6">Products</h1>
			<ProductForm setUpdate={setUpdate} update={update} />
			<ProductList update={update} />
		</div>
	);
}
