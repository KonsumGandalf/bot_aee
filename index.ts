import DiscordJS, { Intents, Interaction } from "discord.js";
import dotenv from "dotenv";
import WOKCommands from "wokcommands";
import path from 'path';
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], // https://ziad87.net/intents/
});

client.on("ready", () => {
    console.log("The bot is ready!");
    
    const guildId = "939837347363704902";
    const guild = client.guilds.cache.get(guildId);

    let commands;
    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'reaction to the ping.'
    });

    commands?.create({
        name: 'add',
        description: 'Adds two numbers',
        options: [
            {
                name: 'num1',
                description: 'The first number',
                required: true, 
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
            {
                name: 'num2',
                description: 'The second number',
                required: true, 
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
            }
        ]
    })


});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    };

    const { commandName, options } = interaction;

    if (commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: true,
        })
    }
    else if (commandName === 'add') {
      const sum = options.getNumber("num1")! + options.getNumber("num2")!;

      await interaction.deferReply({
        ephemeral: true,
      });
        
      await new Promise((resolve) => setTimeout(resolve, 1000))

      await interaction.editReply({
        content: `The sume of the number is ${sum}`,
      });
    }

})
// Listen for new messages
client.on('messageCreate', (msg) => {


  /** 
  if (msg.content === "ping") {
    msg.reply({
      content: "pong",
    });
  }*/
});

client.login(process.env.TOKEN);
