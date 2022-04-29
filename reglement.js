const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })
// -------------------------------- //
client.on('ready', function () {
    console.log("Vous êtes connecté au Bot.")
})
// -------------------------------- //

//Affichage des règles
client.on("messageCreate", message => {
    if (message.content === "!Regles") {
        message.channel.send(
            "Ceci est le réglement du serveur"
            )
    }
})

// -------------------------------- //
client.login('TOKEN')
