
module.exports = {
    name: 'quotes',
    description: "Send a quote when there is a key word or types a command",

    execute(message){

        const fetch = require("node-fetch");

        function getQuote() {
            return fetch("https://zenquotes.io/api/random")
                .then(res => {
                return res.json()
                })
                .then(data => {
                return data[0]["q"] + " -" + data[0]["a"]
                })
            }

        // These words trigger the command
        inspireWord = ["idea", "inspire", "idee", "inspiration"]
        const messageContent = message.content.toLowerCase().normalize('NFD');
        const needInspire = inspireWord.some( (element) => messageContent.indexOf(element) !== -1);
        
        if (message.content === "%inspire" || needInspire) {
            getQuote().then(quote => message.channel.send(quote))
        }
    }
}