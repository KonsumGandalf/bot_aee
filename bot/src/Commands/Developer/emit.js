const { CommandInteraction, Client } = require('discord.js');

const emit = {
    name: "emit",
    description: "Event Emitter",
    permissions: "ADMINISTRATOR",
    options: [
        {
            name: "member",
            description: "Guild Member Events.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "guildMemberAddDisplay",
                    value: "guildMemberAdd"
                },                
                {
                    name: "guildMemberRemove",
                    value: "guildMemberRemove"
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    execute(interaction, client) {
        const choices = interaction.options.getString("member");

        switch (choices) {
            case "guildMemberAdd": {
                interaction.reply({content: `Emitted the event: ${choices}.`, ephemeral: true})
                client.emit("guildMemberAdd", interaction.member);
            }
            break;
            case "guildMemberRemove": {
                interaction.reply({content: `Emitted the event: ${choices}.`, ephemeral: true})
                client.emit("guildMemberRemove", interaction.member);
            }
            break;
        }
    }
}

module.exports = emit;
