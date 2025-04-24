import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export async function generateMetadata({ params: { locale } }: any) {
	const metadata: any = await getMessages(locale);

	return {
		title: metadata.meta?.title,
		description: metadata.meta?.description,
		keywords:
			metadata.meta?.keywords ??
			"used medical equipment, Korean medical devices, second-hand medtech, Keshmed, medical supplies Central Asia",
		openGraph: {
			title: metadata.meta?.title,
			description: metadata.meta?.description,
			type: "website",
			locale,
			siteName: "Keshmed",
			url: "https://keshmed.kr",
			images: [
				{
					url: "https://keshmed.kr/og-image.jpg",
					width: 1200,
					height: 630,
					alt: metadata.meta?.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: metadata.meta?.title,
			description: metadata.meta?.description,
			site: "@keshmed",
		},
	};
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const locale = await getLocale();

	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					inter.variable
				)}
			>
				<NextIntlClientProvider messages={messages}>
					<div className="relative flex min-h-screen flex-col">
						<Header />
						<div className="flex-1">{children}</div>
						<Footer />
					</div>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
