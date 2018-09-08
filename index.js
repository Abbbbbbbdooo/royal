const yourID = "324672376455299074"; //Instructions on how to get this: https://redd.it/40zgse
const setupCMD = "!r-a"
let initialMessage = `**اختر القسم اليعجبك بالضغط على ري اكشن**
`;

const roles = ["Public | عام","Games | العاب","Shop | متجر"];
const reactions = ["💻","💻","💻"];
 /*You'll have to set this yourself; read more
                     here https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token*/

//Load up the bot...
const Discord = require('discord.js');
const bot = new Discord.Client();

client.on("ready", async  => {
setInterval(function(){
client.channels.find('id', '487987736175837185').setName("T");
client.channels.find('id', '487987736175837185').setName("Th");
client.channels.find('id', '487987736175837185').setName("The");
client.channels.find('id', '487987736175837185').setName("The R");
client.channels.find('id', '487987736175837185').setName("The Ro");
client.channels.find('id', '487987736175837185').setName("The Roy");
client.channels.find('id', '487987736175837185').setName("The Roya");
client.channels.find('id', '487987736175837185').setName("The Royal");
client.channels.find('id', '487987736175837185').setName("The Royal L");
client.channels.find('id', '487987736175837185').setName("The Royal Le");
client.channels.find('id', '487987736175837185').setName("The Royal Leg");
client.channels.find('id', '487987736175837185').setName("The Royal Lege");
client.channels.find('id', '487987736175837185').setName("The Royal Legen");
client.channels.find('id', '487987736175837185').setName("The Royal Legend");
client.channels.find('id', '487987736175837185').setName("● The Royal Legend ●");
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
bot.login(process.env.BOT_TOKEN)
	
	
