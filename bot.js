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
			/*
			const delayedMessage = `This is your delayed message after 5 minutes.`;
			setTimeout(() => {
				bot.sendMessage(id, 'Hello again! Here is your delayed message.');
			}, 60000); // 60000 milliseconds = 1 minute
			setTimeout(say(id), 60000); // 60000 milliseconds = 1 minute
			*/
			await say(id, 60000, bot)

		}
	}
}

async function say(id, ms, bot) {
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve("готово!"), ms)
	});

	const delayedMessage = `hye,From delay`;
	await bot.sendMessage(id, delayedMessage, { parse_mode: 'Markdown' });

}

