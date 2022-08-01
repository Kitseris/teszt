const Discord = require('discord.js');
var config = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();

var prefix = config.Prefix
client.login(config.Token);

var date1 = new Date();
let idő1 = (date1.toLocaleTimeString());
let dátum1 = (date1.toLocaleDateString());

console.log(date1.toLocaleString());

//parancsok-----------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const  file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();



   

    if(command === 'kemono'){
        client.commands.get('kemono').execute(message, args);

    } if(command === 'wp'){
      client.commands.get('wp').execute(message, args);

    } switch (command) {
      
  
//uptime jelző

        case 'uptime': {
   
          let nap = Math.floor(client.uptime / 86400000);
          let óra = Math.floor(client.uptime / 3600000) % 24;
          let perc = Math.floor(client.uptime / 60000) % 60;
          let másodperc = Math.floor(client.uptime / 1000) % 60;

          var actualtime = new Date().toLocaleTimeString();
          var actualdate = new Date().toLocaleDateString();

          let embed = new Discord.MessageEmbed()
          embed.setTitle(`:clock1: **Indítás óta eltelt idő:**`);
          embed.setDescription(`**${nap}**nap **${óra}**óra **${perc}**perc **${másodperc}**másodperc`);
          embed.setColor(4352901);
          embed.setFooter(`Ekkor indult a bot: \n Idő: ${idő1}\n Dátum: ${dátum1} \n \nPontos idő:\n Idő: ${actualtime}\n Dátum: ${actualdate}\n \n 🏓\n\nFejlesztő, Hosting: Kitseris`)
          message.channel.send(embed).then(msg => {

            let embed2 = new Discord.MessageEmbed()
            embed2.setTitle(`:clock1: **Indítás óta eltelt idő:**`);
            embed2.setDescription(`**${nap}**nap **${óra}**óra **${perc}**perc **${másodperc}**másodperc`);
            embed2.setColor(4352901);
            embed2.setFooter(`Ekkor indult a bot: \n Idő: ${idő1}\n Dátum: ${dátum1} \n \nPontos idő:\n Idő: ${actualtime}\n Dátum: ${actualdate}\n \n 🏓 | válaszidő: ${msg.createdTimestamp - message.createdTimestamp}ms. \n\nFejlesztő, Hosting: Kitseris`)
            msg.edit(embed2)

          })
          console.log(`Uptime: ${nap}nap ${óra}óra ${perc}perc ${másodperc}másodperc `)
          break;
        }
      
 
      }
});

//server stat---------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const stats = {
  szerverID: '478136145209851924',
  összID: '934201307651244062',
  emberekID: '934202025355382834',
  botokID: '934201850549395500',
}

client.on("guildMemberAdd", member => {
  if(member.guild.id !== stats.szerverID) return;
  client.channels.cache.get(stats.összID).setName(`Teljes létszám: ${member.guild.memberCount}`);
  client.channels.cache.get(stats.emberekID).setName(`Tagok: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
  client.channels.cache.get(stats.botokID).setName(`Botok: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
});

client.on("guildMemberRemove", member => {
  if(member.guild.id !== stats.szerverID) return;
  client.channels.cache.get(stats.összID).setName(`Teljes létszám: ${member.guild.memberCount}`);
  client.channels.cache.get(stats.emberekID).setName(`Tagok: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
  client.channels.cache.get(stats.botokID).setName(`Botok: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
});

//belépés jelző-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

const welcomepictures = [
  'https://i.imgur.com/sSNwWtW.png',
'https://i.imgur.com/8ZM1NwJ.png',
'https://i.imgur.com/DqYZ0Hj.png',
'https://i.imgur.com/rJRW4xl.png',
'https://i.imgur.com/18Trout.png',
'https://i.imgur.com/RfSX7wT.png',
'https://i.imgur.com/Bi6O77D.png',
'https://i.imgur.com/GOrNy6I.png',
'https://i.imgur.com/QNNLqaH.png',
]
client.on('guildMemberAdd', guildMember =>{
  let welcomeembed = new Discord.MessageEmbed()
  .setTitle(`Üdvözöllek ${guildMember.user.username}!`)
  .setDescription(`Üdv nálunk!=^.^=
  Első utad vezessen a szabályzathoz, ennek elolvasása után bökj a pipára, hogy többet láss belőlünk. Érezd jól magad!`)
  .setThumbnail(guildMember.user.displayAvatarURL())
  .setImage(welcomepictures[Math.floor(Math.random() * welcomepictures.length)])
  .setColor('#9f02fc')
  .setTimestamp()

  guildMember.guild.channels.cache.get('931897951373111306').send(welcomeembed)
});

//kilépés jelző-----------------------------------------------------------------------------------------------------------------------------------------------------------------//

const leavepictures = [
  'https://i.imgur.com/Gcuy5c6.png',
  'https://i.imgur.com/n1JEYdk.jpg',
  'https://i.imgur.com/n1JEYdk.jpg',
  'https://i.imgur.com/bQLQekO.png',
  'https://i.imgur.com/zdhFz58.png',
  'https://i.imgur.com/GpMwlyx.jpg',
  'https://i.imgur.com/YDMKZvA.png',
]
client.on("guildMemberRemove", guildMember =>{
let leaveembed = new Discord.MessageEmbed()
.setTitle(`Égveled ${guildMember.user.username}!`)
.setDescription(`Sajnálom, hogy elhagytad a szervert, remélem visszatérsz valamikor!`)
.setThumbnail(guildMember.user.displayAvatarURL())
.setImage(leavepictures[Math.floor(Math.random() * leavepictures.length)])
.setColor('#990000')
.setTimestamp()

guildMember.guild.channels.cache.get('931918998650630144').send(leaveembed)
});
