const Discord = require('discord.js')
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })
client.on('ready', function () {
    console.log("Bot lancé !")
})

// Message de bienvenue
client.on('guildMemberAdd', member => {
    member.guild.channels.fetch('945374718507253820')
        .then(channel => {
            channel.send("Bienvenue sur le serveur, "+member.user.toString()); 
        })
});

//Création d'un channel
client.on("messageCreate", message => {
    if (message.content === "%channel") {
        message.guild.channels.create("channel textuel", { 
            type: "GUILD_TEXT",
            permissionOverwrites: [{
                id: message.guild.id,
                allow: ['VIEW_CHANNEL'],
            }]
        });
        message.channel.send("Channel textuel créé !");
}})

//Création d'un channel vocal
client.on("messageCreate", message => {
    if (message.content === "%vocal") {
        message.guild.channels.create("channel vocal", { 
            type: "GUILD_VOICE",
            permissionOverwrites: [{
                id: message.guild.id,
                allow: ['VIEW_CHANNEL'],
            }]
        });
        message.channel.send("Channel vocal créé !");
}})

client.login('%');