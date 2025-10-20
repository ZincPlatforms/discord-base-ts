import env from '@utils/env';
import { ShardingManager } from 'discord.js';
import colors from "colors";

console.log(colors.cyan("[Zinc]"), colors.green("Launching") + colors.white("..."));

const manager = new ShardingManager('src/impl/main.ts', { 
    token: env.get('CLIENT_TOKEN'),
});

manager.on('shardCreate', (shard) => {
    console.log(colors.cyan(`[Zinc]`), colors.green(`Launched shard`), colors.yellow(shard.id.toString()));
});

manager.spawn();