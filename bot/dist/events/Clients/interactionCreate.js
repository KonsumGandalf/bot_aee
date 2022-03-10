"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { CommandInteractionOptionResolver } = require('discord.js');
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
exports.module = {
    name: "interactionCreate",
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interaction.isCommand()) {
                const command = client.commands.get(interaction.commandName);
                if (!command) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed().setColor("RED").setDescription("🛑 the running Command throwed an error")
                        ]
                    }) && client.command.delete(interaction.commandName);
                    command.execute(interaction, client);
                }
            }
        });
    },
};
