// Require the necessary discord.js classes
const fs = require('fs')
const { Client, Intents, Collection } = require('discord.js');
const { CLIENT_RENEG_LIMIT } = require('tls');

// makes hidden .env file readable
require('dotenv').config();

const prefix = "!p";
module.exports = { prefix };

// Create a new client instance
const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ] });

    //#region Getting commands from folder
    client.commands = new Collection();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        client.commands.set(command.data.name, command);
    }
    //#endregion

    //#region Getting events from folder
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
	    const event = require(`./events/${file}`);

	    if (event.once) {
		    client.once(event.name, (...args) => event.execute(...args));
	    } else {
		    client.on(event.name, (...args) => event.execute(...args));
	    } 
    }
    //#endregion

// When the client is ready, run this code (only once)

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', async message => {

});

// Login to Discord with your client's token
client.login(process.env.TOKEN);