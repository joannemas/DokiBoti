const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })
// -------------------------------- //
client.on('ready', function () {
    console.log("Vous êtes connecté au Bot.")
})
// -------------------------------- //

//Création d'un channel vocal
client.on("messageCreate", message => {
    if (message.content === "vocal") {
        message.channel.send("Comment souhaitez-vous appelez le salon ?")
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 1000 });
            collector.on('collect', message => {
                if (message.content === message.content ) {
                    message.guild.channels.create(message.content, { 
                        type: "GUILD_VOICE",
                        permissionOverwrites: [{
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL'],
                        }]
                    });
                } else if (message.content === "") {
                    message.channel.send("Veuillez réessayer s'il vous plaît.");
                }
            })
        message.channel.send("Channel vocal créé !");
}})

//Création d'un channel vocal avec sélection du nombre de User
client.on("messageCreate", message => {
    if (message.content === "!VocalLimité") {
        message.channel.send("Combien de personnes peuvent accéder au vocal ? ");
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100 });
            collector.on('collect', message => {
                if (message.content >= 2 && message.content <= 99 ) {
                    message.guild.channels.create("channel vocal", { 
                        type: "GUILD_VOICE",
                        userLimit: message.content,
                        permissionOverwrites: [{
                        id: message.guild.id,
                        allow: ['VIEW_CHANNEL'],
                        }]
                    });
                } else if (message.content < 2 || message.content > 99) {
                    message.channel.send("Veuillez réessayer s'il vous plaît.");
                }
            })
}})

// -------------------------------- //
client.login('OTYwODQ1NTIyMTc0ODg1OTE4.YkwXIA.pKVuJldScngEyQxH0RFClZvfLnY')