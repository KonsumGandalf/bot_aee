"use strict";
const discord_js_1 = require("discord.js");
const discord_json_1 = require("./config/discord.json");
const client = new discord_js_1.Client({ intents: ['GUILDS'] });
client.commands = new discord_js_1.Collection();
require('./Handlers/events')(client);
client.login(discord_json_1.token);
module.exports = {};
