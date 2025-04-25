import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Star, Zap, Award, Globe, Send, MessageCircle } from "lucide-react";
import ProductList from "@/components/productList";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LeadForm from "@/components/leadForm";

export default function Home() {
	const t = useTranslations("homePage");

	return (
		<main className="flex-1">
			{/* Hero Section */}
			<section className="relative h-[600px] flex items-center justify-center text-center">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{
						backgroundImage: "url('/hero.jpg')",
					}}
				/>
				<div className="absolute inset-0 bg-black/50" />
				<div className="relative z-10 space-y-4">
					<h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
						{t("greeting.title")}
					</h1>
					<div className="flex justify-center space-x-4">
						<Link href="/products">
							<Button size="lg">
								{t("greeting.buttons.exploreProducts")}
							</Button>
						</Link>
						<Link href="/#contact">
							<Button size="lg" variant="outline">
								{t("greeting.buttons.contactSales")}
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Featured Products */}
			<section id="products" className="py-16 bg-gray-50">
				<div className="container">
					<h2 className="text-3xl font-bold text-center mb-8">
						{t("featuredProducts.title")}
					</h2>
					<ProductList />
				</div>
			</section>

			{/* Why Choose Us */}
			<section id="why-choose-us" className="py-16">
				<div className="container">
					<h2 className="text-3xl font-bold text-center mb-8">
						{t("whyChooseUs.title")}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<Card>
							<CardContent className="p-6 text-center">
								<Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
								<h3 className="text-xl font-semibold mb-2">
									{t("whyChooseUs.items.cuttingEdge.title")}
								</h3>
								<p className="text-gray-600">
									{t(
										"whyChooseUs.items.cuttingEdge.description"
									)}
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6 text-center">
								<Award className="w-12 h-12 mx-auto mb-4 text-primary" />
								<h3 className="text-xl font-semibold mb-2">
									{t(
										"whyChooseUs.items.certifiedQuality.title"
									)}
								</h3>
								<p className="text-gray-600">
									{t(
										"whyChooseUs.items.certifiedQuality.description"
									)}
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6 text-center">
								<Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
								<h3 className="text-xl font-semibold mb-2">
									{t(
										"whyChooseUs.items.globalShipping.title"
									)}
								</h3>
								<p className="text-gray-600">
									{t(
										"whyChooseUs.items.globalShipping.description"
									)}
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section id="testimonials" className="py-16 bg-gray-50">
				<div className="container">
					<h2 className="text-3xl font-bold text-center mb-8">
						{t("customerReviews.title")}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{t
							.raw("customerReviews.reviews")
							.map((item: any, i: number) => (
								<Card key={i}>
									<CardContent className="p-6">
										<div className="flex items-center mb-4">
											<div>
												<h3 className="font-semibold">
													{item.name}
												</h3>
												<div className="flex">
													{[
														...Array(item.rating),
													].map((_, j) => (
														<Star
															key={j}
															className="w-4 h-4 text-yellow-400 fill-current"
														/>
													))}
												</div>
											</div>
										</div>
										<p className="text-gray-600">
											{item.feedback}
										</p>
									</CardContent>
								</Card>
							))}
					</div>
				</div>
			</section>

			{/* About Us */}
			<section id="about" className="py-16">
				<div className="container">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
						<div>
							<h2 className="text-3xl font-bold mb-4">
								{t("aboutUs.title")}
							</h2>
							<p className="text-gray-600 mb-4">
								{t("aboutUs.description")}
							</p>
							<p className="text-gray-600">
								{t("aboutUs.mission")}
							</p>
						</div>
						<div className="aspect-video relative">
							<img
								src="/keshmedTeam.jpeg"
								alt="Our Team"
								className="object-cover w-full h-full rounded-lg"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Instagram Embed */}
			<section id="about" className="py-16">
				<div className="container">
					<InstagramEmbed />
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-16 bg-gray-50">
				<div className="container">
					<h2 className="text-3xl font-bold text-center mb-8">
						{t("faqs.title")}
					</h2>
					<Accordion type="single" collapsible className="w-full">
						{t.raw("faqs.questions").map((item: any, i: number) => (
							<AccordionItem value={`item-${i}`} key={i}>
								<AccordionTrigger>
									{item.question}
								</AccordionTrigger>
								<AccordionContent>
									{item.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>

			{/* Call-to-Action Section */}
			<section className="py-16">
				<div className="container text-center">
					<h2 className="text-3xl font-bold mb-4">
						{t("callToAction.title")}
					</h2>
					<p className="text-xl text-gray-600 mb-8">
						{t("callToAction.subtitle")}
					</p>
					<div className="flex justify-center space-x-4">
						<Link href="/products">
							<Button size="lg">
								{t("callToAction.buttons.browseProducts")}
							</Button>
						</Link>
						<Link href="/#contact">
							<Button size="lg" variant="outline">
								{t("callToAction.buttons.getInTouch")}
							</Button>
						</Link>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="py-16 bg-gray-50">
				<div className="container">
					<h2 className="text-3xl font-bold text-center mb-8">
						{t("contactUs.title")}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<Card>
							<LeadForm />
						</Card>
						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-4">
									{t("contactUs.location.title")}
								</h3>
								<div className="aspect-video relative mb-4">
									<iframe
										width="100%"
										height="100%"
										src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=47%20Digital-ro%209-gil,%20%09%09%09%09%09%09%09%09%09Geumcheon-gu,%20Seoul,%20Republic%20Korea.+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
									></iframe>
								</div>
								<p className="text-gray-600 mb-2">
									28,2 floor,47 Digital-ro 9-gil,
									Geumcheon-gu, Seoul, Republic Korea.
								</p>
								<Link
									href="mailto:sammedservic@gmail.com"
									className="text-gray-600 block mb-3"
								>
									Email: sammedservic@gmail.com
								</Link>
								<Link
									href="tel:+82 10 8359 3661"
									className="text-gray-600"
								>
									Phone: +82 10 8359 3661
								</Link>
								<div className="flex items-center gap-2 mt-3">
									<Link
										href="https://t.me/kormedser"
										className="flex items-center gap-2 bg-[#35A9F3] text-whtie p-3 w-fit rounded-md"
									>
										<Send color="white" />
										<p className="text-white font-bold">
											Telegram
										</p>
									</Link>
									<Link
										href="https://wa.me/qr/YPDLU5SD6JDUF1"
										className="flex items-center gap-2 bg-[#1FBD28] text-whtie p-3 w-fit rounded-md"
									>
										<MessageCircle color="white" />
										<p className="text-white font-bold">
											WhatsApp
										</p>
									</Link>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</main>
	);
}

const InstagramEmbed: React.FC = () => {
	return (
		<Card className="w-full mx-auto shadow-xl rounded-2xl overflow-hidden">
			<CardContent className="p-0">
				<div className="relative w-full h-0 pb-[90.25%] md:pb-[56.25%]">
					{/* 16:9 ratio */}
					<iframe
						src="https://www.instagram.com/keshmedkorea/embed/"
						className="absolute top-0 left-0 w-full h-full border-0"
						title="Instagram Embed"
					></iframe>
				</div>
			</CardContent>
		</Card>
	);
};
