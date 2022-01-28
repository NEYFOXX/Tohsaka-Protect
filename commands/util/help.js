const Discord = require('discord.js');
const {Bot} = require('../../structures/client');

module.exports = {
    name: "help", 
    description: "Voir la liste des commandes du client", 
    usage: "<prefix>help [command]", 
    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!args.length){
            let embed = new Discord.MessageEmbed()
            .setTitle("Page d'aide")
            .addField(`<:blurple_star:902655809849278514> Utilitaire`, `ping, uptime, help`)
            .addField(`👑 Owner`, `prefix, setActivity, setavatar, setname`)
            .addField(`<:moderation:899309332615823390> Antiraid`, `antibot, antieveryone, antilink, antispam, antitoken`)
            .addField(`<:role:901863092026241114> Pub`, `[rejoindre le support](https://discord.gg/zpDFt3vw5K) | [Contacter NEYFOX](https://mail.google.com/mail/u/2/#inbox?compose=GTvVlcSBnNRGnnCJDZrRRDjSmtWrwvTjJBnSpxKDHnTJntgPhndnmLPLWtMhGwbmSBBZhQcZgvCxL)`)
            .setFooter(`Help command (made by NEYFOX)`)
            .setColor("DARK_BUT_NOT_BLACK"); 

            message.channel.send({embeds: [embed]});
        }
        else {
            const command =
        client.commands.get(args[0]) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0])
        );

        if(!command) return message.channel.send("Commande introuvable");

        let embedhelp = new Discord.MessageEmbed()
        .setTitle(`Help pour ${command.name}`)
        .setDescription(`**Description :** ${command.description}\n**Usage :** ${command.usage}`)
        .setTimestamp()
        .setFooter(`Help command by NEYFOX`)
        .setColor("WHITE"); 

        message.channel.send({embeds: [embedhelp]}); 
        }
    }
}