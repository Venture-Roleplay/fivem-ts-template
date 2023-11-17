/* FiveM Typescript Boilerplate by Whitigol */

const esbuild = require("esbuild");
const obfuscator = require("javascript-obfuscator");
const fs = require("fs");

const OBFUSCATE = true;

const production =
    process.argv.findIndex((argItem) => argItem === "--mode=production") >= 0;

const onRebuild = (context) => {
    return async (err, res) => {
        if (err) {
            return console.error(`[${context}]: Rebuild failed`, err);
        }

        console.log(`[${context}]: Rebuild succeeded, warnings:`, res.warnings);
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
            console.log(`[${context}]: Built successfully!`);
        })
        .catch(() => process.exit(1));
}
