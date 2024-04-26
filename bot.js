process.env.NTBA_FIX_319 = 'test';
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios'); // Ensure axios is installed via npm
const cron = require("node-cron");
let lastReq = null;
module.exports = {
	startBot: async function(request) {
		const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
		const { body } = request;
		if (body.message) {
			const { chat: { id }, text } = body.message;
			const message = `Hey!`;
			await triggerNextRun()

			// Send the initial message
			await bot.sendMessage(id, message, { parse_mode: 'Markdown' });
			lastReq = request
			cron.schedule('* * * * *', () => {
				console.log('Running a task every minute');
				const message = `hippui`;
				bot.sendMessage(id, message, { parse_mode: 'Markdown' });

				// Place your task logic here
			});
		}
	}, say: async function(request) {
		//wtf
		const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
		const { body } = request;
		if (body.message) {
			const { chat: { id }, text } = body.message;
			const message = `from 3 minutes)`;
			//await delay(5000)
			await bot.sendMessage(id, message, { parse_mode: 'Markdown' });

		}
	}, check: function() {
		//wtf
		const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
		const { body } = lastReq;
		if (body.message) {
			const { chat: { id }, text } = body.message;
			const message = `finally)`;
			//await delay(5000)
			bot.sendMessage(id, message, { parse_mode: 'Markdown' });

		}
	}
}
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function triggerNextRun() {
	setTimeout(async () => {
		const webhookUrl = 'https://notement.vercel.app/api/webhook';
		const data = {
			update_id: 123456789,
			test_trigger: true,  // Special flag to indicate this is a test trigger
			message: {
				message_id: 1,
				from: {
					id: 123456,
					is_bot: false,
					first_name: "John",
					username: "john_doe"
				},
				chat: {
					id: 123456,
					first_name: "John",
					username: "john_doe",
					type: "private"
				},
				date: 1441645532,
				text: "This is a simulated message to test webhook handling!"
			}
		};
		try {
			const response = await axios.post(webhookUrl, data, {
				headers: {
					'Content-Type': 'application/json'
				}
			});

			console.log('Webhook triggered successfully:', response.data);
		} catch (error) {
			console.error('Failed to trigger webhook:', error);
		}
	}, 10000); // Delay for 60 seconds before re-invoking
}
