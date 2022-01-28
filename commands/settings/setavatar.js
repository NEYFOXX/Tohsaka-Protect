const { Message } = require('discord.js');
const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client'); 

module.exports = {
    name: "setavatar", 
    description: "Changer la photo de profil du bot", 
    usage: "<prefix>setavatar <lien/image>", 
    /**
     * 
     * @param {Bot} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!client.config.owners.includes(message.author.id)) return message.channel.send("Vous n'avez pas les permsisions suffisantes pour pouvoir changer l'avatar du bot"); 

        if(message.attachments.size > 0) { 
            message.attachments.forEach(attachment => {
                client.user.setAvatar(attachment.url)
                .then(u => message.channel.send(`${message.author}, Vous avez changé la photo de profil de votre bot.`))
                .catch(e => { 
                    return message.channel.send(`${message.author}, Une erreur est survenue : **${e}**`);
                });
            });
            } else if (args.length) {
                let str_content = args.join(" ")
                client.user.setAvatar(str_content)
                .then(u => message.channel.send(`${message.author}, Vous avez changé la pp de votre bot avec succès`))
                .catch(e => { 
                    return message.channel.send(` ${message.author}, Une erreur est survenue : **${e}**`); 
                });
            } else {
                message.channel.send(` ${message.author}, Veuillez fournir un lien ou une image pour changer mon avatar`);
            }
    }
}