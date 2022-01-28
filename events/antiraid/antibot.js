const { GuildMember } = require('discord.js');
const Discord = require('discord.js'); 
const {Bot} = require('../../structures/client'); 

module.exports = {
    name: "guildMemberAdd", 
    /**
     * 
     * @param {Bot} client 
     * @param {GuildMember} member 
     */
    run: async(client, member) => {
        if(client.db["antiraid"].get(`antibot_${member.guild.id}`) === null) return; 

        if(client.db["antiraid"].get(`antibot_${member.guild.id}`) === "on"){
            const action = member.guild.fetchAuditLogs({
                limit: 1,
                type: "BOT_ADD"
            }).then((audit) => audit.entries.first()); 

            let author = (await action).executor; 

            if(author.id === client.user.id) return;
            if(client.config.owners.includes(author.id)) return;
            if(author.id === member.guild.ownerId) return;

            if(member.user.bot) member.kick("Anti bot"); 
            member.guild.members.cache.get(author.id).ban({reason: "Anti bot"}); 
        }
    }
}