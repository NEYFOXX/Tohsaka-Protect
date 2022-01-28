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
        if(client.db["antiraid"].get(`everyone_${message.guild.id}`) === null) return;

        if(client.db["antiraid"].get(`everyone_${message.guild.id}`) === "on"){
            if(message.mentions.everyone){
                if(message.author.id === client.user.id) return;
                if(message.author.id === message.guild.ownerId) return;
                if(client.config.owners.includes(message.author.id)) return;

                message.delete(); 
                try {
                message.author.send(`Vous avez été **ban** de \`${message.guild.name}\` pour avoir mentionné everyone alors que vous n'en aviez pas l'autorisation`); 
                message.guild.members.cache.get(message.author.id).ban({reason: "Anti everyone"}); 
                } catch (err) {
                    console.log(err)
                }
            }
        }
    }

}