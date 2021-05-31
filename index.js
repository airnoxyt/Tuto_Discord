//définition des modules
const {Client , Collection , MessageEmbed} = require('discord.js')
const fs = require('fs')
const moment = require('moment')
const client = new Client();
["commands", "cooldowns"].forEach(x => client[x] = new Collection())
const settings = require('./config.json')
const {loadCommands} = require('./fonction/loadCommande')
// Partie code
client.on('ready', () => {
    console.log('Je suis en ligne')
})

client.on('message' , (message) => {
 const args = message.content.slice(settings.prefix.length).split(/ +/);
    const user = message.mentions.users.first();
    console.log(args)
   const commandName = args.shift().toLowerCase();
  
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return ;
  
    if (command.help.args &&  !args.length) {
    let NoArgsReply = `Il nous faut plus de précision ${message.author} !`;
    if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS')) return message.reply("Oups ! Tu n'a pas les permissions !")
  
    if (command.help.usage) NoArgsReply += `\nVoici comment utilisé la commande: \`${settings.prefix}${command.help.name} ${command.help.usage}\` ` ;
    return message.channel.send(NoArgsReply);
  
    }
    if(!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection);
  
    }
    const timeNow = Date.now()
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || settings.cooldown)* 1000;
  
    if(tStamps.has(message.author.id)){
    const cdExpiration = tStamps.get(message.author.id) + cdAmount;
  
    if(timeNow < cdExpiration){
        timeLeft = (cdExpiration - timeNow) / 1000;
        return message.reply(`Oups ! Merci d'attendre \`${timeLeft.toFixed(0)}\`seconde(s) !`)
    }
    }
  
    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);
  
  
    if (command.help.isUserAdmin && !user) return message.reply("Oups ! Tu n'a pas mensionnez d'utilisateure")
    if (command.help.isUserAdmin && message.guild.member(message.mentions.users.first()).hasPermission('BAN_MEMBERS')) return message.reply("Oups ! Tu ne peut pas utilisé cette comande contre cette personne !")
    if (command.help.isUserAdmin && message.guild.member(message.mentions.users.first()).hasPermission('ADMINISTRATOR')) return message.reply("Oups ! Tu ne peut pas utilisé cette comande contre cette personne !")
  
  
  
  
  
  
    command.run(client,message,args, settings)


}

})
client.login(settings.token)
