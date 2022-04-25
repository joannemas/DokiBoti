const Discord = require('discord.js')
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
})
// -------------------------------- //
client.on('ready', function () {
    console.log("Vous êtes connecté au Bot.")
})
// -------------------------------- //

let vocalCommand = false;

//Création d'un channel vocal
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
                message.channel.send("Combien d'user dans le vocal ? (0 pour infini)");
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
            message.channel.send(`Le channel ${nameOfChannel} à été crée avec succès !`);
            channelCreated = true;
            collector.stop()
        })
        collector.on('end', collected => {
            vocalCommand = false;
            if (channelCreated) return;
            message.channel.send("La commande de création de salon a été annulé, channel supprimé !")
        })
    }
})

// -------------------------------- //
client.login('OTYwODQ1NTIyMTc0ODg1OTE4.YkwXIA.pKVuJldScngEyQxH0RFClZvfLnY')