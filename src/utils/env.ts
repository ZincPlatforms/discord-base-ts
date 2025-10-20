import { config } from 'dotenv';
import { TOML } from 'bun';
import { readFile } from './fileSystem';
import type { ZincConfig } from '@/interfaces/zincConfig';
import parsed from './config';

class Environment {
    constructor(prod: boolean) {
        config({
            path: prod ? '.env' : '.env.dev',
            quiet: true
        });
    }

    public get(key: string, defaultValue?: string): string {
        return process.env[key] ?? defaultValue ?? '';
    }
}

const env = new Environment(parsed.project.bot_channel === 'production'); 

export default env;