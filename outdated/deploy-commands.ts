/* eslint-disable no-tabs */
import fs from "fs";
import path from 'path';
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { clientId, guildId, token } from "../bot/src/config/discord.json";

const commands = [];
const commandsPath = path.join(__dirname, "commands");
console.log(commandsPath);
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const commandDict = require(`${commandsPath}/${file}`);
  // eslint-disable-next-line guard-for-in
  for (const key in commandDict) {
    console.log(commandDict[key].data);
    commands.push(commandDict[key].data.toJSON());
  }
}

const rest = new REST({ version: "9" }).setToken(token);

rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);


(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
    );

    console.log('Registered all (/) commands.');
  } catch (error) {
    console.log(error);
  }
})();
/* Alternative
 * (async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})(); */
