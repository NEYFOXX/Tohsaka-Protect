const { Message } = require('discord.js');
const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client');

module.exports = {
    name: "messageCreate", 

    /**
     * 
     * @param {Bot} client 
     * @param {Message} message 
     */
    run: async(client, message) => {
        if(client.db["antiraid"].get(`antilink_${message.guild.id}`) === null) return;

        if(client.db["antiraid"].get(`antilink_${message.guild.id}`) === "on"){
            let links = ["https:/", "www.", "http:/", "discord.", ".gg", "discord.com", ".com", ".net", ".fr", ".org"]; 
            links.forEach((link) => {
                if(message.content.includes(link)){
                    if(message.author.id === client.user.id) return;
                    if(message.author.id === message.guild.ownerId) return;
                    if(client.config.owners.includes(message.author.id)) return;

                    message.delete(); 
                    message.channel.send(message.author.tag + "Vous n'avez pas le droit de poster des liens sur le serveur");

                    client.db["strikes"].add(`linkstrike_${message.author.id}`, 1);
                    if(client.db["strikes"].get(`linkstrike_${message.author.id}`) >= 3){
                        message.author.send(`Vous avez été **ban** de \`${message.guild.name}\` pour avoir envoyé trop de liens`); 
                        message.guild.members.cache.get(message.author.id).ban({reason: "Anti links"}); 
                    }
                }
            })
        }
    }
}