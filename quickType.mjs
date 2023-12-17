import fs from "fs";
import json5 from "json5";
import path from "path";
import quicktype from "quicktype-core";

async function Generate() {
    const jsonString = JSON.stringify(
        json5.parse(
            fs.readFileSync(path.join(process.cwd(), "config.json5"), "utf8")
        )
    );
    const jsonInput = quicktype.jsonInputForTargetLanguage("typescript");
    await jsonInput.addSource({
        name: "config",
        samples: [jsonString],
    });
    const inputData = new quicktype.InputData();
    inputData.addInput(jsonInput);
    const result = await quicktype.quicktype({
        inputData,
        lang: "typescript",
        rendererOptions: {
            "just-types": "true",
        },
    });
    const output = result.lines.join("\n");
    fs.writeFileSync(path.join(process.cwd(), "config.d.ts"), output);
}

Generate();
