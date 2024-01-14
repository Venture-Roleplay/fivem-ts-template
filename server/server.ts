/* FiveM Typescript Boilerplate by Whitigol */
import config from "../util/config";
import json5 from "json5";

//! DO NOT TOUCH
const resourceName = GetCurrentResourceName();
const userConfig = LoadResourceFile(resourceName, "config.json5");
SaveResourceFile(
    resourceName,
    "internal/config.json",
    JSON.stringify(json5.parse(userConfig)),
    -1
);

//? Start your server script stuff here.
/* SERVER SCRIPT */
