const { MessageEmbed, WebhookClient, Message } = require("discord.js");

const messageDeleteFunc = {
    name: "messageDelete",
    /**
     * 
     * @param {Message} deletedMessage 
     */
    execute(deletedMessage) {
        if (deletedMessage.bot) return;
        
        const Log = new MessageEmbed()
            .setColor("RED")
            .setAuthor({ name: deletedMessage.author.tag, iconURL: deletedMessage.author.avatarURL({ dynamic: true, size: 512 }) })
            .setDescription(`📕 A [message](${deletedMessage.url}) by ${deletedMessage.author.tag} was **deleted** in ${deletedMessage.channel}\n
            **Deleted Message**: \n${deletedMessage.content ? deletedMessage.content : "None"}`.slice(0, 4096));
        
        if (deletedMessage.attachments >= 1) {
            Log.addField({ name: "Attachments", value: `${deletedMessage.attachments.map((att) => att.url)}` }, true);   
        };
        
        new WebhookClient({ url: "https://discord.com/api/webhooks/951409337509769256/3J924upV0fn7_QqWPbJLC205FTnfxhMvUkiii1WB1grvIbO9J2T4pfN_uyoPCy5Wzs-m" })
            .send({embeds: [Log]}).catch((error) => console.log(error));
    }
}

module.exports = messageDeleteFunc;
