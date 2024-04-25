process.env.NTBA_FIX_319 = 'test';
const TelegramBot = require('node-telegram-bot-api');

module.exports = {

	startBot: async function(request) {
		const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
		const { body } = request;
		if (body.message) {
			const { chat: { id }, text } = body.message;
			const message = `Hey!`;

			// Send the initial message
			await bot.sendMessage(id, message, { parse_mode: 'Markdown' });

		}
	}, say: async function(request) {
		//wtf
		const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
		const { body } = request;
		if (body.message) {
			const { chat: { id }, text } = body.message;
			const message = `delay 10000`;
			await delay(10000)
			await bot.sendMessage(id, message, { parse_mode: 'Markdown' });

		}
	}
}
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

