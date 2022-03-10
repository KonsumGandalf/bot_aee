const { MessageEmbed, WebhookClient, GuildMember, MessageActionRow } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;

        //https://discord.com/api/webhooks/950708036081713173/unR7V_xYdSCR6tB5lKhX5ltpIXd3MIxSEsYn93bw4fE5BRv7KDNHz16ZG1qZXUqSLHlh
        const Logger = new WebhookClient({
            id: "950708036081713173",
            token: "unR7V_xYdSCR6tB5lKhX5ltpIXd3MIxSEsYn93bw4fE5BRv7KDNHz16ZG1qZXUqSLHlh"
        });

        const logMessage = new MessageEmbed()
            .setColor("LUMINOUS_VIVID_PINK")
            .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 512 }))
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`
            Welcome ${member} to the community💜\n
            AccountCreated: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)
            .setFooter(`**ID** ${user.id}`);
        
        Logger.send({ embeds: [logMessage] });
    }
}