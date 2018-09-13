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



bot.on('message', msg => {

  if(msg.content.startsWith('$sug')) {
    if(!msg.channel.guild) return msg.reply('** هاذا الامر فقط للسيرفرات**');
    if(!msg.guild.channels.find('name', 'suggestions')) return msg.reply('**الرجاء إضافة روم بإسم (suggestions)**');
    let args = msg.content.split(" ").slice(1);
    if(!args[1]) return msg.reply('الرجاء كتابة الاقتراح')
    
    if(msg.guild.channels.find('name', 'suggestions')) {
     
    msg.guild.channels.find('name', 'suggestions').send(`
      تم الاقتراح من قبل : ${msg.member}

      الاقتراح : 
      ${args.join(" ").split(msg.mentions.members.first()).slice(' ')}
      `)
      .then(function (message) {
        message.react('✅')
        message.react('❌')
      })
      }
    }

});

bot.login(process.env.BOT_TOKEN)
	
	
