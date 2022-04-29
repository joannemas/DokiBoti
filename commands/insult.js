
module.exports = {
    name: 'insult',
    description: "Delete a message if there is a bad word in it. Bot must have authorizaation to modify other's messages",

    execute(message){

        // These words trigger the command
        const abuse = ['pede', 'connard', 'pute', 'tchoin', 'nique', 'fdp', 'idiot', 'pd', 'merde', 'putain', 'tg', 'ta gueule', 'nsm', 'connasse', 'nik', 't nul'];
    
        // Get content of the message to check it
        const messageContent = message.content.toLowerCase().normalize('NFD');
        const isAbusive = abuse.some( (element) => messageContent.indexOf(element) !== -1);
    
        insultResponds = [
            "Message supprimé, restons poli et courtois.",
            "Message supprimé, on se calme avec les mots",
            "Message supprimé, pas d'insultes, pas de gros mots."
            ]
        const insultRespond = insultResponds[Math.floor(Math.random() * insultResponds.length)]
    
        if (isAbusive) {
            message.delete()
            message.channel.send(insultRespond) 
        }
    }
}