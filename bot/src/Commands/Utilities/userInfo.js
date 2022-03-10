const { ContextMenuInteraction, MessageEmbed} = require("discord.js");
const { execute } = require('../Developer/emit');

const userinfoCommand = {
    name: "User Info",
    type: "USER",
    context: true,
    permissions: "MANAGE_MESSAGE",
    /**
     * 
     * @param {ContextMenuInteraction} interaction
     */
    async execute(interaction) {
        const Target = await interaction.guild.members.fetch(interaction.targetId);

        if (Target) {
            const Response = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(Target.user.tag, Target.user.avatarURL({dynamic: true, size: 512}))
                .addField("ID", `${Target.user.id}`)
                .addField("Roles", `${Target.roles.cache.map((r) => r).join(" ").replace("@everyone", "") || "None"}`)
                .addField("Member Since", `<t:${parseInt(Target.joinedTimestamp / 1000)}:R>`)
                .addField("Discord User Since", `<t:${parseInt(Target.user.createdTimestamp / 1000)}:R>`);
            
            interaction.reply({embeds: [Response]})
        }
    }
}

module.exports = userinfoCommand;