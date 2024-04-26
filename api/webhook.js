process.env.NTBA_FIX_319 = 'test';
const { startBot, say } = require('../bot');
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

app.post('/api/webhook', async (req, res) => {
	const { test_trigger, message } = req.body;

	if (test_trigger) {
		console.log('Received a test webhook trigger:', message);
		await say(lastRequest)
		// Handle test logic or respond differently
		res.status(200).send('Test webhook processed successfully.');
	} else {
		console.log('Received a real Telegram message:', message);
		// Process the message as you would in production
		res.status(200).send('Telegram webhook processed successfully.');
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = async (request, response) => {
	try {
		if (request.body.triggerSource && request.body.triggerSource === 'trig') {
			console.log('Triggered manually for testing:');
			await say(lastRequest)
		} else {
			lastRequest = request;
			await startBot(request);
			await say(request);  // Direct reply	}
		}
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
