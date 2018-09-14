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

bot.on("ready", async  => {
setInterval(function(){
bot.channels.find('id', '487993482523443230').setName("T");
bot.channels.find('id', '487993482523443230').setName("Th");
bot.channels.find('id', '487993482523443230').setName("The");
bot.channels.find('id', '487993482523443230').setName("The R");
bot.channels.find('id', '487993482523443230').setName("The Ro");
bot.channels.find('id', '487993482523443230').setName("The Roy");
bot.channels.find('id', '487993482523443230').setName("The Roya");
bot.channels.find('id', '487993482523443230').setName("The Royal");
bot.channels.find('id', '487993482523443230').setName("The Royal L");
bot.channels.find('id', '487993482523443230').setName("The Royal Le");
bot.channels.find('id', '487993482523443230').setName("The Royal Leg");
bot.channels.find('id', '487993482523443230').setName("The Royal Lege");
bot.channels.find('id', '487993482523443230').setName("The Royal Legen");
bot.channels.find('id', '487993482523443230').setName("The Royal Legend");
bot.channels.find('id', '487993482523443230').setName("● The Royal Legend ●");
  }, 3000);
});

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
              if(!message.channel.guild) return;
    var prefix = "$";
    if(message.content.startsWith('$bc')) {
    if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
  if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
    let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
    let copy = "The Royal Legend";
    let request = `Requested By ${message.author.username}`;
    if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``).then(msg => {
    msg.react('✅')
    .then(() => msg.react('❌'))
    .then(() =>msg.react('✅'))

    let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
    let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
       let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
    let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
    reaction1.on("collect", r => {
    message.channel.send(`☑ | Done ... The Broadcast Message Has Been Sent For ${message.guild.members.size} Members`).then(m => m.delete(5000));
    message.guild.members.forEach(m => {
    var bc = new
       Discord.RichEmbed()
       .setColor('RANDOM')
       .setTitle('Broadcast | برودكاست')
       .addField('Server | سيرفر', message.guild.name)
       .addField('Sender | المرسل', message.author.username)
       .addField('Message | الرسالة', args)
       .setImage("https://cdn.discordapp.com/icons/414742520908480522/0db95178a4b5bc2842ac4ce9585c80fa.jpg?size=128")
       .setThumbnail(message.author.avatarURL)
       .setFooter(copy, bot.user.avatarURL);
    m.send({ embed: bc })
    msg.delete();
    })
    })
    reaction2.on("collect", r => {
    message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
    msg.delete();
    })
    })
    }
    });


bot.login(process.env.BOT_TOKEN)
	
	
