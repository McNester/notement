const TelegramBot = require('node-telegram-bot-api');

module.exports = {
	startBot: async => (){
		const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
		const { body } = request;
		if (body.message) {
			const { chat: { id }, text } = body.message;
			const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;
			await bot.sendMessage(id, message, { parse_mode: 'Markdown' });
		}
	}
}


