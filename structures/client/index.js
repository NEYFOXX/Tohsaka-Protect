const { Client, Collection, Intents } = require('discord.js')
const { Database, Table } = require('luma-db')
const fs = require('fs')
global.print = console.log
class Bot extends Client {
    constructor(options = {
        intents: [Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING]
    }) {
        super(options);
        this.setMaxListeners(15)
        this.db = {
            settings: new Table('settings'),
            activity: new Table('activity'), 
            antiraid: new Table('antiraid'), 
            strikes: new Table('strikes')
        }
        this.config = require('../../config')
        this.myDb = new Database({
            name: this.config.database.name,
            password: this.config.database.password,
            tables: [this.db['settings'], this.db["activity"], this.db["antiraid"], this.db["strikes"]]
        })
        this.commands = new Collection()
        this.aliases = new Collection()
        this.initCommands()
        this.initEvents()
        this.login(this.config.token)
    }

    initCommands() {
        const subFolders = fs.readdirSync('./commands')
        for (const category of subFolders) {
            const commandsFiles = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'))
            for (const commandFile of commandsFiles) {
                const command = require(`../../commands/${category}/${commandFile}`)
                this.commands.set(command.name, command)
                if (command.aliases && command.aliases.length > 0) {
                    command.aliases.forEach(alias => this.aliases.set(alias, command))
                }
            }
        }
    }

    initEvents() {
        const subFolders = fs.readdirSync(`./events`)
        for (const category of subFolders) {
            const eventsFiles = fs.readdirSync(`./events/${category}`).filter(file => file.endsWith(".js"))
            for (const eventFile of eventsFiles) {
                const event = require(`../../events/${category}/${eventFile}`)
                this.on(event.name, (...args) => event.run(this, ...args))
                if (category === 'anticrash') process.on(event.name, (...args) => event.run(this, ...args))
            }
        }
    }
}

exports.Bot = Bot