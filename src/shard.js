require("./deploy-commands")();

require("dotenv").config();

const { ShardingManager } = require("discord.js")

const chalk = require("chalk")

const shards = new ShardingManager("./src/index.js", {
    token: process.env.BOT_TOKEN,
    totalShards: "auto",
    respawn: true,
   
});

shards.on("shardCreate", async shard => {
    await console.log(chalk.cyan(`[ShardManager]: `) + chalk.white(`Launched shard #${shard.id}, Ready!`))
})


shards.spawn(shards.totalShards)