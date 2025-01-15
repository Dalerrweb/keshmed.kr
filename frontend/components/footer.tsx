import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-gray-300">
			<div className="container py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/" className="hover:text-white">
									Home
								</Link>
							</li>
							<li>
								<Link
									href="#products"
									className="hover:text-white"
								>
									Products
								</Link>
							</li>
							<li>
								<Link
									href="#about"
									className="hover:text-white"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="#contact"
									className="hover:text-white"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">Legal</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/privacy"
									className="hover:text-white"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="hover:text-white"
								>
									Terms & Conditions
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Newsletter
						</h3>
						<form className="space-y-2">
							<Input
								type="email"
								placeholder="Your email"
								className="bg-gray-800 border-gray-700"
							/>
							<Button type="submit">Subscribe</Button>
						</form>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4">
							Follow Us
						</h3>
						<div className="flex space-x-4">
							<Link href="#" className="hover:text-white">
								<Facebook className="w-6 h-6" />
							</Link>
							<Link href="#" className="hover:text-white">
								<Instagram className="w-6 h-6" />
							</Link>
							<Link href="#" className="hover:text-white">
								<Linkedin className="w-6 h-6" />
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-gray-800 py-4">
				<div className="container text-center text-sm">
					&copy; {new Date().getFullYear()} KeshMed. All rights
					reserved.
				</div>
			</div>
		</footer>
	);
}
