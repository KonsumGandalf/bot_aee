const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const ms = require("ms")

const giveAwayFunc = {
    name: "giveaway",
    description: "A complete giveaway system",
    permissions: "ADMINISTRATOR",
    options: [
        {
            name: "start",
            description: "Start of the giveaway.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "duration",
                    description: "Provide a duration for this giveaway (1m, 1h, 1d)",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "winners",
                    description: "Provide the amount of winners.",
                    type: "INTEGER",
                    required: true,
                },
                {
                    name: "prize",
                    description: "The name of the provided prize.",
                    type: "STRING",
                    required: true,
                },
                {
                    name: "channel",
                    description: "Provide the channel of the giveaway",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"], 
                }
            ]
        },
        {
            name: "actions",
            description: "Options for the giveaway.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Select an option",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "end",
                            value: "end"
                        },
                        {
                            name: "pause",
                            value: "pause"
                        },
                        {
                            name: "unpause",
                            value: "unpause"
                        },
                        {
                            name: "reroll",
                            value: "reroll"
                        },
                        {
                            name: "delete",
                            value: "delete"
                        },
                        
                    ]
                },
                {
                    name: "message-id",
                    description: "Provide the message id of the giveaway.",
                    type: "STRING",
                    required: true
                }
            ]
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options } = interaction;
        const Sub = options.getSubcommand();

        const errEmbed = new MessageEmbed()
            .setColor("RED")
        
        const successEmbed = new MessageEmbed()
            .setColor("GREEN")
        
        
        switch (Sub) {
            case "start": {
                const gchannel = options.getChannel("channel") || interaction.channel;
                const duration = options.getString("duration");
                const winnerCount = options.getInteger("winners");
                const prize = options.getString("prize");

                client.giveawaysManager.start(gchannel, {
                    duration: ms(duration),
                    winnerCount,
                    prize,
                    messages: {
                        giveaway: "💜💜 **Giveaway is started** 💜💜",
                        giveawayEnded: "🤷‍♀️🤷‍♀️ **Giveaway ended** 🤦‍♀️🤦‍♀️",
                        winMessage: "Congrats, {winners}! You musing heads won **{this.prize}**!",
                    }
                }).then(async => {
                    successEmbed.setDescription("Giveaway was successfully started!");
                    return interaction.reply({embeds: [successEmbed]})
                }).catch((err) => {
                    errEmbed.setDescription(`Giveaway was abborted!\nError: ${err}`);
                    return interaction.reply({embeds: [errEmbed], ephemeral: true})
                })

            }; break;
            case "actions": {
                const choice = options.getString("options");
                const messageId = options.getString("message-id");

                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && messageId === g.messageId);

                if (!giveaway) {
                    errEmbed.setDescription(`Unable to find the giveaway of the message id: ${messageId} and the guild ${interaction.guildId}`);
                    return interaction.reply({embeds: [errEmbed], ephemeral: true})
                }
                switch (choice) {
                    case "end": {
                        client.giveawaysManager.end(messageId).then(() => {
                            successEmbed.setDescription('Giveaway has been pauses!〽');
                            return interaction.reply({embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errEmbed.setDescription(`An error has occurred, please check and try again.\n\`${err}\``);
                            return interaction.reply({embeds: [errEmbed], ephemeral: true });
                        });
                    } break;
                    case "pause": {
                        client.giveawaysManager.pause(messageId).then(() => {
                            successEmbed.setDescription('Giveaway has been paused!⏸');
                            return interaction.reply({embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errEmbed.setDescription(`An error has occurred, please check and try again.\n\`${err}\``);
                            return interaction.reply({embeds: [errEmbed], ephemeral: true });
                        });
                    } break;
                    case "unpause": {
                        client.giveawaysManager.unpause(messageId).then(() => {
                            successEmbed.setDescription('Giveaway has been unpaused!▶');
                            return interaction.reply({embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errEmbed.setDescription(`An error has occurred, please check and try again.\n\`${err}\``);
                            return interaction.reply({embeds: [errEmbed], ephemeral: true });
                        });
                    } break;
                    case "reroll": {
                        client.giveawaysManager.reroll(messageId).then(() => {
                            successEmbed.setDescription('Giveaway has been rerolled!⌛');
                            return interaction.reply({embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errEmbed.setDescription(`An error has occurred, please check and try again.\n\`${err}\``);
                            return interaction.reply({embeds: [errEmbed], ephemeral: true });
                        });
                    }
                    ;break;
                    case "delete": {client.giveawaysManager.delete(messageId).then(() => {
                            successEmbed.setDescription('Giveaway has been deleted!❌');
                            return interaction.reply({embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errEmbed.setDescription(`An error has occurred, please check and try again.\n\`${err}\``);
                            return interaction.reply({embeds: [errEmbed], ephemeral: true });
                        });
                    } break;
                }
            }; break;

            default: {
                console.log("something went wrong");
            }; break;
        }
    }
}

module.exports = giveAwayFunc;