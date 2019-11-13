const Discord = require('discord.js');
// const {prefix, token} = require('./config.json');
const prefix = '!'
const client = new Discord.Client();
const graves = require('./graves.json');

client.once('ready', () =>{
	console.log('ready')
});

client.on('message', message =>{
	if (message.channel.name=='graveyard' && message.content.startsWith(`${prefix}visit`)){
		let visited = message.content.split(/\s+/).splice(1,2)[0]
		if(visited){
			visited = visited.toLowerCase()
			if(visited in graves){
				const embed = new Discord.RichEmbed()
					.setTitle(graves[visited].name)
					.addField('Race',graves[visited].race,true)
					.addField('Class',graves[visited].class,true)
					.addField('Final Words',graves[visited].fwords)
					.setDescription("Killed in ".concat(graves[visited].location).concat(" by ").concat(graves[visited].killer))
				message.channel.send(embed)
			}
			else{
				message.channel.send("We dont have what you seek")
			}
		}
		else{
			message.channel.send("visit whom?")
			message.channel.send(Object.keys(graves).join())
		}
	}
});

// client.login(token);
client.login(process.env.BOT_TOKEN);