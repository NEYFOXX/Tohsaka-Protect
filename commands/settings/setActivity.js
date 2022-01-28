const { Message } = require('discord.js');
const Discord = require('discord.js');
const {Bot} = require('../../structures/client');

module.exports = {
    name: "setActivity",
    aliases: ["setactivity"], 
    description: "Changer l'activité du bot", 
    usage: "<prefix>setActivity <streaming/watching/playing/listening/competing>", 
    /**
     * 
     * @param {Bot} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!client.config.owners.includes(message.author.id)) return message.channel.send("Vous ne pouvez pas changer l'activité du bot");

        if(!args.length) return message.channel.send("Veuillez me donner une nouvelle activité pour le bot\nFormat : `setActivity <streaming/watching/listening/playing/competing> <description>`");
        
        if(args[0] === "streaming"){
            if(!args[1]) return message.channel.send("Veuillez me donner une description à ce que le bot va stream"); 

            if(client.db["activity"].get(`streaming`) === true) return message.channel.send("Le bot streame déjà"); 
            let desc = args.slice(1).join(" "); 
            if(client.db["activity"].get('streaming') === desc) return message.channel.send("Le bot streame déjà avec cette description");
            
            client.user.setActivity({name: `${desc}`, type: "STREAMING", url: "https://twitch.tv/NEYFOXX"})
            client.db["activity"].set(`streaming`, desc).save();
            message.channel.send(`Je stream désormais **${desc}**`); 
        }
        else if(args[0] === "watching"){
            if(!args[1]) return message.channel.send("Veuillez me donner un description à ce que le bot va regarder"); 

            if(client.db["activity"].get(`watching`) === true) return message.channel.send("Le bot watch déjà");
            let desc = args.slice(1).join(" "); 
            if(client.db["activity"].get(`watching`) === desc) return message.channel.send("Le bot watch déjà avec cette description"); 

            client.user.setActivity({name: `${desc}`, type: "WATCHING"}); 
            client.db["activity"].set(`watching`, desc).save();
            message.channel.send(`Je watch désormais **${desc}**`);
        }
        else if(args[0] === "listening"){
            if(!args[1]) return message.channel.send("Veuillez me donner une description à ce que le bot va écouter");

            if(client.db["activity"].get(`listening`) === true) return message.channel.send("Le bot écoute déjà"); 
            let desc = args.slice(1).join(" "); 
            if(client.db["activity"].get(`listening`) === desc) return message.channel.send("Le bot écoute déjà avec cette description");

            client.user.setActivity({name: `${desc}`, type: "LISTENING"}); 
            client.db["activity"].set(`listening`, desc).save();
            message.channel.send(`J'écoute désormais **${desc}**`); 
        }
        else if(args[0] === "playing"){
            if(!args[1]) return message.channel.send("Veuillez me donner une description à ce que le bot va jouer");

            if(client.db["activity"].get(`playing`) === true) return message.channel.send("Le bot joue déjà"); 
            let desc = args.slice(1).join(" "); 
            if(client.db["activity"].get(`playing`) === desc) return message.channel.send("Le bot joue déjà avec cette description");

            client.user.setActivity({name: `${desc}`, type: "PLAYING"}); 
            client.db["activity"].set(`playing`, desc).save();
            message.channel.send(`Je joue désormais à **${desc}**`); 
        }
        else if(args[0] === "competing"){
            if(!args[1]) return message.channel.send("Veuillez me donner une description à ce que le bot va participer");

            if(client.db["activity"].get(`competing`) === true) return message.channel.send("Le bot participe déjà"); 
            let desc = args.slice(1).join(" "); 
            if(client.db["activity"].get(`competing`) === desc) return message.channel.send("Le bot participe déjà à cette description");

            client.user.setActivity({name: `${desc}`, type: "COMPETING"}); 
            client.db["activity"].set(`competing`, desc).save();
            message.channel.send(`je participe désormais à **${desc}**`); 
        }
    }
}