const { Message } = require('discord.js');
const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client'); 

module.exports = {
    name:"antibot", 
    description: "Autoriser ou non les bots sur le serveur", 
    usage: "<prefix>antibot <on/off>",
    /**
     * 
     * @param {Bot} client 
     * @param {Message} message 
     * @param {String[]} args 
     */ 
    run: async(client, message, args) => {
        if(!client.config.owners.includes(message.author.id)) return message.channel.send("Vous n'avez pas les permissions requises pour utiliser cette commande"); 

        if(!args.length) return message.channel.send("Veuillez me préciser `on/off`"); 

        if(args[0] === "on"){
            if(client.db["antiraid"].get(`antibot_${message.guild.id}`) === "on") return message.channel.send("L'antibot est déjà activé sur ce serveur"); 

            client.db["antiraid"].set(`antibot_${message.guild.id}`, "on").save();
            message.channel.send("L'antibot est désormais **activé**"); 
        } 
        else if(args[0] === "off"){
            if(client.db["antiraid"].get(`antibot_${message.guild.id}`) === null) return message.channel.send("L'antibot est déjà désactivé"); 

            client.db["antiraid"].delete(`antibot_${message.guild.id}`); 
            message.channel.send("L'antibot est désormais **désactivé**"); 
        } else return;
    }
}