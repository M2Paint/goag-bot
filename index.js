const discord = require("discord.js");
const settings = require("./settings.json")
const bot = new discord.Client();
const prefix = settings.prefix
const ownerId = settings.ownerId

var servers = [];
function error(message, error){
     message.channel.send({embed:{
        color: 16711680,
        name: bot.name + " - ERROR",
        description: error
    }})
}
function display(message, text){
     message.channel.send({embed:{
        color: 6592255,
        name: bot.name,
        description: text
    }})
}
bot.on('ready', function() {
    console.log('Bot has been loaded!')
    bot.user.setGame(prefix + "help for help!");
    bot.user.setPresence({status: "online"});
});
bot.on('message', function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "help":
            message.channel.send({embed:{
                title:"Help - " + message.channel.guild.name,
            fields: [
                {
                    name: "purge",
                    value: "Purges/removes messages! Example. " + prefix + "purge 50"
                },
                {
                    name: "kick",
                    value: "Kicks the user from the server! Example. "+prefix+"kick @MyEnemy#2215"
                },
                {
                    name: "ban",
                    value: "Kicks the user from the server! Example. "+prefix+"ban @MyEnemy#2215"
                },
                {
                    name: "tip",
                    value: "Gives you tips on using discord! Example. "+prefix+"tip"
                },
                {
                    name: "8ball",
                    value: "Ask it anything!! Example. "+prefix+"8ball are you running?"
                }
            ]}})
            break;
        case "chat":
            message.channel.send({embed: {
                title: message.author.name,
                description: message
            }})
            break;
        case "purge":
            if (!message.member.hasPermission("MANAGE_MESSAGES")){return}
            if(args[1]){
                var num
                if(num == NaN){
                    error(message, "Check your arguments!")
                    return
                }
                num = Number(args[1])
                if (num < 101) {
                    message.channel.bulkDelete(num)
                    display(message, "Purged " + num + " messages!")
                }else{
                    error(message, "Error purging messages. Make sure what you entered is a number and less than 100!")
                }
            }else{
                error(message, "Check your arguments!")
                return;
            };
            break;
        case "kick":
            if(!message.member.hasPermission("KICK_MEMBERS")){return}
            if(args[1]){
                try {
                    var mem = message.mentions.users.first()
                    message.guild.member(mem).kick();
                    display(message, mem + " has been kicked!!")
                } catch (theerror) {
                    error(message, "Can't kick that user!!!!")
                }
            }else{
                error(message, "Check your arguments!")
            }
            break;
        case "ban":
            if(!message.member.hasPermission("BAN_MEMBERS")){return}
            if(args[1]){
                try {
                    var mem = message.mentions.users.first()
                    message.guild.member(mem).ban();
                    display(message, mem + " has been banned!!")
                } catch (theerror) {
                    error(message, "Can't ban that user!!!!")
                }
            }
            break;
        case "8ball":
            if(args[1]){
                var num = Math.floor(Math.random()*settings.other.eightball.length)
                display(message, settings.other.eightball[num])
            }else{
                error(message, "Check your arguments!")
            }
            break;
        case "tip":
            var random = Math.floor(Math.random()*settings.other.tips.length)
            message.channel.send(settings.other.tips[random])
            break;
    };
});
bot.login(process.env.BOT_TOKEN);