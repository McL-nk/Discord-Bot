const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");
const { serverSchema, guildSchema, mongo } = require("../util");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("statuschannels")
    .setDescription("manage the status channels for your server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
    option
      .setName("action")
      .setRequired(true)
      .setDescription(
        "The action you wana do"
      )
      .setChoices(
        { name: "Create", value: "create" },
        { name: "Delete", value: "delete" }
      )
  )
   ,
  async execute(interaction, client) {
    if(!interaction.inGuild()) return interaction.reply({content: "This command can only be run in a guild"})

    await mongo().then(async (mongoose) => {
      try {
        
        
       

          switch(interaction.options.getString("action")){
            
            case "create":
              let guild = interaction.guild

             let category = await guild.channels.create({
                name: "Minecraft stats",
                type: ChannelType.GuildCategory,
                position: 1,
                permissionOverwrites: [
                  {id: interaction.guildId, deny:[PermissionFlagsBits.Connect]},
                  {id: client.user.id, allow: [PermissionFlagsBits.Connect]}
                ]
              })

              let channel1 = await guild.channels.create({
                name: "🔴 Server Offline",
                type: ChannelType.GuildVoice,
                parent: category.id
              })

              let channel2 = await guild.channels.create({
                name: "👥 Players Online: 0",
                type: ChannelType.GuildVoice,
                parent: category.id
              })

              await guildSchema.findByIdAndUpdate(interaction.guildId, {$set: { [`server.status_channels.players_online`]:channel2.id,[`server.status_channels.server_online`]:channel1.id}}, {new: true, upsert: true})
              
              interaction.reply({content: "Channels created!"})

            break;

            case "delete":
            {
               let guild = await guildSchema.findById(interaction.guildId)
               let channel1 = guild.server.status_channels.players_online 
               let channel2 = guild.server.status_channels.server_online
               if(channel1 && channel2 == 0) return interaction.reply({content: "There are no status channels for this guild"})
               let thang = await interaction.guild.channels.fetch(channel1.toString())
               let category = await interaction.guild.channels.fetch(thang.parentId)
               try {
                await interaction.guild.channels.delete(category.id, 'Command executed')
                await interaction.guild.channels.delete(channel1.toString(), 'Command executed')
                await interaction.guild.channels.delete(channel2.toString(), 'Command executed')
                await guildSchema.findByIdAndUpdate(interaction.guildId, {$set: { [`server.status_channels.players_online`]:0,[`server.status_channels.server_online`]:0}}, {new: true, upsert: true})
               }finally{
                interaction.reply({content: "Status channels removed, please use `/settings channels create` to make new ones!"})
               }
             
            }

           


            break

          }

        
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
