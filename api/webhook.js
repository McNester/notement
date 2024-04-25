process.env.NTBA_FIX_319 = 'test';
const { startBot, say } = require('../bot');
const nodeSchedule = require('node-schedule');

module.exports = async (request, response) => {
	try {

		await startBot(request);
		let date = new Date(Date.now() + 5000); // 60,000 milliseconds = 1 minute
		await nodeSchedule.scheduleJob(date, async function() {
			await say(request);
		});
		/*
		const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
		const { body } = request;
		if (body.message) {
			const { chat: { id }, text } = body.message;
			const message = `✅ Thanks for your message: *"${text}"*\nHave a great day! 👋🏻`;
			await bot.sendMessage(id, message, { parse_mode: 'Markdown' });
		}
		*/
	}
	catch (error) {
		console.error('Error sending message');
		console.log(error.toString());
		//FIX: remove this
		console.log(process.env.TELEGRAM_TOKEN);
		console.log(process.env.VERCEL_ENV.TELEGRAM_TOKEN);
		console.log(process.env.VERCEL.TELEGRAM_TOKEN);
	}
	response.send('OK');
};
