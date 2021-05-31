const fs = require('fs')
const loadCommands = (client , dir = "./cmd/") => {
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"))
        for (const file of commands) {
            const getFileName = require(`../${dir}/${dirs}/${file}`)
            client.commands.set(getFileName.help.name, getFileName);
        console.log(`✅ ${getFileName.help.name}`)      
    }
    })
}
module.exports = {
    loadCommands
}