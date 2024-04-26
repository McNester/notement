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
	}
}
function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function triggerNextRun() {
	setTimeout(async () => {
		try {
			console.log("Triggering the next function run...");
			// Define the data to send
			const postData = {
				triggered: true,
				timestamp: new Date().toISOString(),  // Example: include a timestamp
				source: 'triggerNextRun'  // Indicate the source of the trigger
			};

			// Call the function URL itself with POST data
			const result = await axios.post('https://notement.vercel.app/api/webhook', postData);
			console.log("Function re-triggered successfully:", result.data);
		} catch (error) {
			console.error("Error re-triggering function:", error);
		}
	}, 3000); // Delay for 60 seconds before re-invoking
}
