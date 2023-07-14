
const { CrateHandler, InventoryHandler} = require("./util")
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js')
require("dotenv").config()
const chalk = require("chalk")
const path = require("path")
const fs = require("fs")

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.once(Events.ClientReady, c => {
	console.log(`${chalk.blue("[Info]:")} Bot logged in!`)
});


// - Feature hander

function readFeatures(dir) {
	const files = fs.readdirSync(path.join(__dirname, dir))
	for(const file of files){
		const stat = fs.lstatSync(path.join(__dirname, dir, file))
		if(stat.isDirectory()){
			readFeatures(path.join("features", file))
		}else if (file !== 'main.js') {
			const feature = require(path.join(__dirname, dir, file))
			console.log(chalk.blueBright("[Feature handler]: ") + chalk.white(`Loaded "${file}"`))
			feature(client)
		}
	}
}

readFeatures("features")




// - Command handler

client.cooldowns = new Collection();

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
        console.log(`${chalk.blueBright("[Commands]: ")}Loaded command: ${command.data.name}`)
		client.commands.set(command.data.name, command);
	} else {
		console.log(`${chalk.red("[WARNING]:")}The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`${chalk.red("[WARNING]:")} No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {

		
		await command.execute(interaction, client);
	} catch (error) {
		console.error(chalk.red("[ERROR]: ") + error );
		//await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.login(process.env.BOT_TOKEN);