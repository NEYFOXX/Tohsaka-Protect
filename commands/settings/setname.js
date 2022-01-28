const { Message } = require('discord.js');
const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client'); 

module.exports = {
    name: "setname", 
    description: "Changer le nom d'utilisateur de votre bot",
    usage: "<prefix>setname <nouveau nom>", 
    /**
     * 
     * @param {Bot} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!client.config.owners.includes(message.author.id)) return message.channel.send("Vous ne pouvez pas changer le nom d'utilisateur du bot car vous n'avez pas les permissions suffisantes"); 

        let newname = args.join(" "); 
        if(!newname) return message.channel.send("Veuillez me donner un nouveau nom"); 
        if(client.user.username === newname) return message.channel.send("Ce nom d'utilisateur est déjà le mien, veuillez m'en donner un nouveau"); 

        client.user.setUsername(newname); 
        message.channel.send(`Pseudo du bot changé par **${newname}**`); 
    }
}