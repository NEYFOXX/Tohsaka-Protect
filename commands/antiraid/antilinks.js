const { Message } = require('discord.js');
const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client'); 

module.exports = {
    name: "antilink",
    aliases: ["antilinks"], 
    description: "Autoriser ou non que les gens puissent poster des liens sur le serveur",
    usage: "<prefix>antilink <on/off>", 
    /**
     * 
     * @param {Bot} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message,args) => {
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("Vous n'avez pas les permissions suffisantes");

        if(!args.length) return message.channel.send("Veuillez me préciser `on/off`");

        if(args[0] === "on"){
            if(client.db["antiraid"].get(`antilink_${message.guild.id}`) === "on") return message.channel.send("L'antilink est déjà activé sur le serveur"); 

            client.db["antiraid"].set(`antilink_${message.guild.id}`, "on").save();
            message.channel.send("L'antilink est désormais **activé**"); 
        }
        else if(args[0] === "off"){
            if(client.db["antiraid"].get(`antilink_${message.guild.id}`) === null) return message.channel.send("L'antilink sur le serveur est déjà désactivé"); 

            client.db["antiraid"].delete(`antilink_${message.guild.id}`); 
            message.channel.send("L'antilink est désormais **désactivé**"); 
        } else return;

    }
}