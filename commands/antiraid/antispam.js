const { Message } = require('discord.js');
const Discord = require('discord.js'); 
const {Bot} = require("../../structures/client"); 

module.exports = {
    name:"antispam", 
    description:"Autoriser ou non le spam de messages sur le serveur", 
    usage: "<prefix>antispam <on/off>", 
    /**
     * 
     * @param {Bot} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!client.config.owners.includes(message.author.id)) return message.channel.send("Vous n'avez pas les permissions requises pour utiliser cette commande"); 

        if(!args.length) return message.channel.send("Veuillez me spécifier `on/off`"); 

        if(args[0] === "on"){
            if(client.db["antiraid"].get(`antispam_${message.guild.id}`) === "on") return message.channel.send("L'antispam est déjà activé"); 

            client.db["antiraid"].set(`antispam_${message.guild.id}`, "on").save();
            message.channel.send("L'antispam est désormais **activé**");
        }
        else if(args[0] === "off"){
            if(client.db["antiraid"].get(`antispam_${message.guild.id}`) === null) return message.channel.send("L'antispam est déjà désactivé"); 

            client.db["antiraid"].delete(`antispam_${message.guild.id}`); 
            message.channel.send("L'antispam est désormais **désactivé**"); 
        }
    }
}