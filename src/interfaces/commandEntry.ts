import type { Command } from "./command";

export interface commandEntry {
    id: number;
    path: string;

    command: Command;
};