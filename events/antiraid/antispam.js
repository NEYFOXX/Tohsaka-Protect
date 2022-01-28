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
        if(client.db["antiraid"].get(`antispam_${message.guild.id}`) === null) return;

        if(client.db["antiraid"].get(`antipam_${message.guild.id}`) === "on"){
            if(message.author.id === client.user.id) return;
            if(message.author.id === message.guild.ownerId) return;
            if(client.config.owners.includes(message.author.id)) return;

            client.db["strikes"].add(`spam_${message.author.id}`, 1);
            if(client.db["strikes"].get(`spam_${message.author.id}`) >= 5){
                message.channel.send(`<@${message.author.id}>, veuillez arrêter de spam`); 
            }

            if(client.db["strikes"].get(`spam_${message.author.id}`) >= 10){
                message.author.send(`Vous avez été **ban** de \`${message.guild.name}\` pour spam`); 
                message.guild.members.cache.get(message.author.id).ban({reason: "Anti spam"});
            }

            setTimeout(() => {
                client.db["strikes"].delete(`spam_${message.author.id}`); 
            }, 20000)
        } else return;
    }
}