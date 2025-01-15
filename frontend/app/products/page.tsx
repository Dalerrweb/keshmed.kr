import ProductList from "@/components/productList";
import { useTranslations } from "next-intl";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = () => {
	const t = useTranslations("homePage");

	return (
		<section id="products" className="py-16 bg-gray-50">
			<div className="container">
				<h2 className="text-3xl font-bold text-center mb-8">
					{t("featuredProducts.title")}
				</h2>
				<ProductList />
			</div>
		</section>
	);
};

export default page;
