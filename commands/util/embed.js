const { Message, MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton} = require('discord.js');
const {Bot} = require('../../structures/client');

module.exports = {
    name: "embed",
    aliases: ["embedbuilder"], 
    description: "Créer un embed personnalisé", 
    usage: "<prefix>embed", 
    /**
     * 
     * @param {Bot} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args)=> {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas assez d'autorisation pour pouvoir créer un embed personnalisé"); 
        
        



        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('sl')
            .setPlaceholder(`Cliquez ici pour modifier l'embed`)
            .addOptions([
                {
                    label: "Titre",
                    description: "Clique ici pour modifier le titre de l'embed",
                    value: "title",
                    emoji: "✏️"
                }, 
                {
                    label: "Description", 
                    description:"Clique ici pour modifier la description de l'embed", 
                    value: "desc", 
                    emoji: "💬"
                }, 
                {
                    label: "Thumbnail", 
                    description: "Clique ici pour modifier le thumbnail de l'embed",
                    value: "thumb", 
                    emoji: "🏷️"
                }, 
                {
                    label: "Image", 
                    description: "Clique ici pour ajouter une image à l'embed",
                    value: "image",
                    emoji: "🖼️"
                },
                {
                    label: "Couleur",
                    description: "Clique ici pour changer la couleur de l'embed",
                    value: "color",
                    emoji: "🔴"
                },
                {
                    label: "Footer",
                    description: "Clique ici pour ajouter un footer à l'embed",
                    value: "footer",
                    emoji: "🔻"
                },
                {
                    label: "Auteur", 
                    description: "Clique ici pour changer l'auteur de l'embed", 
                    value:"author",
                    emoji: "🔸"
                },
                {
                    label: "URL", 
                    description:"Clique ici pour ajouter un url au titre de l'embed", 
                    value: "url", 
                    emoji:"➡️"
                }
            ])
        )
        const roww = new MessageActionRow()
.addComponents(
            new MessageButton()
            .setCustomId('valid')
            .setLabel(`Valider`)
            .setStyle('SUCCESS')
    ).addComponents(
            new MessageButton()
            .setCustomId('del')
            .setLabel(`Supprimer`)
            .setStyle('DANGER')
        )

        const embed = new MessageEmbed()
        .setDescription(`ㅤ`)

        let msg = await message.channel.send({embeds : [embed], components: [row, roww]})

        const collector = await message.channel.createMessageComponentCollector({
            componentType: "SELECT_MENU"
        })
        const col = await message.channel.createMessageComponentCollector({
            componentType: "BUTTON"
        })
        
const f = m => message.author.id === m.author.id
        collector.on("collect", async (c) => {            
            if(c.user.id !== message.author.id) return;

            const value = c.values[0]
            
            if(value === "title") {
                await c.reply("Quel sera le titre de votre embed ?")
                message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ["time"]}).then(async collected => {
                    collected.first().delete()
                    c.deleteReply()
                    embed.setTitle(`${collected.first().content}`)
                    await msg.edit({embeds : [embed]})
                })
            }
            
            if(value === "author") {
                await c.reply("Quel sera l'auteur ?")
                message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ["time"]}).then(async collected => {
                    collected.first().delete()
                    c.deleteReply()
                    embed.setAuthor({name: `${collected.first().content}`})
                    await msg.edit({embeds : [embed]})
                })
            }

            if(value === "desc") {
                await c.reply("Quel sera la description de votre embed ?")
                message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ["time"]}).then(async collected => {
                    collected.first().delete()
                    c.deleteReply()
                    embed.setDescription(`${collected.first().content}`)
                    await msg.edit({embeds : [embed]})
                })
            }

            if(value === "thumb") {
                await c.reply("Quel sera le thumbnail de votre embed ?")
                message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ["time"]}).then(async collected => {
                    collected.first().delete()
                    c.deleteReply()
                    let lien = collected.first().content.startsWith("https://")
                    if(!lien){
                        return message.channel.send("Lien invalide");
                    };
                    embed.setThumbnail(collected.first().content)
                    await msg.edit({embeds: [embed]});
                })
            }
            
            if(value === "image") {
                await c.reply("Quel sera l'image de votre embed ?")
                message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ["time"]}).then(async collected => {
                    collected.first().delete()
                    c.deleteReply()
                    let lien = collected.first().attachments.first()?.url || collected.first().content.startsWith("https://")
                    if(!lien) {
                        return message.channel.send("Lien invalide");
                    }
                    embed.setImage(collected.first().content)
                     await msg.edit({embeds: [embed]});
                })
            }

            if(value === "color") {
                await c.reply("Quel sera la couleur de votre embed ?")
                message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ["time"]}).then(async collected => {
                    collected.first().delete()
                    c.deleteReply()
                    embed.setColor(`${collected.first().content}`)
                    await msg.edit({embeds: [embed]});
                })
            }
            
            if(value === "footer"){
                c.reply("Quel sera le texte de votre footer ?")
                message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ["time"]}).then(async collected => {
                    c.deleteReply();
                    collected.first().delete();
                    message.channel.send("Maintenant donnez moi l'image du footer, si vous ne voulez pas répondez `non`");
                    message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ["time"]}).then(async coll => {
                        message.delete();
                        coll.first().delete();
                        if(coll.first().content == "non"){
                            embed.setFooter({text: `${collected.first().content}`}); 
                            await msg.edit({embeds: [embed]});
                        }
                        const lien = coll.first().attachments.first()?.url
                        if(!lien){
                            return message.channel.send("Lien incorrect");
                        }
                        embed.setFooter({text: `${collected.first().content}`, iconURL: `${lien}`})
                        await msg.edit({embeds: [embed]});
                    })
                })
            }

            if(value === "url"){
                c.reply("Quel sera l'url sur le titre de votre embed ?");
                message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max: 1, time: 60000, errors: ["time"]}).then(async collected => {
                    c.deleteReply();
                    collected.first().delete();
                    let lien = collected.first().attachments.first()?.url || collected.first().content.startsWith("https://")
                    if(!lien){
                        return message.channel.send("Lien invalide");
                    }
                    embed.setURL(`${collected.first().content}`)
                    await msg.edit({embeds: [embed]});
                })
            }

        })

        col.on('collect', async i => {
            const val = i.customId

            if(val === "valid") {
                if(i.user.id !== message.author.id) return i.reply({content: `Seul ${message.author} peut envoyer cet embed.`, ephemeral: true})
                await i.reply(`Veuillez mentionner le salon où l'embed sera envoyé.`)
                message.channel.awaitMessages({filter: m => m.author.id === message.author.id, max:1, time: 600000, errors: ["time"]}).then(async collec => {
                    const ch = collec.first().mentions.channels.first()
                    if(!ch) return message.reply(`Salon invalide.`).then(a => {
                        setTimeout(() => {
                            a.delete()
                        }, 3000)
                    })
                    ch.send({embeds : [embed]})
                    i.deleteReply()
                    msg.delete()
                })
            }
            if(val === "del") {
                if(i.user.id !== message.author.id) return i.reply({content: `Seul ${message.author} peut envoyer cet embed.`, ephemeral: true})
                i.deferReply()
                msg.delete()
            }
        })

    }
}