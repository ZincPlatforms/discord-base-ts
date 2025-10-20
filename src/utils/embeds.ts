import { EmbedBuilder } from "discord.js";

const embeds: Record<string, EmbedBuilder> = {
    "usage-ping": new EmbedBuilder()
        .setTitle("Usage: ping")
        .setDescription("Usage: `!ping`\n\nReplies with 'Pong!' to test the bot's responsiveness.")
};

export function getEmbed(id: string) {
    return embeds[id] ?? new EmbedBuilder().setTitle("Embed Not Found").setDescription("The requested embed does not exist.");
}