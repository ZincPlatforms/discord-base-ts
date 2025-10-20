import type ZincClient from "@/structs/client";
import type { Message } from "discord.js";
import config from "@utils/config";
import { validatePattern } from "@/utils/regexify";
import { getEmbed } from "@/utils/embeds";

export default {
    async execute(client: ZincClient, message: Message) {
        if(!message.content.startsWith(config.settings.prefix)) return;
        const [command, ...args] = message.content.slice(config.settings.prefix.length).trim().split(/ +/);
        
        const result = client.getCommand(command ?? "");
        if(!result.success) return;

        const cmd = result.data!;
        if(!cmd.command.prefixedCommand || !cmd.command.executePrefixed) return;

        if(cmd.command.developerOnly && !config.ids.bot_devs.includes(message.author.id)) return;
        if(cmd.command.ownerOnly && message.author.id !== config.ids.bot_owner) return;

        if(cmd.command.prefixedData) {
            const usage = cmd.command.prefixedData.usage;
            const pattern = validatePattern(usage);
            const result = pattern.test(message.content);

            if(!result) {
                const embed = getEmbed(cmd.command.prefixedData.usageEmbedID);
                await message.reply({
                    embeds: [embed]
                });
                return;
            }
        }

        try {
            await cmd.command.executePrefixed(message, {
                usedCommandVariant: "prefixed",
            }, ...args);
        } catch (error) {
            console.error('Error executing prefixed command:', error);
        }
    }
};