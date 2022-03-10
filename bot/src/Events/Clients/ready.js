const { Client } = require( "discord.js");
const mongoose = require("mongoose");
const { database } = require("../../Structures/config/mongo.json");


module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
    client.user.setActivity("Deine MUM", { type: "WATCHING" });
    console.log(`Ready! Logged in as ${client.user.tag}`);

    if (!database) return;
    mongoose
        .connect(database)
        .then(() => {
          console.log("Client is now connected to mongoDB!");
        })
        .catch(console.error);
  },
};

// exports.module = data;
