import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ICommand, IParsedArgs, ISimplifiedMessage } from '../../typings'
import { MessageType, Mimetype } from '@adiwajshing/baileys'
import request from '../../lib/request'


export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'dairy',
            description: 'Displays the help menu or shows the info of the command provided',
            category: 'general',
            usage: `${client.config.prefix}help (command_name)`,
            aliases: ['h', 'fg', 'Dairy', 'cmd']
        })
    }

    run = async (M: ISimplifiedMessage, parsedArgs: IParsedArgs): Promise<void> => {
            const n = [
            './assets/Pikachu/_yuno.mirai_-20220322-0001.mp4'
        ]
        let rin = n[Math.floor(Math.random() * n.length)]
        if (!parsedArgs.joined) {
            const commands = this.handler.commands.keys()
            const categories: { [key: string]: ICommand[] } = {}
            for (const command of commands) {
                const info = this.handler.commands.get(command)
                if (!command) continue
                if (!info?.config?.category || info.config.category === 'dev') continue
                if (Object.keys(categories).includes(info.config.category)) categories[info.config.category].push(info)
                else {
                    categories[info.config.category] = []
                    categories[info.config.category].push(info)
                }
            }
            let text = `
╭─「check guide command *,guide*」
│⋊ ᴜꜱᴇʀ: *${M.sender.username}*
│⋊ ɴᴀᴍᴇ: YUNO
│⋊ ᴘʀᴇꜰɪx: ${this.client.config.prefix}
│⋊ ᴏᴡɴᴇʀ: *${this.client.config.prefix}mods*
│⋊ ᴏᴡɴᴇʀ: 𝓣𝓸 𝓼𝓮𝓮 𝔂𝓸𝓾𝓻 𝓯𝓾𝓽𝓾𝓻𝓮 𝓲𝓷 𝔂𝓸𝓾𝓻 𝓰𝓻𝓸𝓾𝓹 𝓪𝓼𝓴 𝓽𝓱𝓮 𝓸𝔀𝓷𝓮𝓻
╰────────────                            
                     🅻🅴🆃 🆃🅷🅴 🅶🅰🅼🅴 🅱🅴🅶🅸🅽\n\n`
            const keys = Object.keys(categories)
            for (const key of keys)
                text += `${this.lemojis[keys.indexOf(key)]} *${this.client.util.capitalize(key)}*\n\n• \`\`\`${categories[
                    key
                ]
                    .map((command) => command.config?.command)
                    .join(' , ')}\`\`\`\n\n`
            return void this.client.sendMessage(M.from, { url: rin }, MessageType.video, {quoted:M.WAMessage,
            mimetype: Mimetype.gif,
            caption: `${text} 
 ──❅┈[ *Yuno* ]┈❅───
┌────────────┈❅
│   🧨 *𝓨𝓾𝓷𝓸*
│   ©️ 𝙔𝙪𝙣𝙤 𝙜𝙖𝙨𝙖𝙞
└────────────┈⁂
❅┈[Maybe the future is bad. But there's a future beyond that, right?]┈❅
🌹 *Note:* \nUse *${this.client.config.prefix}help* <command_name> \n to view your Dairy ` }
            )
        }
        const key = parsedArgs.joined.toLowerCase()
        const command = this.handler.commands.get(key) || this.handler.aliases.get(key)
        if (!command) return void M.reply(`No Command of Alias Found | "${key}"`)
        const state = await this.client.DB.disabledcommands.findOne({ command: command.config.command })
        M.reply(
            `🎈 *Command:* ${this.client.util.capitalize(command.config?.command)}\n📉 *Status:* ${
                state ? 'Disabled' : 'Available'
            }\n⛩ *Category:* ${this.client.util.capitalize(command.config?.category || '')}${
                command.config.aliases
                    ? `\n♦️ *Aliases:* ${command.config.aliases.map(this.client.util.capitalize).join(', ')}`
                    : ''
            }\n🎐 *Group Only:* ${this.client.util.capitalize(
                JSON.stringify(!command.config.dm ?? true)
            )}\n💎 *Usage:* ${command.config?.usage || ''}\n\n📒 *Description:* ${command.config?.description || ''}`
        )
    }
    lemojis = ['🔖','🔖','🔖','🔖','🔖','🔖','🔖','🔖','🔖','🔖']
}
