const { CommandInteraction } = require( 'discord.js');

const data = {
    name: "ping",
    description: "PingPong",
    permissions: "ADMINISTRATOR",
    
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const message = await interaction.reply({ content: 'where father', fetchReply: true })
        const channel = await interaction.guild.channels.fetch(interaction.channelId);

        //const filter = (interaction) => interaction.user === "263363960764497931"
        // channel.awaitMessages({ filter, max: 1, time: 60_000, errors: ['time'] })

        await channel.send("moin");
    }
}

module.exports = data;