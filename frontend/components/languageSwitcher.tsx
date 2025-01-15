"use client";

import { useRouter } from "next/navigation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

const languages = [
	{ code: "en", name: "English", flag: "🇬🇧" },
	{ code: "ru", name: "Русский", flag: "🇷🇺" },
	{ code: "kr", name: "한국어", flag: "🇰🇷" },
	{ code: "uz", name: "O'zbek tili", flag: "🇺🇿" },
];

export default function LanguageSwitcher() {
	const router = useRouter();

	const changeLanguage = (locale: string) => {
		document.cookie = `locale=${locale}; path=/;`;
		router.refresh();
	};

	return (
		<Select onValueChange={changeLanguage}>
			<SelectTrigger className="w-[50px] px-2">
				<SelectValue placeholder={<Globe className="h-4 w-4" />} />
			</SelectTrigger>
			<SelectContent>
				{languages.map((lang) => (
					<SelectItem key={lang.code} value={lang.code}>
						<span className="flex items-center">
							<span className="mr-2">{lang.flag}</span>
							{lang.name}
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
