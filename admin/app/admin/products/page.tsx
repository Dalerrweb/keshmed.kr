import ProductList from "@/components/ProductList";
import ProductForm from "@/components/ProductForm";

export default function ProductsPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Products</h1>
			<ProductForm />
			<ProductList />
		</div>
	);
}
