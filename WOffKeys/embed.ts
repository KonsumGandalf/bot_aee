import { MessageEmbed } from 'discord.js';
import { ICommand } from 'wokcommands';

export default {
  category: 'Testing',
  description: 'Send an embed',

  permissions: ['ADMINISTRATOR'],

  callback: ({ message, text }) => {
    const embed = new MessageEmbed()
        .setDescription('Moin servus moin')
        .setTitle('Title')
        .setColor('RED')
        .addFields([
            {name: 'n1', value: 'moin'},
            { name: 'n2', value: 'servus'},
        ]);

    return embed;
  },
} as ICommand;
