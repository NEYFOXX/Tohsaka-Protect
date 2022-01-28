const Discord = require('discord.js');
const {Bot} = require('../../structures/client');

module.exports = {
    name: "antitoken", 
    description: "Autoriser ou non l'arrivés de tokens sur le serveur", 
    usage: "<prefix>antitoken <on/off>", 
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("Vous n'avez pas assez d'autorisations pour utiliser cette commande");

        if(!args.length) return message.channel.send("Veuillez préciser `on/off`");

        if(args[0] === "on"){
            if(client.db["antiraid"].get(`antitoken_${message.guild.id}`) === "on") return message.channel.send("L'antitoken est déjà activé");

            client.db["antiraid"].set(`antitoken_${message.guild.id}`, "on").save();
            message.channel.send("L'antitoken est désormais **activé**");
        }
        if(args[0] === "off"){
            if(client.db["antiraid"].get(`antitoken_${message.guild.id}`) === null) return message.channel.send("L'antitoken est déjà désactivé");

            client.db["antiraid"].delete(`antitoken_${message.guild.id}`);
            message.channel.send("L'antitoken est désormais **désactivé**");
        }
    }
}