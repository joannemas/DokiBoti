module.exports = {
    name: 'roleGive',
    description: "Give a role",

    execute(message){

        // Split the content of message to get each arg
        const args = message.content.split(/ +/g);
        const command = args.shift().toLowerCase();
    
        if (command === "%give"){
            
            let mention =  message.mentions.members.first();
    
            // If there is the two arguments or not
            if(!args[0] || !args[1] ){
                message.reply(` Vous souhaitez ajouter un rôle à une personne ? \n Usage : %give + rôle + @nom`)
            }else {
                // If the role exists or not
                let theRole = message.guild.roles.cache.find(role => role.name === args[0]);
                if (theRole){
                    mention.roles.add(theRole).catch(console.error);
                }
                else{
                    message.reply(`Le rôle n'existe pas`)
                }
            }
        }
    }
}