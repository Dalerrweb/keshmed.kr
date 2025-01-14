"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Product = {
	id: string;
	name: string;
	category: string;
	price: number;
	amount: number;
	image: string;
	createdAt: string;
	updatedAt: string;
};

type Pagination = {
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
};

const ProductList = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [pagination, setPagination] = useState<Pagination | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchProducts = async (page: number = 1) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/products?page=${page}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch products.");
			}

			const data = await response.json();
			setProducts(data.data);
			setPagination(data.pagination);
		} catch (err: any) {
			setError(
				err.message || "An error occurred while fetching products."
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Products</h2>
			{isLoading && <p>Loading...</p>}
			{error && <p className="text-red-500">{error}</p>}

			{!isLoading && !error && products.length === 0 && (
				<p>No products available.</p>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<Card key={product.id} className="overflow-hidden">
						<div className="aspect-square relative">
							<img
								src={`${process.env.NEXT_PUBLIC_BASE_URL}/${product.image}`}
								alt={product.name}
								className="object-cover w-full h-full transition-transform hover:scale-105"
							/>
						</div>
						<CardContent className="p-4">
							<h3 className="font-semibold mb-2">
								{product.name}
							</h3>
							<p className="text-sm text-gray-600 mb-2">
								{product.category}
							</p>
							<div className="flex justify-between items-center">
								<span className="font-bold">
									${product.price.toFixed(2)}
								</span>
								<Button size="sm">Add to Cart</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Pagination */}
			{pagination && pagination.totalPages > 1 && (
				<div className="flex justify-center mt-6 space-x-2">
					{Array.from({ length: pagination.totalPages }, (_, i) => (
						<Button
							key={i + 1}
							variant={
								pagination.page === i + 1
									? "default"
									: "outline"
							}
							onClick={() => fetchProducts(i + 1)}
							disabled={isLoading}
						>
							{i + 1}
						</Button>
					))}
				</div>
			)}
		</div>
	);
};

export default ProductList;
