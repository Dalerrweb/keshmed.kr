import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/utils/sendTelegramMessage";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { name, email, phone, message, interest, recaptchaToken } = body;

		if (!name || !phone || !email || !interest || !recaptchaToken) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		// ReCAPTCHA проверка
		const verifyRes = await fetch(
			`https://www.google.com/recaptcha/api/siteverify`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
			}
		);

		const verification = await verifyRes.json();
		if (!verification.success || verification.score < 0.5) {
			return NextResponse.json(
				{ error: "ReCAPTCHA verification failed" },
				{ status: 403 }
			);
		}

		// Telegram сообщение
		const text = `
📩 Новая заявка с сайта:
👤 Имя: ${name}
📞 Телефон: ${phone}
📝 Сообщение: ${message || "—"}
📧 Email: ${email}
💬 Интерес: ${interest}
		`;
		await sendTelegramMessage(text.trim());

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error sending lead:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
