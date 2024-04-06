//hello?
const TelegramBot = require('node-telegram-bot-api');

const token = '6721671337:AAEYs_98w-z2TMbKFOwsaCnJNifJpEBMwN0'; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	const messageText = msg.text;

	if (messageText === "/start") {
		bot.sendMessage(chatId, 'Welcome!');
	}

})

