require("dotenv").config()

const { REST, Routes } = require('discord.js');
const path = require("path")
const fs = require('node:fs');

const chalk = require("chalk")

const commands = [];
module.exports = () => {

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}


const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);


(async () => {
	try {
		console.log(`${chalk.blue("[Info]: ")}Started refreshing ${commands.length} application (/) commands.`);

		
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.BOT_ID, '702534425249841752'),
			{ body: commands },
		);

		console.log(`${chalk.green("[Info]: ")}Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		
		console.error(chalk.red("[ERROR]: ") +error);
	}
})();
}
