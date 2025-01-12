import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<div className="flex gap-6 md:gap-10">
					<Link href="/" className="flex items-center space-x-2">
						<span className="inline-block font-bold">K-Medica</span>
					</Link>
					<nav className="hidden md:flex gap-6">
						<Link
							href="#products"
							className="flex items-center text-sm font-medium text-muted-foreground"
						>
							Products
						</Link>
						<Link
							href="#about"
							className="flex items-center text-sm font-medium text-muted-foreground"
						>
							About Us
						</Link>
						<Link
							href="#why-choose-us"
							className="flex items-center text-sm font-medium text-muted-foreground"
						>
							Why Choose Us
						</Link>
						<Link
							href="#testimonials"
							className="flex items-center text-sm font-medium text-muted-foreground"
						>
							Testimonials
						</Link>
						<Link
							href="#contact"
							className="flex items-center text-sm font-medium text-muted-foreground"
						>
							Contact
						</Link>
					</nav>
				</div>
				<div className="flex flex-1 items-center justify-end space-x-4">
					<div className="w-full flex-1 md:w-auto md:flex-none">
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search products"
								className="pl-8"
							/>
						</div>
					</div>
					<Button>Shop Now</Button>
				</div>
			</div>
		</header>
	);
}
