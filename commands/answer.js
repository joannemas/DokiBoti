
module.exports = {
    name: 'answer',
    description: "If we ping the bot, it answers us",

    execute(message, client){
    
        if (message.author.bot) return false;

        if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;
    
        if (message.mentions.has(client.user.id)) {
            message.channel.send("Oui, besoin d'aide ?");
        }
    }
}