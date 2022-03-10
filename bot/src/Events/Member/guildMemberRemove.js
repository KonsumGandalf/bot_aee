const { MessageEmbed, WebhookClient, GuildMember, MessageActionRow } = require('discord.js');

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;        

        //https://discord.com/api/webhooks/950713431063937054/cfi6heAXr5o9UABxP-S2BZ8NbAqYAO6nDxbSzMl6i2sKSGrN5ZEDPm2qzGQL8Vb-Sgcf
        const Logger = new WebhookClient({
            id: "950713431063937054",
            token: "cfi6heAXr5o9UABxP-S2BZ8NbAqYAO6nDxbSzMl6i2sKSGrN5ZEDPm2qzGQL8Vb-Sgcf"
        });

        const logMessage = new MessageEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 128 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 128 }))
            .setDescription(`
            ${member} has left the Kingdom😢\n
            AccountCreated: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
            .setFooter(`**ID** ${user.id}`);
        
        Logger.send({ embeds: [logMessage] });
    }
}