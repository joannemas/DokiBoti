const Discord = require('discord.js')
const {
    MessageEmbed
} = require('discord.js');
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]
})
// -------------------------------- //
client.on('ready', function () {
    console.log("Vous êtes connecté au Bot.")
})
// -------------------------------- //

let LogoBot = "https://64.media.tumblr.com/82774a7497f50081a73c279c96999d28/ba3085bf92b4bbd5-37/s400x600/81b669b501ac683497f1c502d5c59bd1ba101783.pnj";

client.on("messageCreate", message => {
    if (message.content === "Oui") {
        const exampleEmbed = new MessageEmbed()
            .setTitle("Règlement du serveur")
            .setDescription("Respectez les règles ci-dessous sous peine de vous faire ban. \n ──────────────────────────────────────")
            .setThumbnail(`${LogoBot}`)
            .setColor("#FFFFFF")
            .addFields(
                { name: ' Restez poli et courtois', value: '➥ Vous pouvez être familier, on ne vous demande pas d’écrire comme Molière, on n\'est pas à L\'Élysée non plus. \n ──────────────────────────────────────' },
                { name: 'Pas de violence verbale', value: '➥ Vous pouvez taquiner gentiment sans aller dans l’extrême. Si cela reste dans la bonne humeur et le second degré. \n ──────────────────────────────────────' },
                { name: 'Changer vos pseudos Discord', value: '➥ Changer vos pseudos par vos vrai noms afin d’être reconnaissable. \n ──────────────────────────────────────' },
                { name: 'Attention au spam', value: '➥ Ne tagguez pas le staff, l\'équipe pédagogique ou tout le monde uniquement si c\'est nécessaire ! N\'abusez pas du tag "everyone" pour éviter de déranger tout le Discord. \n ──────────────────────────────────────' },
                { name: 'Soyez respectueux', value: '➥ Tous propos discriminatoires, homophobes, racistes, antisémites, injurieux, pornographiques seront sanctionnés ! \n ──────────────────────────────────────' },
            )
            .setFooter({
                text: 'Équipe en charge de l\'administration du serveur',
                iconURL: `${LogoBot}`
            })
            .setTimestamp()
        message.channel.send({
            embeds: [exampleEmbed]
        });

    }
})

// -------------------------------- //
client.login('OTYwODQ1NTIyMTc0ODg1OTE4.YkwXIA.pKVuJldScngEyQxH0RFClZvfLnY')