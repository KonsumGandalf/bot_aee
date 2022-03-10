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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { database } = require("../../config/mongo.json");
module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
     */
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            client.user.setActivity("Deine MUM", { type: "WATCHING" });
            console.log(`Ready! Logged in as ${client.user.tag}`);
            if (!database)
                return;
            mongoose
                .connect(database)
                .then(() => {
                console.log("Client is now connected to mongoDB!");
            })
                .catch(console.error);
        });
    },
};
// exports.module = data;
