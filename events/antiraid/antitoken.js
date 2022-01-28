const Discord = require('discord.js');
const {Bot} = require('../../structures/client');

module.exports = {
    name: "guildMemberAdd", 

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.GuildMember} member 
     */
    run: async(client, member) => {
        if(client.db["antiraid"].get(`antitoken_${member.guild.id}`) === null) return;

        if(client.db["antiraid"].get(`antitoken_${member.guild.id}`) === "on"){
            if(member.id === client.user.id) return;
            if(client.config.owners.includes(member.id)) return;

            client.db["strikes"].add(`token_${member.guild.id}`, 1);

            if(client.db["strikes"].get(`token_${member.guild.id}`) >= 10){
                member.send(`Vous avez été **kick** de \`${member.guild.name}\` car vous faites parti d'un raid token`); 
                member.guild.members.cache.get(member.id).ban({reason: "Anti token"});
            }
            setTimeout(() => {
                client.db["strikes"].delete(`token_${member.guild.id}`);
            }, 60000) // s'il y a 10 personnes qui rejoignent en moins d'une minute, plus personne pourra rentrer dans le serveur avant la fin de la minute
        }
    }
}