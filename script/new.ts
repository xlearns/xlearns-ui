import fileSave from "file-save";
import { promises as fs } from "fs";
import { resolve, join } from "path";
import upperCamelCase from "uppercamelcase";
import MagicString from "magic-string";

const root = process.cwd();
const name = process.argv[2];
let upper_name, pgk_path, components_path, element3_path;

/**
 * @description init
 */

function init() {
	return new Promise((res, err) => {
		pgk_path = resolve(root, "packages");
		components_path = resolve(pgk_path, "components");
		element3_path = resolve(pgk_path, "element3");
		if (name) {
			upper_name = upperCamelCase(name);
			res(true);
		} else {
			err(new Error("name is undefined"));
		}
	});
}

/**
 * @description create mkdir and file
 */

function create(url, content) {
	fileSave(url).write(content, "utf8").end("\n");
}
/**
 * @description components index
 */

async function update_com_index() {
	let path = resolve(components_path, "index.ts");
	let indexText = await fs.readFile(path);
	const tp_com_index = `${indexText}export * from "./${name}";`;
	create(path, tp_com_index);
}
/**
 * @description element3 components index
 */
async function update_element_com() {
	let path = resolve(element3_path, "components.ts");
	let indexText = await fs.readFile(path);
	let text = String(indexText);
	let startIndex = text.indexOf("]");
	const s = new MagicString(text);
	s.overwrite(startIndex, startIndex + 1, `,El${upper_name}]`);
	s.prepend(`import { El${upper_name} } from "@element3/components/${name}";`);
	create(path, s.toString());
}

/**
 * @description components name
 */

function update_com_name_index() {
	const tp_com_name_index = `
  import { withInstall } from "@element3/utils";
  import ${upper_name} from "./src/${name}.vue";
  export const El${upper_name} = withInstall(${upper_name});
  export default El${upper_name};
  export * from "./src/${name}";
  `;
	create(resolve(components_path, `${name}/index.ts`), tp_com_name_index);
}

async function main() {
	try {
		await init();
		update_com_name_index();
		update_com_index();
	} catch (e) {
		console.log(e);
	}
}

// main();

async function test() {
	try {
		await init();
		update_element_com();
	} catch (e) {
		console.log(e);
	}
}
test();
