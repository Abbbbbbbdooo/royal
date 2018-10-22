const yourID = "324672376455299074"; //Instructions on how to get this: https://redd.it/40zgse
const setupCMD = "!r-a"
let initialMessage = `

**لكشف الفئة الذي تريدها ,اضغط على الأيموجي اسفل الفئة التي تعجبك, في حال لم تعجبك الفئة اضغط على الأيموجي مرة اخرى كي تنحذف الرتبة.** :dizzy:

`;

const roles = ["Public | عام","Fortnite | فورتنايت","Minecraft | ماين كرافت","Creative Destruction | كريتيف ديستركشن","Shop | متجر"];
const reactions = ["📢","🎮","🖱","🕹","💳"];
 /*You'll have to set this yourself; read more
                     here https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token*/

//Load up the bot...
const Discord = require('discord.js');
const bot = new Discord.Client();

//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`**"${role}"**`); //DONT CHANGE THIS
    return messages;
}


bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }
})


bot.on('raw', event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
        
        let channel = bot.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg=> {
        let user = msg.guild.members.get(event.d.user_id);
        
        if (msg.author.id == bot.user.id && msg.content != initialMessage){
       
            var re = `\\*\\*"(.+)?(?="\\*\\*)`;
            var role = msg.content.match(re)[1];
        
            if (user.id != bot.user.id){
                var roleObj = msg.guild.roles.find('name', role);
                var memberObj = msg.guild.members.get(user.id);
                
                if (event.t === "MESSAGE_REACTION_ADD"){
                    memberObj.addRole(roleObj)
                } else {
                    memberObj.removeRole(roleObj);
                }
            }
        }
        })
 
    }   
});


  bot.on('message', message => { 
if(message.content.startsWith(prefix + 'sug')) {
      if(!message.channel.guild) return message.reply(`هذا الأمر فقط ل السيرفرات :x:`);
   let args = message.content.split(" ").slice(1);
   var ID = message.author.id 
   var emben = new Discord.RichEmbed()
   .setTimestamp()
   .setTitle(`:x: Error`)
   .setDescription(`الرجاء كتابت إقتراحك بعد الأمر `)
   if(!args.join(" ")) return message.channel.send(emben).then(message => {message.delete(50000)});
   var embet = new Discord.RichEmbed()
   .setTitle(`:white_check_mark: Success!`)
   .setTimestamp()
   .setDescription(`شكراً على اقتراحك !`)
.addField(`إقتراحك : `,args.join(" "))
   var embed = new Discord.RichEmbed()
   .setTimestamp()
   .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL)
   .setFooter(`${message.author.username}#${message.author.discriminator}`)
   .setTitle(`${bot.user.username}`)
   .setURL(`${bot.user.avatarURL}`)
   .setDescription(`**
__المقترح__ :\n <@${ID}>\n
__الإقتراح__ :  \`\`\`${args.join(" ")}\`\`\`**`)
           bot.channels.get("500361564969369601").send(embed)
  message.channel.sendEmbed(embet).then(message => {message.delete(50000)})
            message.react("📩")
}
});

