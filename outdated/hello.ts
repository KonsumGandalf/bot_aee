

const { SlashCommandBuilder } = require("@discordjs/builders");

const sayHello = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with Hello!'),
  async execute(interaction) {
    await interaction.reply("Hello");
  },
};

/** const ping = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with pong'); */

export { sayHello };
