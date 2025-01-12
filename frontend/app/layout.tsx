import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					inter.variable
				)}
			>
				<div className="relative flex min-h-screen flex-col">
					<Header />
					<div className="flex-1">{children}</div>
					<Footer />
				</div>
			</body>
		</html>
	);
}
