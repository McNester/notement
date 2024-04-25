process.env.NTBA_FIX_319 = 'test';
const { startBot, say } = require('../bot');
const nodeSchedule = require('node-schedule');
// Schedule 'say' to be called every 10 minutes
nodeSchedule.scheduleJob('*/10 * * * *', function() {
	console.log('Executing scheduled task every 10 minutes');
	// Ensure the `say()` function is called correctly with necessary parameters
	say();
});
let lastRequest = null;

module.exports = async (request, response) => {
	try {
		// Store the chat ID and message
		lastRequest = request;

		await startBot(request);
		await say(request);  // Direct reply	}
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
	nodeSchedule.scheduleJob('*/3 * * * *', async () => {
		console.log('Executing scheduled task every 10 minutes');
		if (lastRequest != null) {
			try {
				await say(lastRequest);
			} catch (error) {
				console.error('Error in scheduled say() execution:', error);
			}
		} else {
			console.log('No user request stored yet.');
		}
	});

};
