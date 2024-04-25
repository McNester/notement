process.env.NTBA_FIX_319 = 'test';
const TelegramBot = require('node-telegram-bot-api');

module.exports = {

	startBot: async function(request) {
		const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
		const { body } = request;
		if (body.message) {
			const { chat: { id }, text } = body.message;
			const message = `Choose the time for the notification:`;

			// Send the initial message
			await bot.sendMessage(id, message, { parse_mode: 'Markdown' });

			// Define a function to send the delayed message
			const sendDelayedMessage = async () => {
				const delayedMessage = `This is your delayed message after 5 minutes.`;
				await bot.sendMessage(id, delayedMessage, { parse_mode: 'Markdown' });
			};

			setTimeout(this.notify(id), 60000);
		}
	},
	notify: async function(id) {
		const message = `From notification,congrats`
		await bot.sendMessage(id, message, { parse_mode: 'Markdown' });
		consolo.log("something is odd")

	}
}


