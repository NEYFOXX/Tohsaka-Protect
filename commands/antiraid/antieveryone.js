const { Message } = require('discord.js');
const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client');

module.exports = {
    name: "antieveryone",
    description: "Autoriser ou non les mentions everyone ou here sur le serveur", 
    usage: "<prefix>antieveryone <on/off>", 
    /**
     * 
     * @param {Bot} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args)=> {
        if(client.config.owners.includes(message.author.id)) return message.channel.send("Vous ne pouvez pas utiliser cette commande"); 

        if(!args.length) return message.channel.send("Veuillez me préciser `on/off`"); 

        if(args[0] === "on"){
            if(client.db["antiraid"].get(`everyone_${message.guild.id}`) === "on") return message.channel.send("L'antieveryone est déjà activé"); 

            client.db["antiraid"].set(`everyone_${message.guild.id}`, "on").save();
            message.channel.send("L'antieveryone est désormais **activé**");
        }
        else if(args[0] === "off"){
            if(client.db["antiraid"].get(`everyone_${message.guild.id}`) === null) return message.channel.send("L'antieveryone est déjà désactivé");

            client.db["antiraid"].delete(`everyone_${message.guild.id}`); 
            message.channel.send("L'antieveryone est désormais **activé**");
        } else return;
    }
}