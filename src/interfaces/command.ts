import type { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import type { PrefixedData } from "./PrefixedData";

export interface Command {
    name: string;
    description: string;
    aliases: string[];

    slashCommand?: boolean;
    slashData?: SlashCommandBuilder;

    prefixedCommand?: boolean;
    prefixedData?: {
        usageEmbedID: string;
        usage: string;
    };

    developerOnly?: boolean;
    ownerOnly?: boolean;

    hideFromHelp?: boolean;

    executeSlash?(interaction: ChatInputCommandInteraction): Promise<any>;
    executePrefixed?(message: Message, data: PrefixedData, ...args: any[]): Promise<any>;
};