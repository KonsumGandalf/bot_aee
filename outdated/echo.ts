import { SlashCommandBuilder } from '@discordjs/builders';

const permission = [
  {
    id: "263363960764497931",
    type: "USER",
    permission: false,
  },
];

const dataFunc = new SlashCommandBuilder()
    .setName('echo')
    .setDescription('This replies with your input')
    .setDefaultPermission(false)
    .addStringOption((option) =>
      option.setName('input').setDescription('The input block used in the reply').setRequired(true))
    .addIntegerOption((option2) =>
      option2
          .setName('times')
          .setDescription('Defines the number of times the "input" is printed')
          .setRequired(false),
    );

const echo = {
  data: dataFunc,
  async execute(interaction) {
    await interaction.reply('moin');
  },
};

export { echo };
