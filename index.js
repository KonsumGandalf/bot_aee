const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { token } = require('./config.json');

client.on('ready', () => {
	console.log('The client is ready!');
});

client.login(token.token);
