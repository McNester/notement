process.env.NTBA_FIX_319 = 'test';
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios'); // Ensure axios is installed via npm

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
	}, check: async function(request) {
		console.log('in check:' + request)
		//wtf
		const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);
		const { body } = request;
		if (body.message) {
			const { chat: { id }, text } = body.message;
			const message = `finally)`;
			//await delay(5000)
			await bot.sendMessage(id, message, { parse_mode: 'Markdown' });

		}
	}
}
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function triggerNextRun() {
	const webhookUrl = 'https://notement.vercel.app/api/webhook';
	const data = {
		update_id: 123456789,
		from_trig: true,
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
	const timeoutPromise = new Promise(resolve => {
		setTimeout(resolve, 4000);
	});
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
}
