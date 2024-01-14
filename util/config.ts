import { Config } from "../config";
const config = JSON.parse(
    LoadResourceFile(GetCurrentResourceName(), "internal/config.json")
) as Config;

export default config;
