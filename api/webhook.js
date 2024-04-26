process.env.NTBA_FIX_319 = 'test';
const { startBot, say } = require('../bot');
const nodeSchedule = require('node-schedule');
const { CronJob } = require('cron');
// Schedule 'say' to be called every 10 minutes
let lastRequest = null;
//const job = new CronJob('*/1 * * * *', async function() {
/*
	console.log('Checking if scheduler should execute...');
	try {
		console.log('Executing scheduled task...');
		await say(lastRequest);
		console.info(lastRequest);
	} catch (error) {
		console.error('Error in scheduled say() execution:', error);
	}
}, null, true, 'America/New_York'); // Replace 'America/New_York' with your time zone
*/

//nodeSchedule.scheduleJob('*/1 * * * *', async () => {
/*
	console.log('Executing scheduled task every 10 minutes');
	console.info('here' + lastRequest)
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
*/
//job.start();
const timeoutThreshold = 10000; // 10 seconds
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
	const timer = setTimeout(() => {
		console.log('Preemptive response to avoid 504 Timeout');
		response.status(202).send('Processing...'); // Respond with 202 Accepted as processing continues
	}, timeoutThreshold);

	try {

		// Store the chat ID and message
		lastRequest = request;

		await startBot(request);
		say(request);  // Direct reply	}
		//let timerId = setInterval(await say(request), 2000);
		await waitUntil(lastRequest == null)
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
