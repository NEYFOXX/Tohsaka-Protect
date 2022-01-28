const Discord = require('discord.js');
const {Bot} = require('../../structures/client');

module.exports = {
    name: "ping", 
    description: "Voir la latence du client", 
    usage: "<prefix>ping", 
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */ 
    run: async(client, message, args) => {
        let msg = message.channel.send("calcul..."); 
        let embed = new Discord.MessageEmbed()
        .setDescription(`Bot : ${client.ws.ping} ms\nAPI : ${(await msg).createdAt - message.createdAt} ms`)
        .setColor("DARK_BUT_NOT_BLACK"); 

        (await msg).edit({content: " ", embeds: [embed]}); 
    }
}