// utils/sendTelegramMessage.ts
export async function sendTelegramMessage(message: string) {
	const botToken = process.env.TELEGRAM_BOT_TOKEN;
	const chatId = process.env.TELEGRAM_CHAT_ID;

	if (!botToken || !chatId) {
		console.error("Telegram bot token or chat ID is missing.");
		return;
	}

	if (!message) {
		console.error("Message is empty. Nothing to send.");
		return;
	}

	const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				chat_id: chatId,
				text: message,
			}),
		});

		const responseText = await res.text();
		console.log("Telegram response:", res.status, responseText);

		if (!res.ok) {
			console.error("Telegram API error", res.statusText, responseText);
		}
	} catch (err) {
		console.error("Failed to send Telegram message:", err);
	}
}
