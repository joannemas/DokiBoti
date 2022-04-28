module.exports = {
    name: 'start',
    description: 'Init the server',
    
    execute(message, client) {
        if (message.content === "%start"){
       
            message.guild.channels.create("rendu");

            channelCreated = true;
            client.channels.cache.find(channel => channel.name === "rendu").send("Vous verrez qui a envoyer son rendu et combien de personnes au total vous l'ont envoyer");
        }
    }
};
