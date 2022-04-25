const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })
// -------------------------------- //
client.on('ready', function () {
    console.log("Salut !")
})
// -------------------------------- //
client.login('OTYwODQ1NTIyMTc0ODg1OTE4.YkwXIA.pKVuJldScngEyQxH0RFClZvfLnY')