import { GatewayIntentBits, Client, Events } from "discord.js";
import env from "@utils/env";
import fs from "fs";
import type { commandEntry } from "@/interfaces/commandEntry";
import colors from "colors"
import type { Result } from "@/interfaces/result";

class ZincClient extends Client {
    private commands: commandEntry[] = [];
    private clientToken: string = env.get('CLIENT_TOKEN');
    constructor() {
        super({
            intents: [
                Object.keys(GatewayIntentBits).map(key => GatewayIntentBits[key as keyof typeof GatewayIntentBits]),
            ]
        })
        this.init();
    }

    public getCommand(name: string): Result<commandEntry> {
        const data = this.commands.find(cmd => cmd.command.name === name || cmd.command.aliases.includes(name))!;
        if(data){
            return {
                success: true,
                data: data,
            }
        } else {
            return {
                success: false,
                error: `Command '${name}' not found.`,
            }
        }
    }
    
    private async init(){
        await this.loadCommands();
        await this.loadEvents();
    }

    private async loadCommands(){
        console.log(colors.cyan("[Zinc]"), colors.green("Loading commands") + colors.white("..."));
        const cmds = fs.readdirSync('./src/commands/')
        
        for(const dir of cmds){
            const commandFiles = fs.readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.ts'));
            let i = 0;
            for (const file of commandFiles) {
                const command = await import(`@commands/${dir}/${file}`);
                let newCmd = function(){
                    return `\t- ${colors.yellow(command.default.name)} ${colors.green(`[@commands/${dir}/${file}]`)}`;
                }
                
                this.commands.push({
                    id: i,
                    path: `@commands/${dir}/${file}`,
                    command: command.default,
                })
    
                console.log(newCmd());
                i++;
            }
        }
    }

    private async loadEvents(){
        console.log(colors.cyan("[Zinc]"), colors.green("Loading events") + colors.white("..."));
        const evt = fs.readdirSync('./src/events/')
        for(const file of evt){
            if (file.endsWith('.ts')) {
                const event = await import(`@events/${file}`);
                const eventName = file.split('.')[0];
                this.on(eventName as keyof typeof Events, (...args) => event.default.execute(this,...args));
                console.log(`\t- ${colors.yellow(eventName!)} ${colors.green(`[@events/${file}]`)}`);
            }
        }
    }

    public run(){
        this.login(this.clientToken);
    }
}

export default ZincClient;