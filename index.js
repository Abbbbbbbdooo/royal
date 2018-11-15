
const Discord = require('discord.js');
const bot = new Discord.Client();






bot.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  var args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  if (message.author.id !== "324672376455299074") return;

  
  if (message.content.startsWith(prefix + 'setwatch')) {
  bot.user.setActivity(argresult, {type: 'WATCHING'})
     console.log('test' + argresult);
    message.channel.sendMessage(`Watch Now: **${argresult}**`)
} 

 
  if (message.content.startsWith(prefix + 'setlis')) {
  bot.user.setActivity(argresult, {type: 'LISTENING'})
     console.log('test' + argresult);
    message.channel.sendMessage(`LISTENING Now: **${argresult}**`)
} 


if (message.content.startsWith(prefix + 'setname')) {
  bot.user.setUsername(argresult).then
      message.channel.sendMessage(`Username Changed To **${argresult}**`)
  return message.reply("You Can Only Chanage Name 2 Times Per Hour");
} 

if (message.content.startsWith(prefix + 'setavatar')) {
  bot.user.setAvatar(argresult);
   message.channel.sendMessage(`Avatar Changed Successfully To **${argresult}**`);
}

if (message.content.startsWith(prefix + 'setstream')) {
  bot.user.setGame(argresult, "https://www.twitch.tv/peery13");
     console.log('test' + argresult);
    message.channel.sendMessage(`Streaming: **${argresult}**`)
} 
if (message.content.startsWith(prefix + 'setplay')) {
  bot.user.setGame(argresult);
     console.log('test' + argresult);
    message.channel.sendMessage(`Playing: **${argresult}**`)
} 



});
bot.on('message',async message => {
if(message.content === '$unbanall') {
	        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌|**\`ADMINISTRATOR\`لا توجد لديك صلاحية`**');
message.guild.fetchBans().then(ba => {
ba.forEach(ns => {
message.guild.unban(ns);
});
});
}
});



bot.login(process.env.BOT_TOKEN)
	
const prefix = '$';
