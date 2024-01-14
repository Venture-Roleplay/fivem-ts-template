/* FiveM Typescript Boilerplate by Whitigol */

import esbuild from "esbuild";
import obfuscator from "javascript-obfuscator";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

if (process.env.NODE_ENV !== "development") {
    if (fs.readFileSync(`.dir`, "utf8") === "./out") {
        console.log("Please change the .dir file to your output directory.");
        process.exit(1);
    }
}

const OBFUSCATE = true;

const production =
    process.argv.findIndex((argItem) => argItem === "--mode=production") >= 0;

const onRebuild = (context) => {
    return async (err, res) => {
        if (err) {
            return console.error(`[${context}]: Rebuild failed`, err);
        }

        Finish(context);

        console.log(
            `[${context}]: Rebuild succeeded` +
                (res.warnings.length ? "Warnings: " + res.warnings : "")
        );
    };
};

const server = {
    platform: "node",
    target: ["node16"],
    format: "cjs",
};

const client = {
    platform: "browser",
    target: ["chrome93"],
    format: "iife",
};

for (const context of ["client", "server"]) {
    esbuild
        .build({
            bundle: true,
            entryPoints: [`${context}/${context}.ts`],
            outfile: `dist/${context}.js`,
            watch: production
                ? false
                : {
                      onRebuild: onRebuild(context),
                  },
            ...(context === "client" ? client : server),
        })
        .then(() => {
            Finish(context);

            console.log(`[${context}]: Built successfully!`);
        })
        .catch(() => process.exit(1));
}

function Finish(context) {
    if (OBFUSCATE) {
        const code = fs.readFileSync(`dist/${context}.js`, "utf8");
        const obfuscatedCode = obfuscator.obfuscate(code, {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            debugProtection: false,
            disableConsoleOutput: false,
        });

        fs.writeFileSync(
            `dist/${context}.js`,
            obfuscatedCode.getObfuscatedCode()
        );
    }

    const dir = fs.readFileSync(`.dir`, "utf8");

    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    fs.copyFileSync(`config.json`, `${dir}/config.json`);
    fs.copyFileSync(`fxmanifest.lua`, `${dir}/fxmanifest.lua`);
    fs.existsSync(`${dir}/dist`) &&
        fs.rmSync(`${dir}/dist`, { recursive: true });
    fs.mkdirSync(`${dir}/dist`);
    fs.copyFileSync(`dist/client.js`, `${dir}/dist/client.js`);
    fs.copyFileSync(`dist/server.js`, `${dir}/dist/server.js`);

    if (fs.existsSync(`stream`)) {
        fs.existsSync(`${dir}/stream`) &&
            fs.rmSync(`${dir}/stream`, { recursive: true });
        fs.mkdirSync(`${dir}/stream`);

        const copyStreamFiles = (dir, target) => {
            fs.readdirSync(dir).forEach((file) => {
                const filePath = `${dir}/${file}`;
                const targetPath = `${target}/${file}`;
                if (fs.lstatSync(filePath).isDirectory()) {
                    fs.mkdirSync(targetPath);
                    copyStreamFiles(filePath, targetPath);
                } else {
                    fs.copyFileSync(filePath, targetPath);
                }
            });
        };

        copyStreamFiles("stream", `${dir}/stream`);
    }

    if (fs.existsSync("nui")) {
        fs.existsSync(`${dir}/nui`) &&
            fs.rmSync(`${dir}/nui`, { recursive: true });
        fs.mkdirSync(`${dir}/nui`);

        const copyNuiFiles = (dir, target) => {
            fs.readdirSync(dir).forEach((file) => {
                const filePath = `${dir}/${file}`;
                const targetPath = `${target}/${file}`;
                if (fs.lstatSync(filePath).isDirectory()) {
                    fs.mkdirSync(targetPath);
                    copyNuiFiles(filePath, targetPath);
                } else {
                    fs.copyFileSync(filePath, targetPath);
                }
            });
        };

        copyNuiFiles("nui", `${dir}/nui`);
    }

    if (fs.existsSync("data")) {
        fs.existsSync(`${dir}/data`) &&
            fs.rmSync(`${dir}/data`, { recursive: true });
        fs.mkdirSync(`${dir}/data`);

        const copyDataFiles = (dir, target) => {
            fs.readdirSync(dir).forEach((file) => {
                const filePath = `${dir}/${file}`;
                const targetPath = `${target}/${file}`;
                if (fs.lstatSync(filePath).isDirectory()) {
                    fs.mkdirSync(targetPath);
                    copyDataFiles(filePath, targetPath);
                } else {
                    fs.copyFileSync(filePath, targetPath);
                }
            });
        };

        copyDataFiles("data", `${dir}/data`);
    }
}
