const { SlashCommandBuilder } = require("@discordjs/builders");

const say_hello = new SlashCommandBuilder()
  .setName('hello')
  .setDescription('Replies with Hello!');

/** const ping = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with pong'); */


module.exports = {
  data: say_hello,
  async execute(interaction) {
    await interaction.reply("Hello");
  },
};