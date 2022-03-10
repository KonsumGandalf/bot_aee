"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverinfo = exports.info = void 0;
const builders_1 = require("@discordjs/builders");
const infoFunc = new builders_1.SlashCommandBuilder()
    .setName('info')
    .setDescription('Get infos about server properties')
    .addSubcommand((subcommad) => subcommad
    .setName("serverinfo")
    .setDescription("Returns current serverinfo!")
    .addUserOption((option) => option.setName('target').setDescription('The user name')))
    .addSubcommand((subcommand) => subcommand
    .setName('server')
    .setDescription('Info about the server'));
const info = {
    data: infoFunc,
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'serverinfo') {
            await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
        }
        else {
            await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
        }
    },
};
exports.info = info;
const serverinfo = {
    data: new builders_1.SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Returns current serverinfo!"),
    async execute(interaction) {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    },
};
exports.serverinfo = serverinfo;
const userinfo = {
    data: new builders_1.SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Returns current userinfo!"),
    async execute(interaction) {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    },
};
