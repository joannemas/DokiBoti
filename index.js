const path = require('path')
const Discord = require('discord.js')
const config = require('./config.json')
const { MessageEmbed } = require('discord.js');
const ms = require('ms')
const fs = require('fs');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })
const prefix = '%'
client.on('ready', function () {
    console.log("Bot lancé !")
})

// Message de bienvenue
client.on('guildMemberAdd', member => {
    member.guild.channels.cache.find(channel => channel.name === "bienvenue")
        .then(channel => {
            channel.send("Bienvenue sur le serveur, "+member.user.toString()); 
        })
});

// Si on Ping le bot, il te répond
client.on("messageCreate", (message) => {
    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;

    if (message.mentions.has(client.user.id)) {
        message.channel.send("Oui, besoin d'aide ?");
    }
});



client.login(config.token);