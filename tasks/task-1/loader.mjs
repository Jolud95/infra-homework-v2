import fs from "fs/promises";
import yaml from "yaml";
import { fileURLToPath } from "node:url";

export async function load(url, context, nextLoad) {
    if (url.endsWith(".yml") || url.endsWith(".yaml")) {
        const filepath = fileURLToPath(url);
        const source = await fs.readFile(filepath, "utf8");
        const parsed = yaml.parse(source);

        return {
            format: "module",
            source: `export default ${JSON.stringify(parsed)};`,
            shortCircuit: true
        };
    }

    return nextLoad(url, context);
}