import { SlashCommandBuilder } from "@discordjs/builders";

const memeFunc = new SlashCommandBuilder()
    .setName("gif")
    .setDescription("Sends a random gif!")
    .addStringOption((option) =>
      option
          .setName("category")
          .setDescription("The gif category")
          .setRequired(true)
          .addChoice("Funny", "gif_funny")
          .addChoice("Meme", "gif_meme")
          .addChoice("Movie", "gif_movie"),
    );

const meme = {
  data: memeFunc,
  async execute(interaction) {
    await interaction.reply("moin");
  },
};

export { meme };
