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

export default function Home() {
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
						Your Trusted Source for Advanced Medical Equipment from
						South Korea
					</h1>
					<div className="flex justify-center space-x-4">
						<Button size="lg">Explore Products</Button>
						<Button size="lg" variant="outline">
							Contact Sales
						</Button>
					</div>
				</div>
			</section>

			{/* Featured Products */}
			<section id="products" className="py-16 bg-gray-50">
				<div className="container">
					<h2 className="text-3xl font-bold text-center mb-8">
						Featured Products
					</h2>
					<ProductList />
				</div>
			</section>

			{/* Why Choose Us */}
			<section id="why-choose-us" className="py-16">
				<div className="container">
					<h2 className="text-3xl font-bold text-center mb-8">
						Why Choose Us
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<Card>
							<CardContent className="p-6 text-center">
								<Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
								<h3 className="text-xl font-semibold mb-2">
									Cutting-Edge Technology
								</h3>
								<p className="text-gray-600">
									We offer the latest advancements in medical
									technology from South Korea.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6 text-center">
								<Award className="w-12 h-12 mx-auto mb-4 text-primary" />
								<h3 className="text-xl font-semibold mb-2">
									Certified Quality Standards
								</h3>
								<p className="text-gray-600">
									All our products meet rigorous international
									quality standards.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6 text-center">
								<Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
								<h3 className="text-xl font-semibold mb-2">
									Global Shipping & Support
								</h3>
								<p className="text-gray-600">
									We provide worldwide shipping and
									comprehensive customer support.
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
						What Our Customers Say
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{[...Array(4)].map((_, i) => (
							<Card key={i}>
								<CardContent className="p-6">
									<div className="flex items-center mb-4">
										<img
											src={`/placeholder.svg?height=50&width=50&text=User`}
											alt="User"
											className="w-12 h-12 rounded-full mr-4"
										/>
										<div>
											<h3 className="font-semibold">
												Customer {i + 1}
											</h3>
											<div className="flex">
												{[...Array(5)].map((_, j) => (
													<Star
														key={j}
														className="w-4 h-4 text-yellow-400 fill-current"
													/>
												))}
											</div>
										</div>
									</div>
									<p className="text-gray-600">
										The quality of the medical equipment
										from KeshMed is outstanding. It has
										greatly improved our patient care
										capabilities.
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
								About KeshMed
							</h2>
							<p className="text-gray-600 mb-4">
								KeshMed is your trusted partner in advanced
								medical equipment from South Korea. We are
								committed to bringing cutting-edge technology
								and unparalleled quality to healthcare
								professionals worldwide.
							</p>
							<p className="text-gray-600">
								Our mission is to improve patient care and
								medical outcomes by providing access to the most
								innovative and reliable medical devices
								available in the market.
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

			{/* FAQ Section */}
			<section className="py-16 bg-gray-50">
				<div className="container">
					<h2 className="text-3xl font-bold text-center mb-8">
						Frequently Asked Questions
					</h2>
					<Accordion type="single" collapsible className="w-full">
						<AccordionItem value="item-1">
							<AccordionTrigger>
								What are your product warranties?
							</AccordionTrigger>
							<AccordionContent>
								Our products come with a standard 2-year
								warranty. Extended warranties are available for
								purchase.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>
								What are the shipping times?
							</AccordionTrigger>
							<AccordionContent>
								Shipping times vary depending on your location.
								Typically, orders are delivered within 5-10
								business days for domestic orders and 10-20
								business days for international orders.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>
								What payment methods do you accept?
							</AccordionTrigger>
							<AccordionContent>
								We accept all major credit cards, PayPal, and
								bank transfers. For large orders, we also offer
								financing options.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4">
							<AccordionTrigger>
								What is your customer support availability?
							</AccordionTrigger>
							<AccordionContent>
								Our customer support team is available 24/7 via
								email and during business hours via phone. We
								strive to respond to all inquiries within 24
								hours.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</section>

			{/* Call-to-Action Section */}
			<section className="py-16">
				<div className="container text-center">
					<h2 className="text-3xl font-bold mb-4">
						Ready to Equip Your Practice with the Best?
					</h2>
					<p className="text-xl text-gray-600 mb-8">
						Start Shopping Today!
					</p>
					<div className="flex justify-center space-x-4">
						<Button size="lg">Browse Products</Button>
						<Button size="lg" variant="outline">
							Get in Touch
						</Button>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact" className="py-16 bg-gray-50">
				<div className="container">
					<h2 className="text-3xl font-bold text-center mb-8">
						Contact Us
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-4">
									Send us a message
								</h3>
								<form className="space-y-4">
									<Input placeholder="Your Name" />
									<Input
										type="email"
										placeholder="Your Email"
									/>
									<Textarea placeholder="Your Message" />
									<Button type="submit">Send Message</Button>
								</form>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-4">
									Our Location
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
