const { SlashCommandBuilder } = require("discord.js");
const { serverSchema, guildSchema, mongo } = require("../util");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Setup your discord with a MC server")

    .addStringOption((option) =>
      option.setName("ip").setDescription("Your server IP").setRequired(true)
    )

    .addStringOption((option) =>
      option
        .setName("version")
        .setRequired(true)
        .setDescription(
          "The version of minecraft your server is running, Java or Bedrock"
        )
        .setChoices(
          { name: "Java", value: "Java" },
          { name: "Bedrock", value: "Bedrock" }
        )
    ),
  async execute(interaction) {
    await mongo().then(async (mongoose) => {
      try {
        let server = await serverSchema.findOne({
          ip: interaction.options.getString("ip"),
        });

        if (!server) {
          const server2 = new serverSchema({
            ip: interaction.options.getString("ip"),
            version: interaction.options.getString("version"),
          });

          server2.save().then(async (server) => {
            await guildSchema.findByIdAndUpdate(
              interaction.guildId,
              { $push: { servers: {_id: server._id, status_channels: [], status_channels_enabled: false } } },
              { new: true, upsert: true }
            );

            interaction.reply({ content: "Server linked to guild." });
          });
        } else if (server) {
          let guild = await guildSchema.findById(interaction.guildId);

          if (guild.servers.find(e => e._id == server._id))
            return interaction.reply("Server is already linked to this guild!");

          await guildSchema.findByIdAndUpdate(
            interaction.guildId,
            { $push: { servers: {_id: server._id, status_channels: [], status_channels_enabled: false } } },
            { new: true, upsert: true }
          );

          interaction.reply({ content: "Server linked to guild." });
        }
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
