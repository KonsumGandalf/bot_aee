"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meme = void 0;
const builders_1 = require("@discordjs/builders");
const memeFunc = new builders_1.SlashCommandBuilder()
    .setName("gif")
    .setDescription("Sends a random gif!")
    .addStringOption((option) => option
    .setName("category")
    .setDescription("The gif category")
    .setRequired(true)
    .addChoice("Funny", "gif_funny")
    .addChoice("Meme", "gif_meme")
    .addChoice("Movie", "gif_movie"));
const meme = {
    data: memeFunc,
    async execute(interaction) {
        await interaction.reply("moin");
    },
};
exports.meme = meme;
