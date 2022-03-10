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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PermissionNames_1 = require("../Validation/PermissionNames");
const glob_1 = require("glob");
const util_1 = require("util");
const discord_json_1 = require("../config/discord.json");
const ascii_table_1 = __importDefault(require("ascii-table"));
const pg = (0, util_1.promisify)(glob_1.glob);
/**
 * @param {Client} client
 */
module.exports = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const Table = new ascii_table_1.default("Command Loaded");
    const CommandsArray = [];
    (yield pg(`${process.cwd()}/src/Commands/*/*.js`)).map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const command = require(file);
        if (!command.name) {
            return Table.addRow(file.split("/")[7], "🛑 Failed", "Missing a name.");
        }
        if (!command.description) {
            return Table.addRow(command.name, "🛑 Failed", "Missing a description.");
        }
        if (command.permission) {
            if (PermissionNames_1.Perms.includes(command.permission)) {
                command.defaultPermission = false;
            }
            else {
                return Table.addRow(command.name, "🛑 Failed", "Wrong Permissions.");
            }
        }
        client.command.set(command.name, command);
        CommandsArray.push(command);
        yield Table.addRow(command.name, "✅ SUCCESSFULL");
    }));
    console.log(Table.toString());
    // PERMISSION CHECK //
    client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
        const MainGuild = yield client.guilds.get.cache.get(discord_json_1.guildId);
        MainGuild.commands.set(CommandsArray).then((command) => __awaiter(void 0, void 0, void 0, function* () {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c) => c.name === commandName).permission;
                if (cmdPerms)
                    return null;
                return MainGuild.roles.cache.filter((role) => role.permissions.has(cmdPerms));
            };
            const fullPermissions = command.reduce((accumulator, role) => {
                const roles = Roles(role.name);
                if (!roles) {
                    return accumulator;
                }
                const permission = roles.reduce((a, role) => {
                    return [...a, { id: role.id, type: "Roles", permission: true }];
                }, []);
                return [...accumulator, { id: role.id, permission: true }];
            }, []);
            yield MainGuild.commands.permissions.set({ fullPermissions });
        }));
    }));
});
