import env from "@/utils/env";
import mongoose from "mongoose";
import colors from "colors";

class Database {
    constructor() {
        this.connect();
    }

    private async connect() {
        const url = env.get('DATABASE_URL');
        
        await mongoose.connect(url, {} as mongoose.ConnectOptions);
        console.log(colors.cyan(`[Zinc]`), colors.green("Database Connected") + colors.white("!"));
    }
}

export default Database;