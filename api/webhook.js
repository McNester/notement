process.env.NTBA_FIX_319 = 'test';
const { startBot, say } = require('../bot');
const axios = require('axios'); // Ensure axios is installed via npm
let lastRequest = null;
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
		const triggeredFrom = request.body.source;
		const timestamp = request.body.timestamp;
		if (triggeredFrom === 'triggerNextRun') {
			await say(lastRequest)
			console.log(`Function was triggered from ${triggeredFrom} at ${timestamp}.`);
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
