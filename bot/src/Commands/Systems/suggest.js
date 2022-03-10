const { Embed } = require('@discordjs/builders');
const { CommandInteraction, MessageEmbed, Message } = require('discord.js');

const suggestCommand = {
    name: "suggest",
    description: "Create a suggestion in an organized matter",
    options: [
        {
            name: "type",
            description: "Select a type",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "Command", 
                    value: "Command",
                },
                {
                    name: "Event",
                    value: "Event",
                },
                {
                    name: "System",
                    value: "System",
                }
            ]
        },
        {
            name: "name",
            description: "Provide a sample name for the suggestion",
            required: true,
            type: "STRING",
        },
        {
            name: "functionality",
            description: "Describe the functionality of the suggestion",
            required: true,
            type: "STRING"
        },
    ],
    /**
     * 
     * @param {CommandInteraction} ineraction 
     */
    async execute(interaction) {
        const { options, channel } = interaction;

        const type = options.getString("type");
        const name = options.getString("name");
        const func = options.getString("functionality");

        const ResponseDecl = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${interaction.member} suggested a ${type}`)
            .addField("Name", `${name}`, true)
            .addField("Functionality", `${func}`, true)
        
        let messageToReact = await interaction.reply({ embeds: [ResponseDecl], fetchReply: true });
        messageToReact.react("<:pompeius_rome:951064828464730142>").then(console.log).catch(console.error);
        messageToReact.react("<:antionius_rome:951065215003410432>").then(console.log).catch(console.error);
    }
}

module.exports = suggestCommand;
