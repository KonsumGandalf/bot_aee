"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-tabs */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const discord_json_1 = require("./config/discord.json");
const commands = [];
const commandsPath = path_1.default.join(__dirname, "commands");
console.log(commandsPath);
const commandFiles = fs_1.default
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
const rest = new rest_1.REST({ version: "9" }).setToken(discord_json_1.token);
rest
    .put(v9_1.Routes.applicationGuildCommands(discord_json_1.clientId, discord_json_1.guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Started refreshing application (/) commands.');
        yield rest.put(v9_1.Routes.applicationGuildCommands(discord_json_1.clientId, discord_json_1.guildId), { body: commands });
        console.log('Registered all (/) commands.');
    }
    catch (error) {
        console.log(error);
    }
}))();
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
