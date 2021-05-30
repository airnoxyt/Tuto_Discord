//définition des modules
const Discord = require('discord.js')
const client = new Discord.Client();
const settings = require('./config.json')
// Partie code
client.on('ready', () => {
    console.log('Je suis en ligne')
})

client.on('message' , (message) => {
    if(message.author.bot) return; //Si l'auteur du message est un bot on l'ignore et on fait pas le reste
if(message.content.startsWith(settings.prefix +"ping")){
    message.channel.send('Message Channel Send')
    message.reply('Message Reply')
    message.react('😇')


}
if(message.author.id !== "votre_id"){
    message.channel.send('votre_message ')
}
})
client.login(settings.token)
