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

			// Schedule sending the delayed message after 5 minutes (300,000 milliseconds)
			setTimeout(sendDelayedMessage, 60000); // 5 minutes * 60 seconds * 1000 milliseconds
			await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000)); // Wait for 5 minutes
			await sendDelayedMessage(); // Send the delayed message
		}
	}
}


