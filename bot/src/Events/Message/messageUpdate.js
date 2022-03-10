const { MessageEmbed, Message, WebhookClient } = require("discord.js");

const messageUpdateFunc = {
    name: "messageUpdate",
    /**
     * 
     * @param {Message} newMessage 
     * @param {Message} oldMessage 
     */
    execute(newMessage, oldMessage) {
        if (oldMessage.author.bot) return;
        
        if (oldMessage.content === newMessage.content) return;

        const Count = 1950;
        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? "..." : "");
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? "..." : "");

        const Log = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.avatarURL({ dynamic: true, size: 512 }) })
            .setDescription(`🧾 A [message](${oldMessage.url}) by ${oldMessage.author.tag} was **edited** in ${oldMessage.channel}\n
            **Original**: \n${Original}\n**Edited**:\n${Edited}`.slice(0, 4096))
        
        new WebhookClient({ url: "https://discord.com/api/webhooks/951404134131724299/6HTDvKVBwjxCzrsQf3RDBDbOLFQmMIA7JWQTLKqzeaPZXemNO9ma1bRshImY66Kr1Ats" })
            .send({embeds: [Log]}).catch((error) => console.log(error));
    }
}

module.exports = messageUpdateFunc;