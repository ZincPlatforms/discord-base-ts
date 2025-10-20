import type { Command } from "@/interfaces/command";

const command = {
    name: "ping",
    description: "Pong!",
    aliases: [],
    
    prefixedCommand: true,
    prefixedData: {
        usageEmbedID: "ping-usage",
    },

    async executePrefixed(message) {
        await message.reply("Pong!");
    }
} as Command;

export default command;