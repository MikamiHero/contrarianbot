const tmi = require("tmi.js");

// constants we'll need
const {
	MASTER_CHANNEL,
	OWN_CHANNEL,
	USERNAME,
	URGHBOT,
} = require("./constants");

// util functions
const { constructMessage } = require("./utils");

// environment
require("dotenv").config();

// Setting up the bot options
const initialOptions = {
	options: {
		// Bot debug (set to 'false' in production)
		debug: process.env.NODE_ENV === "production" ? false : true,
	},
	connection: {
		reconnect: true,
	},
	identity: {
		// bot name
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_BOT_PASSWORD,
	},
	channels: [OWN_CHANNEL, MASTER_CHANNEL],
};

(async () => {
	try {
		console.log(`Welcome. Debug status: ${initialOptions.options.debug}`);

		//NB: Make redo if other people want to it
		const options = { ...initialOptions };
		const client = new tmi.client(options);

		client.connect();

		// upon connecting, message the bot displays
		client.on("connected", (address, port) => {
			options.channels.forEach((channel) => {
				client.say(
					channel,
					"Okay, but can we really be certain I'm connected?"
				);
			});
		});

		// Logic for what happens on a message
		client.on("chat", async (channel, user, message, self) => {
			// We don't want the bot looping
			if (self) {
				return;
			} else {
				// Checking the username of the author of the message
				const username = user[USERNAME];
				// Only really do anything if the message came from Urghbot
				if (username === URGHBOT) {
					// If the message came from Urghbot, find the thing to oppose
					const wordToOppose = message.split(". ")[1].toLowerCase();
					// If the message is "I'm connected" from Urghbot
					const opposeMessage =
						wordToOppose === "I'm connected..."
							? `Are you sure you're connected? Two sides to every story...`
							: constructMessage(wordToOppose);
					client.say(channel, opposeMessage);
				}
			}
		});
	} catch (e) {
		console.log(e);
	}
})();
