const { prefix } = require('../index.js')
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

		if (message.content = prefix + 'test') {
			message.reply({content: "hey"})

		}
			
		console.log(`${message.member} in #${message.channel.name} triggered interaction. with a "!" command`);
	},
};