"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const data = {
    name: "ping",
    description: "Ping",
    permissions: "ADMINISTRATOR",
    execute(interaction) {
        interaction.reply({ content: "PONG" });
    }
};
exports.data = data;
