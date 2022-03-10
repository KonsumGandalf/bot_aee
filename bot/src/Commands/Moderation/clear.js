const { CommandInteraction, MessageEmbed, Message } = require("discord.js");

const clearCommand = {
    name: "clear",
    description: "This command clears the number of specified message of a target (channel / user)",
    // permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "target",
            description: "Select the target to clear - default: this channel",
            required: false,
            type: "USER",
        },
        {
            name: "amount",
            description: "Select the number of deleted messages - default: 5",
            required: false,
            type: "NUMBER",
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount") || 5;
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
            .setColor("PURPLE");
        
        if (Target) {
            let i = 0;
            const filtered = [];

            Messages.filter((mes) => {
                if (mes.author.id === Target.id && Amount > i) {
                    filtered.push(mes);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then((mes) => {
                Response.setDescription(`🖌 Cleared ${mes.size} from ${Target}.`);
                interaction.reply({ embeds: [Response],  ephemeral: true });
            })
        } else {
            await channel.bulkDelete(Amount, true).then((mes) => {
                Response.setDescription(`🖌 Cleared ${mes.size} from this channel.`);
                interaction.reply({ embeds: [Response],  ephemeral: true});
            })
        }
    }
}

module.exports = clearCommand;