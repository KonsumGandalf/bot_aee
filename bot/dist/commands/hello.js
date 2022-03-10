"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sayHello = void 0;
const { SlashCommandBuilder } = require("@discordjs/builders");
const sayHello = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with Hello!'),
    async execute(interaction) {
        await interaction.reply("Hello");
    },
};
exports.sayHello = sayHello;
