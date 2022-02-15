const { SlashCommandBuilder } = require('@discordjs/builders');

const serverinfo = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Returns current serverinfo!'),
	async execute(interaction) {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	},
};

const userinfo = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Returns current userinfo!'),
	async execute(interaction) {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	},
};

module.exports = {
    serverinfo: serverinfo,
    userinfo: userinfo,
};