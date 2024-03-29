const path = require('path')
const Discord = require('discord.js')
const config = require('./config.json')
const { MessageEmbed } = require('discord.js');
const ms = require('ms')
const fs = require('fs');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] ,  partials: ["MESSAGE", "CHANNEL", "REACTION" ]})
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


// Creating a text channel
let texteCommand = false;
client.on("messageCreate", message => {
    if (message.content === "%channel" && !texteCommand) {
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
    if (message.content === "%vocal" && !vocalCommand) {
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

// Embed of server rules
client.on("messageCreate", message => {
    let LogoBot = "https://live.staticflickr.com/4129/4837849029_5bf163a3dc_b.jpg";
    if (message.content === "%regles") {
        const exampleEmbed = new MessageEmbed()
            .setTitle("Règlement du serveur")
            .setDescription("Respectez les règles OU sinon ban ! \n ──────────────────────────────────────")
            .setThumbnail(`${LogoBot}`)
            .setColor("#FFFFFF")
            .addFields(
                { name: '1⃣ Restez poli et courtois', value: '➥ Merci d\'avoir un comportement correct avec vos camarades. \n ──────────────────────────────────────' },
                { name: '2⃣ Pas de violence verbale', value: '➥ Vous pouvez taquiner gentiment sans aller dans l’extrême. Si cela reste dans la bonne humeur et le second degré. \n ──────────────────────────────────────' },
                { name: '3⃣ Changer vos pseudos Discord', value: '➥ Merci de changer votre pseudo sur le serveur par votre nom et prénom. \n ──────────────────────────────────────' },
                { name: '4⃣ Attention au spam', value: '➥ Essayez de limiter vos mentions d\'utilisateurs. Merci de ne pas utiliser le tag "@everyone" qui dérangera tout le serveur. \n ──────────────────────────────────────' },
                { name: '5⃣ Soyez respectueux', value: '➥ Tous propos discriminatoires, homophobes, racistes, antisémites, injurieux, pornographiques seront sanctionnés ! \n ──────────────────────────────────────' },
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

// Embed of commands
client.on("messageCreate", message => {
    let LogoBot = "https://live.staticflickr.com/4129/4837849029_5bf163a3dc_b.jpg";
    if (message.content === "%commandes") {
        const exampleEmbed = new MessageEmbed()
            .setTitle("Liste des commandes du bot")
            .setDescription("Voici les commandes pour utiliser les fonctionnalités du bot. \n ────────────")
            .setThumbnail(`${LogoBot}`)
            .setColor("#FFFFFF")
            .addFields(
                { name: '%start', value: '➥ À lancer une fois lors de l\'installation du bot, créé les channels. \n  ────────────' },
                { name: '%timer + durée+ s|m|h', value: '➥ Lance un chronomètre et tag tout le monde à sa fin. \n  ────────────' },
                { name: '%give + rôle + @nom', value: '➥ Ajouter un rôle à une personne. \n  ────────────' },
                { name: '%remove+ rôle + @nom', value: '➥ Retir le rôle d\'une personne. \n  ────────────' },
                { name: '%channel', value: '➥ Créer un channel textuel. \n  ────────────' },
                { name: '%vocal', value: '➥ Créer un channel vocal. \n  ────────────' },
                { name: '%inspiration', value: '➥ Envoie des citations. \n  ────────────' },
                { name: '%rendu', value: '➥ Dans le channel rendu, envoie qui et combien ont envoyé "%rendu". \n  ────────────' },
                { name: '%stoprendu', value: '➥ Remet à 0 le compteur des rendu. \n  ────────────' },
                { name: '%regles', value: '➥ Affiche la liste des règles du serveur. \n  ────────────' },
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

// MP when someone join the server
client.on('guildMemberAdd', (guildMember) => {
    guildMember.send("Bienvenue sur le serveur ! Je suis DokiBoti, le bot qui t'accompagnera pendant ton travail. N'hésites pas à envoyer un %commandes sur le serveur où je me trouve pour découvrir toutes mes commandes. 🤖")
    .catch(console.error)
})

// Reactions for some messages
client.on('message', message => {
    if (message.content === 'Bonjour') {
        message.react('👋');
    }
    else if (message.content === 'Bonsoir') {
        message.react('🌙');
    }
    else if (message.content === 'merci') {
        message.react('😊');
    }
}); 

client.login(config.token);