bot.on('message', message => {
    if(message.content.startsWith(prefix + 'new')) {
        let args = message.content.split(' ').slice(1).join(' ');
        let support = message.guild.roles.find("name","Support");
        let ticketsStation = message.guild.channels.find("name", "TICKETS");
        if(!args) {
            return message.channel.send('اكتب موضوع التكت.');
        };
                if(!support) {
                    return message.channel.send('**`Support` تأكد من وجود رتبة**');
                };
            if(!ticketsStation) {
                message.guild.createChannel("TICKETS", "category");
            };
                message.guild.createChannel(`ticket-${message.author.id}`, "text").then(ticket => {
                    message.delete()
                        message.channel.send(`تم انشاء تذكرة. [ ${ticket} ]`);
                    ticket.setParent(ticketsStation);
                    ticketsStation.setPosition(1);
                        ticket.overwritePermissions(message.guild.id, {
                            SEND_MESSAGES: false,
                            READ_MESSAGES: false
                        });
                            ticket.overwritePermissions(support.id, {
                                SEND_MESSAGES: true,
                                READ_MESSAGES: true
                            });
                                ticket.overwritePermissions(message.author.id, {
                                    SEND_MESSAGES: true,
                                    READ_MESSAGES: true
                                });
                    let embed = new Discord.RichEmbed()
                                .setTitle('**The Royal Manager**')
                                .setColor("RANDOM")
                                .setThumbnail(`${message.author.avatarURL}`)
                                .addField('الموضوع', args)
                                .addField('صاحب التكت', message.author)
                                .addField('تم انشاء التكت من روم', `<#${message.channel.id}>`);

                                ticket.sendEmbed(embed);
                }) .catch();
    }
    if(message.content.startsWith(prefix + 'close')) {
            if(!message.member.hasPermission("ADMINISTRATOR")) return;
        if(!message.channel.name.startsWith("ticket")) {
            return;
        };  
                let embed = new Discord.RichEmbed()
                    .setAuthor("هل انت متأكد من اغلاق التكت؟اكتب 'نعم' اذا تريد اغلاقه")
                    .setColor("RANDOM");
                    message.channel.sendEmbed(embed) .then(codes => {

                    
                        const filter = msg => msg.content.startsWith(prefix + 'close');
                        message.channel.awaitMessages(response => response.content === 'نعم', {
                            max: 1,
                            time: 20000,
                            errors: ['time']
                        })
                        .then((collect) => {
                            message.channel.delete();
                        }) .catch(() => {
                            codes.delete()
                                .then(message.channel.send('**تم الغاء اغلاق التكت.**')) .then((c) => {
                                    c.delete(4000);
                                })
                                    
                            
                        })


                    })


            
    }
});



bot.on('message', message => {
    if(message.content.startsWith(prefix + "server")){
        if(!message.member.hasPermission('ADMINSTRATION')) return message.reply(`:x: | هذا الامر فقط للادمن استراتور`);
        var embed = new Discord.RichEmbed();
        embed.setAuthor(`${message.guild.name}`, message.guild.iconURL)
        embed.addField(`:id: **اي دي سيرفر**`, `${message.guild.id}`)
        embed.addField(`:calendar: **صنع في**`, `${message.guild.createdAt}`)
        embed.addField(`:crown: **صاحب السيرفر**`, `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator} [${message.guild.owner.user.id}]`)
        embed.addField(`:speech_balloon: **الرومات [${message.guild.channels.size}]**`, `${message.guild.channels.filter(e => e.type === "text").size} text | ${message.guild.channels.filter(e => e.type === "voice").size} Voice | ${message.guild.channels.filter(e => e.type === "category").size} Category`)
        embed.addField(`:busts_in_silhouette: **الاعضاء [${message.guild.memberCount}]**`, `**${message.guild.members.filter(a => a.presence.status !== 'offline').size}** Online`)
        embed.addField(`:earth_africa: **اخرى**`, `**Region:** ${message.guild.region} \n**Verification Level:** ${message.guild.verificationLevel}`)
        embed.addField(`:closed_lock_with_key: **الرتب**`, `**[${message.guild.roles.size}]**`)
        embed.setTimestamp()
        embed.setColor("RANDOM")
        embed.setFooter(" ")
        message.channel.send({embed})
    }
});

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

const moment = require("moment")
bot.on("guildMemberAdd", m => {
        let room = m.guild.channels.find(a => a.name === 'log'); //
    if (datediff(parseDate(moment(m.user.createdTimestamp).format('l')), parseDate(moment().format('l'))) < 2) {
        m.ban() .then((
            room.send(`**:no_entry: | ${m} Banned For: \`fake\`**`)
        ));
    };
    function parseDate(str) {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[0]-1, mdy[1]);
    };
    
    function datediff(first, second) {
        return Math.round((second-first)/(1000*60*60*24));
    };
});

bot.login(process.env.BOT_TOKEN)
	
const prefix = '$';
