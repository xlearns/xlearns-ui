import fs from "fs";
import path from "path";
import { toCapitalCase, log } from "@element3/utils";
import { components } from "@element3/build";
import { projRoot } from "@element3/build";
const typesPath = path.resolve(projRoot, "types.d.ts");

main();
async function main() {
	const types = `
    declare module 'vue' {
      export interface GlobalComponents {
        ${components
					.map(
						(name) =>
							`${toCapitalCase(
								name
							)}: typeof import('snowball-ui')['${toCapitalCase(name)}']`
					)
					.join(",\n")}
      }
    }

    export {}
  `;

	await fs.writeFileSync(typesPath, types, "utf-8");

	log("types.d.ts生成完成", "green");
}
