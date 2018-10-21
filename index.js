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
  if (!message.content.startsWith(prefix)) return;
  var args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  if (message.author.id !== "324672376455299074") return;

  
  if (message.content.startsWith(prefix + 'setwatch')) {
  bot.user.setActivity(argresult, {type: 'WATCHING'})
     console.log('test' + argresult);
    message.channel.sendMessage(`Watch Now: **${argresult}`)
} 

 
  if (message.content.startsWith(prefix + 'setlis')) {
  bot.user.setActivity(argresult, {type: 'LISTENING'})
     console.log('test' + argresult);
    message.channel.sendMessage(`LISTENING Now: **${argresult}`)
} 


if (message.content.startsWith(prefix + 'setname')) {
  bot.user.setUsername(argresult).then
      message.channel.sendMessage(`Username Changed To **${argresult}**`)
  return message.reply("You Can change the username 2 times per hour");
} 

if (message.content.startsWith(prefix + 'setavatar')) {
  bot.user.setAvatar(argresult);
   message.channel.sendMessage(`Avatar Changed Successfully To **${argresult}**`);
}

if (message.content.startsWith(prefix + 'setstream')) {
  bot.user.setGame(argresult, "https://www.twitch.tv/peery13");
     console.log('test' + argresult);
    message.channel.sendMessage(`Streaming: **${argresult}`)
} 
if (message.content.startsWith(prefix + 'setplay')) {
  bot.user.setGame(argresult);
     console.log('test' + argresult);
    message.channel.sendMessage(`Playing: **${argresult}`)
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

var fs = require('fs');

var auth = require('./auth.json');

var GIT_REPO = 'https://github.com/link00000000/timer-bot';


bot.on("message", function(msg) {
  var command = msg.content;
  if(command.substring(0, 6) === '!timer') {

    log(msg, 'New timer requested');

    if(command === '!timer') {

      bot.reply(msg, '\n**Usage**\n!timer <minutes>:<seconds>\n!timer <minutes>m <seconds>s\n!timer <minutes>m\n!timer <seconds>s');

    } else {

      if(msg.content.charAt(6) === " ") {
        var params = command.substring(7, command.length);

          // M:S
        if(params.indexOf(':') !== -1) {

          var min = parseInt(params.substring(0, params.indexOf(':')));
          var sec = parseInt(params.substring(params.indexOf(':') + 1, params.length));

          timer(msg, toMilli(min, sec));

        }

          // Mm Ss
        if(params.indexOf('m') !== -1 && params.indexOf(' ') !== -1 && params.indexOf('s') !== -1) {

          var min = parseInt(params.substring(0, params.indexOf('m')));
          var sec = parseInt(params.substring(params.indexOf(' ') + 1, params.length));

          timer(msg, toMilli(min, sec));

          // Mm
        } else if(params.indexOf('m') !== -1) {

          var min = parseInt(params);
          var sec = 0;

          timer(msg, toMilli(min, sec));

          // Ss
        } else if(params.indexOf('s') !== -1) {

          var min = 0;
          var sec = parseInt(params);

          timer(msg, toMilli(min, sec));

          // Unknown Time
        } else {
          bot.reply(msg, '\n' + params + ' is not a valid time.\nType !timer for formatting.');
          log(msg, 'Invalid time format. ' + params);
        }
      } else {
          // Github Repo
        if(msg.content === "!timergit" || msg.content === "!timergithub") {
          bot.reply(msg, '\nGithub: ' + GIT_REPO);
          log(msg, 'Requested link to github repo.');

          // list Commands
        } else if (msg.content === '!timerhelp') {
          var commands =  '\n**Commands List**\n' +
                '  • !timer <length> | Sets a timer with the given length. Type !timer for time formatting.\n' +
          bot.reply(msg, commands);
          log(msg, 'Commands List was requested');
        } else {

          // Default Unknown
          bot.reply(msg, '\nCommand Unknown\nType !bf4help for a list of commands.');
          log(msg, 'Unknown Command. ' + msg.content);
        }
      }

    }


  }
});

// Converts minutes and seconds into milliseconds
function toMilli(min, sec) {

  var milli = 0;

  milli += min * 60000;
  milli += sec * 1000;

  return milli;

}

// Converts milliseconds into minutes and seconds
function fromMilli(milli) {

  var min = 0;
  var sec = 0;

  sec = milli / 1000;
  min = Math.floor(sec / 60);
  sec -= min * 60;

  if(sec < 10) {
    sec = '0' + sec.toString();
  }
  if(min < 10) {
    min = '0' + min.toString();
  }

  return min + ':' + sec;

}

// Sets the timer
function timer(msg, duration) {

  log(msg, 'Timer has been set for ' + fromMilli(duration));

  setTimeout(function() {


  }, duration);
}

bot.login(auth.email, auth.password);

function log(msg, text) {

  var date = new Date();
  var timestamp;
    var hrs, mins, secs;
    if(date.getHours() < 10) {
      hrs = "0".toString() + date.getHours().toString();
    } else { hrs = date.getHours(); }
    if(date.getMinutes() < 10) {
      mins = "0".toString() + date.getMinutes().toString();
    } else { mins = date.getMinutes(); }
    if(date.getSeconds() < 10) {
      secs = "0".toString() + date.getSeconds().toString();
    } else { secs = date.getSeconds(); }
  timestamp = '[' + hrs +':' + mins + ':' + secs + ']';
  var author = '[' + msg.author.username + ']';
  var data = timestamp + ' ' + author + ' ' + text;

  var fileName = './logs/' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString() + '-' + date.getFullYear().toString() + '.log';

  console.log(data);

  try {
    fs.accessSync(fileName, fs.F_OK);
    fs.appendFile(fileName, data + '\r');
  } catch (err) {
    fs.writeFile(fileName, data);
  }

}

bot.login(process.env.BOT_TOKEN)
	
const prefix = '$';
