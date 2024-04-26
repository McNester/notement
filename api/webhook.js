process.env.NTBA_FIX_319 = 'test';
const { startBot, say } = require('../bot');
const nodeSchedule = require('node-schedule');
const { CronJob } = require('cron');
// Schedule 'say' to be called every 10 minutes
let lastRequest = null;
const job = new CronJob('*/1 * * * *', async function() {
	console.log('Checking if scheduler should execute...');
	try {
		console.log('Executing scheduled task...');
		await say(lastRequest);
		console.info(lastRequest);
	} catch (error) {
		console.error('Error in scheduled say() execution:', error);
	}
}, null, true, 'America/New_York'); // Replace 'America/New_York' with your time zone

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
job.start();
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


};
