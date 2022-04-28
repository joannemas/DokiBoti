module.exports = {
    name: 'start',
    description: 'Init the server',
    
    execute(message, client) {
        if (message.content === "%start"){
            
            message.guild.channels.create("Cours", { type: "GUILD_CATEGORY" });
            message.guild.channels.create("rendu");
            message.guild.channels.create("bienvenue");
            message.guild.channels.create("règles");
             }
    }
};
