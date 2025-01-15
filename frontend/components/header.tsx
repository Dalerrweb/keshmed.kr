import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import LanguageSwitcher from "./languageSwitcher";
import { useTranslations } from "next-intl";

export default function Header() {
	const t = useTranslations("homePage");

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<div className="flex gap-6 md:gap-10">
					<Link href="/" className="flex items-center space-x-2">
						<span className="inline-block font-bold">KeshMed</span>
					</Link>
					<nav className="hidden md:flex gap-6">
						<Link
							href="#products"
							className="flex items-center text-sm font-medium text-muted-foreground"
						>
							{t("header.products")}
						</Link>
						<Link
							href="#about"
							className="flex items-center text-sm font-medium text-muted-foreground"
						>
							{t("header.aboutUs")}
						</Link>
						<Link
							href="#why-choose-us"
							className="flex items-center text-sm font-medium text-muted-foreground"
						>
							{t("header.whyChooseUs")}
						</Link>
						<Link
							href="#testimonials"
							className="flex items-center text-sm font-medium text-muted-foreground"
						>
							{t("header.testimonials")}
						</Link>
						<Link
							href="#contact"
							className="flex items-center text-sm font-medium text-muted-foreground"
						>
							{t("header.contact")}
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
					<LanguageSwitcher />
				</div>
			</div>
		</header>
	);
}
