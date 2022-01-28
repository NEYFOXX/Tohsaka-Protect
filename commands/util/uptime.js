const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client');

module.exports = {
    name:"uptime", 
    description: "Voir depuis quand le bot est connecté", 
    usage: "<prefix>uptime", 
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed()
        .setTitle("Uptime")
        .setDescription(`Je suis connecté depuis le <t:${parseInt(client.readyTimestamp / 1000)}:D> (<t:${parseInt(client.readyTimestamp / 1000)}:R>)`)
        .setFooter(`Made by NEYFOX`)
        .setColor("DARK_BUT_NOT_BLACK"); 

        message.channel.send({embeds: [embed]});
    }
}