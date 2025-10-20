import Database from "@/database";
import type ZincClient from "@/structs/client";
import colors from "colors"

export default {
    execute(client: ZincClient) {
        console.log(colors.cyan("[Zinc]"), colors.green("Client Connected"), colors.white("[") + colors.yellow(client.user!.tag) + colors.white("]"));
        new Database();
    }
}