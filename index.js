const path = require('path')
const Discord = require('discord.js')
const config = require('./config.json')
const { MessageEmbed } = require('discord.js');
const ms = require('ms')
const fs = require('fs');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] })
const prefix = '%'

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('message', message => {
    const args = message.content.split(/ +/g);
        client.commands.get('insult').execute(message, args, Discord, client);
        client.commands.get('roleGive').execute(message, args, Discord, client);
        client.commands.get('roleRemove').execute(message, args, Discord, client);
        client.commands.get('quotes').execute(message, args, Discord, client);
        client.commands.get('timer').execute(message, ms, args, Discord, client);
        client.commands.get('answer').execute(message, client, Discord, args);
        client.commands.get('start').execute(message, client, Discord, args);
});

client.on('ready', function () {
    console.log("Bot lancé !")
})

// When someone sends "%rendu" it tags the person in another server and counts how many people sent it
// When %stoprendu is sent, counter restarts from 0
let numberSend=0;
client.on('message', message => {
    if (message.content === "%rendu") {
        const user = message.author;
        numberSend=numberSend+1;
        if (numberSend === 1){
            accord = " rendu."
        }else{
            accord = " rendus."
        }
        client.channels.cache.find(channel => channel.name === "rendu").send(`<@${user.id}> a envoyer son rendu. \n`+numberSend.toString()+ accord);
    }
});

client.on('message', message => {
    if (message.content === "%stoprendu") {
        numberSend=0;
        client.channels.cache.find(channel => channel.name === "rendu").send('Le délai de rendu est terminé.');
    }
});



// Welcome message
client.on('guildMemberAdd', member => {
    member.guild.channels.cache.find(channel => channel.name === "bienvenue")
        .then(channel => {
            channel.send("Bienvenue sur le serveur, "+member.user.toString()); 
        })
});

// If we ping the bot, it answers us
client.on("messageCreate", (message) => {
    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;

    if (message.mentions.has(client.user.id)) {
        message.channel.send("Oui, besoin d'aide ?");
    }
});


// Creating a text channel
let texteCommand = false;
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
            message.channel.send("Channel créé avec succès !")
        })
        collector.on('end', collected => {
            texteCommand = false;
            if (channelCreated === true) return;
            message.channel.send("La commande de création de channel a été annulée, channel supprimé !")
        })
    }
})

// Creating a voice channel
let vocalCommand = false;
client.on("messageCreate", message => {
    if (message.content === "vocal" && !vocalCommand) {
        vocalCommand = true;
        let nameOfChannel = "";
        let limitUser= 0;
        let waitingForLimitUser = false;
        let channelCreated = false;
        const filter = (m) => m.author.id === message.author.id;
        message.channel.send("Comment souhaitez-vous appelez le salon ?")
        const collector = new Discord.MessageCollector(message.channel, {
            filter,
            time: 20000
        });
        collector.on('collect', M => {
            if (!waitingForLimitUser) {
                nameOfChannel = M.content;
                waitingForLimitUser = true;
                message.channel.send("Combien d'utilisateurs dans le vocal ? (0 pour infini)");
                return;
            }
            if (isNaN(M.content)) {
                message.channel.send("Veuillez tapez un nombre !");
                return
            }
            limitUser = parseInt(M.content);
            if (limitUser !== 0 && (limitUser <=1 || limitUser > 99)) {
                message.channel.send("Veuillez réessayer, nombre incorrect ! Choisissez un nombre entre 2 & 99 !");
                return
            }
            const options = {type: "GUILD_VOICE"}
            if (limitUser !== 0) options.userLimit=limitUser;
            message.guild.channels.create(nameOfChannel, options);
            waitingForLimitUser = false;
            message.channel.send(`Le channel ${nameOfChannel} à été créé avec succès !`);
            channelCreated = true;
            collector.stop()
        })
        collector.on('end', collected => {
            vocalCommand = false;
            if (channelCreated) return;
            message.channel.send("La commande de création de salon a été annulée, channel supprimé !")
        })
    }
})




client.login(config.token);
