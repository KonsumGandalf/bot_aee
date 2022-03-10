const Perms = require( "../Validation/PermissionNames");
const Events = require("../Validation/EventNames");
const { guildId } = require("../Structures/config/discord.json");
const { Client, Guild } = require( 'discord.js');


/**
 * @param {Client} client
 */

module.exports = async (client, pg, Ascii) => {
  const Table = new Ascii("Command Loaded");

  const CommandsArray = [];

  (await pg(`${process.cwd()}/src/Commands/*/*.js`)).map(async (file) => { // __dirname alternative
    const command = require(file);

    if (!command.name) {
      return Table.addRow(file.split("/")[7], "🛑 Failed", "Missing a name.");
    }

    if (!command.description && !command.context) {
      return Table.addRow(command.name, "🛑 Failed", "Missing a description.");
    }

    if (command.permission) {
      if (Perms.includes(command.permission)) {
        command.defaultPermission = false;
      } else {
        return Table.addRow(command.name, "🛑 Failed", "Wrong Permissions.");
      }
    }
    client.commands.set(command.name, command);
    CommandsArray.push(command);
    
    await Table.addRow(command.name, "✅ SUCCESSFULL");
  }); 

  console.log(Table.toString());

  // PERMISSION CHECK //
  
  client.on("ready", async () => {
    const MainGuild = await client.guilds.cache.get(guildId);

    MainGuild.commands.set(CommandsArray).then(async (command) => {
      const Roles = (commandName) => {
        const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;

        if (!cmdPerms) return null;
        return MainGuild.roles.cache.filter((role) => role.permissions.has(cmdPerms));
      }

      const fullPermissions = command.reduce((accumulator, role) => {
        const roles = Roles(role.name);
        if (!roles) {
          return accumulator;
        }

        const permission = roles.reduce((a, role) => {
          return [...a, { id: role.id, type: "ROLE", permission: true }]
        }, []);
        
        return [...accumulator, {id: role.id, permission: true}]
      }, [])
      await MainGuild.commands.permissions.set( {fullPermissions} )
    })
  })
  
};
