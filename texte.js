const Discord = require('discord.js')
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
})
// -------------------------------- //
client.on('ready', function () {
    console.log("Vous êtes connecté au Bot.")
})
// -------------------------------- //

let texteCommand = false;

//Création d'un channel
client.on("messageCreate", message => {
    if (message.content === "channel" && !texteCommand) {
        texteCommand = true;
        message.channel.send("Comment souhaitez-vous appeler le channel ?")
        channelCreated = false;
        const filter = (M) => M.author.id === message.author.id;
        const collector = new Discord.MessageCollector(message.channel, {
            filter,
            time: 20000
        });
        let nameOfChannel = "";
        collector.on('collect', M => {
            nameOfChannel = M.content;
            message.guild.channels.create(nameOfChannel, {
                type: "GUILD_TEXT",
            });
            channelCreated = true;
            collector.stop()
            message.channel.send("Channel crée avec succès !")
        })
        collector.on('end', collected => {
            texteCommand = false;
            if (channelCreated === true) return;
            message.channel.send("La commande de création de channel a été annulé, channel supprimé !")
        })
    }
})

// -------------------------------- //
client.login('OTYwODQ1NTIyMTc0ODg1OTE4.YkwXIA.pKVuJldScngEyQxH0RFClZvfLnY')