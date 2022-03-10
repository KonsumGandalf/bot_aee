const { CommandInteractionOptionResolver } = require('discord.js');

const { Client, CommandInteraction, MessageEmbed } = require('discord.js');

module.exports = {
  name: "interactionCreate",
  /**
   * 
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      const command = client.commands.get(interaction.commandName);
      console.log(command.name)
      if (!command) 
        return interaction.reply({
          embeds: [
            new MessageEmbed().setColor("RED").setDescription("🛑 the running Command throwed an error")
          ]}) && client.commands.delete(interaction.commandName);

      command.execute(interaction, client);
    }
  },
};
