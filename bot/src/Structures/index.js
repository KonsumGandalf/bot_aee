const { Client, Collection, Intents, DiscordAPIError } = require( "discord.js");
const { token } = require("./config/discord.json");
const { database } = require("./config/mongo.json");
const fs = require("fs");
// makes the next 4 lines avaiable to all Handlers
const { promisify } = require( "util");
const { glob } = require( "glob");
const pg = promisify(glob);
const Ascii = require("ascii-table");

// const Intent = new Intents([Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES])

const client = new Client({ intents: 32767 });

client.commands = new Collection();

const handlerDir = `${process.cwd()}/src/Handlers`
fs.readdirSync(handlerDir).map((file) => {
    if (file.includes('.js')) {
        require(`${handlerDir}/${file}`)(client, pg, Ascii);
    }
})

client.login(token);
