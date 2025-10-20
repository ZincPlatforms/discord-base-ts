import type { Command } from "@/interfaces/command";
import config from "@/utils/config";

const command = {
    name: "ping",
    description: "Pong!",
    aliases: [],
    
    prefixedCommand: true,
    prefixedData: {
        usageEmbedID: "ping-usage",
        usage: config.settings.prefix + "ping"
    },

    async executePrefixed(message) {
        await message.reply("Pong!");
    }
} as Command;

export default command;