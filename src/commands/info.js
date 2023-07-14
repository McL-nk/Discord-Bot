const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const os = require("os")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("view various bot information")
    .addSubcommand(subcommand =>
        subcommand.setName("commands")
        .setDescription('View a "help" menu which displays all bot commands and what they do')
        )
    .addSubcommand(subcommand => 
        subcommand.setName("stats")
        .setDescription("View bot stats"))
    ,
    async execute(interaction, bot) {

        switch(interaction.options.getSubcommand())
        {
            case "commands":

            break;

            case "stats":
                interaction.reply({ content: 'Please wait...', fetchReply: true }).then(async (sentmessage) => {
            
   // with initial value to avoid when the array is empty
   const core = os.cpus()[0];
   let days = Math.floor(bot.uptime / 86400000);
   let hours = Math.floor(bot.uptime / 3600000) % 24;
   let minutes = Math.floor(bot.uptime / 60000) % 60;
   let seconds = Math.floor(bot.uptime / 1000) % 60;
                    const { guild } = interaction
  function add(accumulator, a) {
    return accumulator + a;
  }
 
    let numberServers = await bot.shard.broadcastEval(bot => bot.guilds.cache.size)
   
    let numberMembers = await bot.shard.broadcastEval(bot =>  bot.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
  numberServers =numberServers.reduce(add, 0);
  numberMembers=numberMembers.reduce(add, 0);
    const ping = sentmessage.createdTimestamp - interaction.createdTimestamp
    const Embed420 = new EmbedBuilder()   
    .setColor(0xc917ff)
                  .setTitle(`Bot info`)
                  .addFields([
                    {
                        name: "Host",
                        value: "[Snakecraft](https://discord.gg/Fb2k6wx2)",
                        inline: true
                    },
                    {
                        name: `Misc`,
                        value: `
                        Node.js: ${process.version}
                        Discord.js: ^14.7.1
                      `,
                        inline: false
                    }
                  ])
               
                
                  .setDescription(`\`\`\`diff
+                  General                      +
+_______________________________________________+\`\`\`` +  `\`\`\`yml
Bot shard: ${guild.shardId + 1} / ${bot.shard.count}
Bot ping: ${ping}ms
API ping: ${bot.ws.ping}ms
Total users: ${numberMembers}
Total servers: ${numberServers}\`\`\`` + `\`\`\`diff
+                    System                     +
+_______________________________________________+\`\`\`` + `\`\`\`yml
Platform: ${process.platform}
OS Version: ${os.version().replace(/[\W_0-9]+/g, "") + " " + os.release()}
Uptime: ${days}d ${hours}h ${minutes}m ${seconds}s
CPU:
\u3000 Cores: ${os.cpus().length}
\u3000 Model: ${core.model}
\u3000 Speed: ${core.speed}MHz
Memory:
\u3000 Total: ${(process.memoryUsage().heapTotal  / 1024 / 1024).toFixed(2)} MB / 2GB
\u3000 Used: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / 2GB\`\`\``)
                
                  .setTimestamp()   
                  interaction.editReply({content: " ", embeds: [Embed420]})
             
                })
            break;
        }
    }
}