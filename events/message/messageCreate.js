const { Bot } = require('../../structures/client')
const Discord = require('discord.js')
module.exports = {
    name: 'messageCreate',

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     */
    run: async (client, message) => {
        try {
            if (!message) return 
            if (!message.guild || !message.author) return
            if(message.author.bot) return
            let prefix = client.db['settings'].get(`prefix_${message.guild.id}`, true, client.config.prefix) || client.config.prefix
            if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) return message.reply(`Mon prefix est \`${prefix}\``).catch(e => { })
            if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `<@${client.user.id}>`
            if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) prefix = `<@!${client.user.id}>`
            if (!message.content.startsWith(prefix) || message.content === prefix || message.content.startsWith(prefix + ' ')) return
            const args = message.content.slice(prefix.length).trim().split(/ +/g)
            const commandName = args[0].toLowerCase().normalize()
            const cmd = client.commands.get(commandName) || client.aliases.get(commandName)
            args.shift()
            if (!cmd) return
            cmd.run(client, message, args, commandName)
        } catch (err) {
            console.log("messageCreate error : " + err)
        }
    }
}