const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addition')
		.setDescription('Addition')
		.addNumberOption(option =>
			option.setName('num1')
				.setDescription('type a number')
				.setRequired(true))
		.addNumberOption(option =>
			option.setName('num2')
				.setDescription('type a number')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply({
			content: 
			`Your answer: ${interaction.options.getNumber('num1') + interaction.options.getNumber('num2')}`, 
			ephemeral: true });
	},
};