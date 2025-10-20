export interface ZincConfig {
    project: {
        bot_name: string;
        bot_version: string;
        bot_channel: string;
    };

    ids: {
        bot_owner: string;
        bot_devs: string[];
        bot_build: number;
    };

    settings: {
        prefix: string;
    };
};