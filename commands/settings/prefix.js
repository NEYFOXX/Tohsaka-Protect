const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'prefix',
    aliases: ['setprefix'],

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        try{
            if(!message.member.permissions.has('MANAGE_GUILD') && !client.config.owners.includes(message.author.id)) return message.reply(`Vous n'avez pas assez de permissions pour pouvoir utiliser cette commande`).catch(e=>{})
            let newprefix = args[0]
            if(!newprefix) return message.channel.send("You didn't gave me any prefix.").catch(e=>{})
            let currentprefix = client.db['settings'].get(`prefix_${message.guild.id}`, true, client.config.prefix) || client.config.prefix
            if(newprefix===currentprefix) return message.channel.send(`Ce prefix est le prefix actuel, veuillez m'en donner un nouveau`).catch(e=>{})
            client.db['settings'].set(`prefix_${message.guild.id}`, newprefix).save()
            message.channel.send(`Mon nouveau prefix est \`${newprefix}\``).catch(e=>{})
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}