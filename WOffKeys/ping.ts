import { ICommand } from 'wokcommands';

/** module.exports = {
  data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
}; */

export default {
  category: 'Testing',
  description: 'Replies with pong',

  slash: true,
  testOnly: true,

  callback: ({ message, interaction }) => {
    if (message) {
      message.reply("Shut up");
    }

    if (interaction) {
      interaction.reply({
        ephemeral: true,
        content: 'Moin Servus Moin CoCk',
      });
    }
  },
} as ICommand;
