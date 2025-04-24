import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactModal } from "@/components/contact-modal";
import prisma from "@/lib/db";

async function getRelatedProducts() {
	const products = await prisma.product.findMany({
		take: 4,
	});
	return products || [];
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const product = await prisma.product.findUnique({
		where: { id },
	});
	const relatedProducts = await getRelatedProducts();

	if (!product) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-4">
				<Link
					href="/products"
					className="flex items-center text-sm text-gray-600 hover:text-gray-900"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Products
				</Link>
			</div>

			<div className="grid md:grid-cols-2 gap-8 mb-12">
				{/* Product Image */}
				<div className="bg-white rounded-lg overflow-hidden border shadow-sm">
					<div className="relative aspect-square">
						<Image
							src={
								product.image ||
								"/placeholder.svg?height=600&width=600"
							}
							alt={product.name}
							fill
							className="object-contain p-4"
							priority
						/>
					</div>
				</div>

				{/* Product Details */}
				<div className="flex flex-col">
					<div>
						{product.category && (
							<Badge variant="outline" className="mb-2">
								{product.category}
							</Badge>
						)}
						<h1 className="text-3xl font-bold tracking-tight">
							{product.name}
						</h1>

						{product.price !== null && (
							<div className="mt-4 flex items-baseline">
								<span className="text-3xl font-bold text-gray-900">
									$
									{product.price.toLocaleString("en-US", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>
							</div>
						)}

						<div className="mt-2 text-sm text-gray-500">
							{product.amount > 0 ? (
								<span className="text-green-600 font-medium">
									In Stock ({product.amount} available)
								</span>
							) : (
								<span className="text-red-600 font-medium">
									Out of Stock
								</span>
							)}
						</div>

						<Separator className="my-6" />

						<div className="prose prose-sm max-w-none mb-6">
							<p>
								{product.description ||
									"No description available."}
							</p>
						</div>

						{/* <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-auto">
							<Button size="lg" className="flex-1">
								<ShoppingCart className="mr-2 h-5 w-5" />
								Add to Cart
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="flex-1"
							>
								<Heart className="mr-2 h-5 w-5" />
								Add to Wishlist
							</Button>
						</div> */}

						<div className="mt-4">
							<ContactModal
								buttonText="Request Information"
								interest={product.name}
							>
								<Button size="lg" className="w-full">
									<Mail className="mr-2 h-5 w-5" />
									Request Information
								</Button>
							</ContactModal>
						</div>
					</div>
				</div>
			</div>

			{/* Product Tabs */}
			<Tabs defaultValue="specifications" className="mb-12">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="specifications">
						Specifications
					</TabsTrigger>
					<TabsTrigger value="features">Features</TabsTrigger>
					<TabsTrigger value="documents">Documents</TabsTrigger>
				</TabsList>
				<TabsContent
					value="specifications"
					className="p-6 border rounded-lg mt-2"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<h3 className="font-medium">Dimensions</h3>
							<p className="text-sm text-gray-600">
								330mm × 155mm × 220mm
							</p>
						</div>
						<div>
							<h3 className="font-medium">Weight</h3>
							<p className="text-sm text-gray-600">
								4.5 kg (including battery)
							</p>
						</div>
						<div>
							<h3 className="font-medium">Display</h3>
							<p className="text-sm text-gray-600">
								12.1" TFT color LCD touchscreen
							</p>
						</div>
						<div>
							<h3 className="font-medium">Battery Life</h3>
							<p className="text-sm text-gray-600">
								Up to 4 hours continuous operation
							</p>
						</div>
						<div>
							<h3 className="font-medium">Connectivity</h3>
							<p className="text-sm text-gray-600">
								Wi-Fi, Bluetooth, HL7, DICOM
							</p>
						</div>
						<div>
							<h3 className="font-medium">Warranty</h3>
							<p className="text-sm text-gray-600">
								2 years standard warranty
							</p>
						</div>
					</div>
				</TabsContent>
				<TabsContent
					value="features"
					className="p-6 border rounded-lg mt-2"
				>
					<ul className="list-disc pl-5 space-y-2">
						<li>
							Multi-parameter monitoring: ECG, SpO2, NIBP, Temp,
							Resp
						</li>
						<li>Arrhythmia detection and analysis</li>
						<li>ST segment analysis</li>
						<li>Drug dose calculation</li>
						<li>Trend data for up to 120 hours</li>
						<li>
							Alarm management system with visual and audible
							alerts
						</li>
						<li>Patient data management and export capabilities</li>
						<li>Integration with hospital information systems</li>
					</ul>
				</TabsContent>
				<TabsContent
					value="documents"
					className="p-6 border rounded-lg mt-2"
				>
					<div className="space-y-4">
						<div className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
							<div className="ml-3">
								<p className="text-sm font-medium">
									User Manual
								</p>
								<p className="text-xs text-gray-500">
									PDF, 4.2 MB
								</p>
							</div>
						</div>
						<div className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
							<div className="ml-3">
								<p className="text-sm font-medium">
									Quick Start Guide
								</p>
								<p className="text-xs text-gray-500">
									PDF, 1.8 MB
								</p>
							</div>
						</div>
						<div className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
							<div className="ml-3">
								<p className="text-sm font-medium">
									Technical Specifications
								</p>
								<p className="text-xs text-gray-500">
									PDF, 2.5 MB
								</p>
							</div>
						</div>
					</div>
				</TabsContent>
			</Tabs>

			{/* Related Products */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">Related Products</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{relatedProducts.map((relatedProduct) => (
						<Link
							href={`/products/${relatedProduct.id}`}
							key={relatedProduct.id}
							className="group"
						>
							<div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
								<div className="relative aspect-square bg-gray-100">
									<Image
										src={
											relatedProduct.image ||
											"/placeholder.svg?height=300&width=300"
										}
										alt={relatedProduct.name}
										fill
										className="object-contain p-4"
									/>
								</div>
								<div className="p-4">
									<h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
										{relatedProduct.name}
									</h3>
									{relatedProduct.category && (
										<p className="text-sm text-gray-500">
											{relatedProduct.category}
										</p>
									)}
									{relatedProduct.price !== null && (
										<p className="mt-2 font-bold">
											$
											{relatedProduct.price.toLocaleString(
												"en-US",
												{
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												}
											)}
										</p>
									)}
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
