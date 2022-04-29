const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })
// -------------------------------- //
client.on('ready', function () {
    console.log("Vous êtes connecté au Bot.")
})
// -------------------------------- //



// -------------------------------- //
client.login('TOKEN')
