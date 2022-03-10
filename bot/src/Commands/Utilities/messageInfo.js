const { ContextMenuInteraction, MessageEmbed} = require("discord.js");
const { execute } = require('../Developer/emit');

const userinfoCommand = {
    name: "Message Info",
    type: "MESSAGE",
    permissions: "MANAGE_MESSAGE",
    context: true,
    /**
     * 
     * @param {ContextMenuInteraction} interaction
     */
    async execute(interaction) {
        const Target = await interaction.channel.messages.fetch(interaction.targetId);
        console.log(Target.channel);
        if (Target) {
            const Response = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(Target.author.tag, Target.author.avatarURL({ dynamic: true, size: 512 }))
                .addField("Message ID", `${Target.id}`)
                .addField("Channel", `${Target.channel}`)
                .addField("Member Created", `<t:${parseInt(Target.createdTimestamp / 1000)}:R>`);
            
            interaction.reply({embeds: [Response]})
        }
    }
}

module.exports = userinfoCommand;