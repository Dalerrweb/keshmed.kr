"use client";

import type React from "react";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslations } from "next-intl";

type ContactFormValues = {
	name: string;
	email: string;
	phone?: string;
	message: string;
	interest?: string;
};

export function ContactModal({
	children,
	buttonText = "Contact Us",
	interest = "",
}: {
	children?: React.ReactNode;
	buttonText?: string;
	interest?: string;
}) {
	const [open, setOpen] = useState(false);
	const t = useTranslations("homePage");

	const defaultValues: Partial<ContactFormValues> = {
		name: "",
		email: "",
		phone: "",
		message: "",
		interest: interest,
	};

	const form = useForm<ContactFormValues>({
		defaultValues,
	});

	const recaptchaRef = useRef<ReCAPTCHA>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const onSubmit = async (data: any) => {
		if (!recaptchaRef.current) {
			alert("ReCAPTCHA не инициализировалась.");
			return;
		}

		try {
			setLoading(true);

			// Получение ReCAPTCHA токена
			const token = await recaptchaRef.current.executeAsync();
			recaptchaRef.current.reset();

			// Таймаут: 10 секунд
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 10000);

			const res = await fetch(
				process.env.NEXT_PUBLIC_BASE_URL + "/lead-info-prod",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ ...data, recaptchaToken: token }),
					signal: controller.signal,
				}
			);

			clearTimeout(timeoutId);
			setLoading(false);

			if (res.ok) {
				setSuccess(true);
				form.reset();
			} else {
				const errorText = await res.text();
				console.error("Ошибка сервера:", errorText);
				toast({
					title: "Ошибка при отправке",
					description: "Попробуйте позже.",
				});
			}
		} catch (error: any) {
			setLoading(false);

			if (error.name === "AbortError") {
				toast({
					title: "Время ожидания истекло.",
					description: "Проверьте интернет и попробуйте снова.",
				});
			} else {
				console.error("Сетевая ошибка:", error?.message || error);
				toast({
					title: "Не удалось отправить заявку.",
					description: "Возможно, проблема с сетью.",
				});
			}
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{children || <Button variant="default">{buttonText}</Button>}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px] overflow-hidden">
				<DialogHeader>
					<DialogTitle>Contact Us</DialogTitle>
					<DialogDescription>
						Fill out the form below and our team will get back to
						you as soon as possible.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder="John Doe"
											{...field}
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="john.doe@example.com"
											{...field}
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone (optional)</FormLabel>
									<FormControl>
										<Input
											placeholder="+1 (555) 123-4567"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{interest && (
							<FormField
								control={form.control}
								name="interest"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Product Interest</FormLabel>
										<FormControl>
											<Input readOnly {...field} />
										</FormControl>
										<FormDescription>
											This product has been pre-selected
											based on your interest.
										</FormDescription>
									</FormItem>
								)}
							/>
						)}
						<ReCAPTCHA
							ref={recaptchaRef}
							sitekey="6Lei7iArAAAAAJUS0IyamXj5YAGTg2u1pZzg6ywn"
							size="invisible"
						/>
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Please let us know how we can help you..."
											className="min-h-[100px]"
											{...field}
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-start gap-2 pt-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
							>
								Cancel
							</Button>
							<Button disabled={loading} type="submit">
								{loading
									? t("contactUs.messageForm.loading")
									: t("contactUs.messageForm.sendButton")}
							</Button>
							{success && (
								<p className="text-green-600">
									Заявка отправлена!
								</p>
							)}
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
