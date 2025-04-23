"use client";
import React from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

interface leadFormProps {}

const LeadForm: React.FC<leadFormProps> = () => {
	const t = useTranslations("homePage");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
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
				process.env.NEXT_PUBLIC_BASE_URL + "/send-lead",
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
				reset();
			} else {
				const errorText = await res.text();
				console.error("Ошибка сервера:", errorText);
				alert("Ошибка при отправке. Попробуйте позже.");
			}
		} catch (error: any) {
			setLoading(false);

			if (error.name === "AbortError") {
				alert(
					"Время ожидания истекло. Проверьте интернет и попробуйте снова."
				);
			} else {
				console.error("Сетевая ошибка:", error?.message || error);
				alert(
					"Не удалось отправить заявку. Возможно, проблема с сетью."
				);
			}
		}
	};

	return (
		<CardContent className="p-6">
			<h3 className="text-xl font-semibold mb-4">
				{t("contactUs.messageForm.title")}
			</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input
					{...register("name", { required: true })}
					placeholder="Your Name"
				/>
				{errors.name && (
					<span className="text-red-600">This field is required</span>
				)}
				<Input
					{...register("phone", { required: true })}
					type="phone"
					placeholder="Your Phone Number"
				/>
				{errors.phone && (
					<span className="text-red-600">This field is required</span>
				)}
				<Textarea {...register("message")} placeholder="Your Message" />
				<ReCAPTCHA
					ref={recaptchaRef}
					sitekey="6Lei7iArAAAAAJUS0IyamXj5YAGTg2u1pZzg6ywn"
					size="invisible"
				/>
				<Button disabled={loading} type="submit">
					{loading
						? t("contactUs.messageForm.loading")
						: t("contactUs.messageForm.sendButton")}
				</Button>
				{success && (
					<p className="text-green-600">Заявка отправлена!</p>
				)}
			</form>
		</CardContent>
	);
};

export default LeadForm;
