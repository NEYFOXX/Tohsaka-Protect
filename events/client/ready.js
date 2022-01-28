const { Bot } = require('../../structures/client')
const colors = require('colors'); 

module.exports = {
    name: 'ready',

    /**
     * 
     * @param {Bot} client 
     */
    run: async (client) => {
        console.clear()
        print(`Connecté : ` + client.user.tag.green)
        print(`Latence : ` + `${client.ws.ping} ms`.blue)
        print(`Serveurs : ` + `${client.guilds.cache.size} serveurs`.yellow)
        print(`Membres : ` + `${client.users.cache.size} membres`.cyan)
        print(`Channels : ` + `${client.channels.cache.size}`.red)
        await client.user.fetch().catch(e => { })
        client.guilds.cache.forEach(async guild => {
            await guild.members.fetch().catch(e => { })
        })
    }
}