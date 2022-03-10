import { SlashCommandBuilder } from "@discordjs/builders";

const infoFunc = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get infos about server properties')
    .addSubcommand((subcommad) =>
      subcommad
          .setName("serverinfo")
          .setDescription("Returns current serverinfo!")
          .addUserOption((option) => option.setName('target').setDescription('The user name')))
    .addSubcommand((subcommand) =>
      subcommand
          .setName('server')
          .setDescription('Info about the server'));

const info = {
  data: infoFunc,
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'serverinfo') {
      await interaction.reply(
          `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`,
      );
    } else {
      await interaction.reply(
          `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
      );
    }
  },
};

const serverinfo = {
  data: new SlashCommandBuilder()
      .setName("serverinfo")
      .setDescription("Returns current serverinfo!"),
  async execute(interaction) {
    await interaction.reply(
        `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`,
    );
  },
};

const userinfo = {
  data: new SlashCommandBuilder()
      .setName("userinfo")
      .setDescription("Returns current userinfo!"),
  async execute(interaction) {
    await interaction.reply(
        `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`,
    );
  },
};


export { info, serverinfo };
