import { Config } from "../config";
const config = JSON.parse(
    LoadResourceFile(GetCurrentResourceName(), "config.json")
) as Config;

export default config;
