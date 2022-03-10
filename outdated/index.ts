export = {};

import fs from "fs";
import { Client, Collection, Intents } from "discord.js";
import { token } from "../bot/src/config/discord.json";
import path from 'path';
import { REST } from '@discordjs/rest';

const client: any = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const commandDict = require(`${commandsPath}/${file}`);
  // eslint-disable-next-line guard-for-in
  for (const key in commandDict) {
    client.commands.set(commandDict[key].data.name, commandDict[key]);
  }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

console.log(eventFiles)

for (const file of eventFiles) {
  const event = require(`${eventsPath}/${file}`).default!;
  console.log(event);
  if (event.once) {
    console.log('in once');
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    console.log("in on");
    client.on(event.name, (...args) => event.execute(...args));
  }
}


/** client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
}); */

client.login(token);
