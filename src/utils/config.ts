import { TOML } from "bun";
import { readFile } from "./fileSystem";
import type { ZincConfig } from "@/interfaces/zincConfig";

const content = readFile("zinc.toml");
const config = TOML.parse(content) as ZincConfig;

export default config;