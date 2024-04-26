process.env.NTBA_FIX_319 = 'test';
const { startBot, say, check } = require('../bot');
let lastRequest = null;
const express = require('express');
const app = express();
app.use(express.json());
const timeoutThreshold = 4000; // 10 seconds
async function waitUntil(condition) {
	return await new Promise(resolve => {
		const interval = setInterval(() => {
			say(lastRequest)
			if (condition) {
				clearInterval(interval);
			};
		}, 4000);
	});
}
module.exports = async (request, response) => {
	try {
		//const { test_trigger } = request.body;
		lastRequest = request;
		await startBot(request);
		await say(request);

		/*
		if (test_trigger) {
			console.log('Triggered manually for testing:');
			check()
		} else {
			lastRequest = request;
			await startBot(request);
			await say(request);
		}
		*/
		cron.schedule('* * * * *', async () => {
			console.log('Running a task every minute');
			const message = `hippui`;
			await say(lastRequest)
			// Place your task logic here
		});
		//triggerNextRun();

		//let timerId = setInterval(await say(request), 2000);
		//await waitUntil(lastRequest == null)
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
	// Schedule 'say' to be called every 10 minutes with the last received message


};
