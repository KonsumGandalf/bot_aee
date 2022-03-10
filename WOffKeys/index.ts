/* eslint-disable require-jsdoc */
export = {};

import fs from "fs";
import WOKCommands from "wokcommands";
import DiscordJS, {
  Client,
  ClientOptions,
  Collection,
  Intents,
} from "discord.js";
import path from "path";
import { token, guildId, clientId } from "./config/discord.json";
import { url } from "./config/mongo.json";
import mongoose from "mongoose";
import testSchema from './test-schema';

const client: Client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", async () => {
  await mongoose.connect(url, {
    keepAlive: true,
  });

  console.log("Bot is ready"),
  new WOKCommands(client, {
    commandDir: path.join(__dirname, "commands"),
    testServers: [guildId],
    botOwners: [clientId],
  });

  setTimeout(async () => {
    await new testSchema({
      message: 'shut up',
    }).save();
  }, 1000);
});

client.login(token);
