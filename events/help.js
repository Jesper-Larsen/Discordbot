const { prefix } = require('../index.js')
const { MessageEmbed } = require('discord.js')
module.exports = {
	name: 'messageCreate',
	execute(message) {

		if (!message.content.startsWith(prefix)) return;
		// Make sure the message author isn't a bot.
 		if (message.author.bot) return;
		// Make sure the channel the command is called in is a text channel.
		if (!message.channel.type == 'text') return; 


		// Commands

		// Need to make it so it is a list of commands and has 1 file each

		if (message.content === prefix + "help") {
			const commandEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Commands')
			.setDescription('All available commands')
			.addFields(
				{ name: '/ping', value: 'Replies with Pong!' },
				{ name: '/server', value: 'Replies with server info!' },
				{ name: '/user', value: 'Replies with user info' },
				{ name: '/add', value: 'Replies with calculated number' },
				{ name: 'Hello', value: 'Replies with Hello World!' },
				{ name: '\u200B', value: '\u200B' },
			)
			.setTimestamp();

			message.channel.send({embeds: [commandEmbed]})
		}
		else return;
			
		console.log(`${message.member} in #${message.channel.name} triggered interaction. with a "!" command`);
	},
};