import { redirect } from "next/navigation";
import ProductList from "@/components/ProductList";
import ProductForm from "@/components/ProductForm";

// Placeholder for product data
let products = [
	{ id: 1, name: "Product 1", price: 10 },
	{ id: 2, name: "Product 2", price: 20 },
	{ id: 3, name: "Product 3", price: 30 },
];

async function addProduct(formData: FormData) {
	"use server";

	const name = formData.get("name") as string;
	const price = Number(formData.get("price"));
	const newProduct = { id: products.length + 1, name, price };
	products.push(newProduct);
	redirect("/admin/products");
}

async function updateProduct(formData: FormData) {
	"use server";

	const id = Number(formData.get("id"));
	const name = formData.get("name") as string;
	const price = Number(formData.get("price"));
	products = products.map((p) => (p.id === id ? { ...p, name, price } : p));
	redirect("/admin/products");
}

async function deleteProduct(formData: FormData) {
	"use server";

	const id = Number(formData.get("id"));
	products = products.filter((p) => p.id !== id);
	redirect("/admin/products");
}

export default function ProductsPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Products</h1>
			<ProductForm addProduct={addProduct} />
			<ProductList
				products={products}
				updateProduct={updateProduct}
				deleteProduct={deleteProduct}
			/>
		</div>
	);
}
