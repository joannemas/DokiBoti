module.exports = {
    name: 'timer',
    description: "Starts a timer and tag everyone when finished",

    execute(message, ms){

        // Split the content of message to get each arg
        const args = message.content.split(/ +/g);
        const command = args.shift().toLowerCase();
    
        if(command === "%timer"){
            let timer = args[0];
            

            if(!args[0] || !parseFloat(args[0])){
                return message.channel.send("Usage : %timer + durée+s|m|h")
            }
    
            message.channel.send("Timer lancé pour : "+ ms(ms(timer), {long: true}))
            
            setTimeout(function(){
                message.channel.send(message.guild.roles.everyone.toString() + `Timer fini, il a duré : ${ms(ms(timer), {long: true})}`)
            }, ms(timer));
        }
    }
}