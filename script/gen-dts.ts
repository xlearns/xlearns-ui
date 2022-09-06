import { Project } from "ts-morph";
import type { CompilerOptions, SourceFile } from "ts-morph";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { projRoot, pkgRoot, epRoot, buildOutput } from "@element3/build";
import { log, excludeFiles } from "@element3/utils";
import glob from "fast-glob";
import { parse, compileScript } from "@vue/compiler-sfc";

/**
 * fork = require( https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */

let index = 1;
const outDir = path.resolve(buildOutput, "types");
const main = async () => {
	// 覆盖tsconfig.json
	const compilerOptions: CompilerOptions = {
		emitDeclarationOnly: true,
		outDir,
		declaration: true,
		noEmitOnError: true,
		allowJs: true,
		baseUrl: projRoot,
		preserveSymlinks: true,
		skipLibCheck: true,
		noImplicitAny: false,
	};

	const project = new Project({
		compilerOptions,
		tsConfigFilePath: path.resolve(projRoot, "tsconfig.web.json"),
		skipAddingFilesFromTsConfig: true,
	});

	const sourceFiles = await addSourceFiles(project);
	typeCheck(project);
	log("Type check passed!", "blue");

	await project.emit({
		emitOnlyDtsFiles: true,
	});

	build(sourceFiles);
};
// 输出解析过程中的错误信息
function typeCheck(project: Project) {
	const diagnostics = project.getPreEmitDiagnostics();
	if (diagnostics.length > 0) {
		log(project.formatDiagnosticsWithColorAndContext(diagnostics));
		const err = new Error("Failed to generate dts.");
		log(project.formatDiagnosticsWithColorAndContext(diagnostics));

		throw err;
	}
}

async function addSourceFiles(project: Project) {
	project.addSourceFileAtPath(path.resolve(projRoot, "typings/env.d.ts"));

	const globSourceFile = "**/*.{js?(x),ts?(x),vue}";

	const filePaths = excludeFiles(
		await glob([globSourceFile, "!element3/**/*"], {
			cwd: pkgRoot,
			absolute: true,
			onlyFiles: true,
		})
	);
	const epPaths = excludeFiles(
		await glob(globSourceFile, {
			cwd: epRoot,
			onlyFiles: true,
		})
	);
	const sourceFiles: SourceFile[] = [];
	await Promise.all([
		...filePaths.map(async (file) => {
			if (file.endsWith(".vue")) {
				const content = await readFile(file, "utf-8");

				// 是否全局忽略ts
				const hasTsNoCheck = content.includes("@ts-nocheck");
				// vue -> ast
				const sfc = parse(content);

				const { script, scriptSetup } = sfc.descriptor;

				if (script || scriptSetup) {
					/**
					 * @description
					 *  如果全局忽略 则不做任何处理
					 *  script?.content script内容
					 */
					let content =
						(hasTsNoCheck ? "// @ts-nocheck\n" : "") + (script?.content ?? "");

					if (scriptSetup) {
						const compiled = compileScript(sfc.descriptor, {
							id: `${index++}`,
						});

						content += compiled.content;
					}

					const lang = scriptSetup?.lang || script?.lang || "js";

					const URL = `${path.relative(process.cwd(), file)}.${lang}`;

					const F = project.createSourceFile(URL, content);

					sourceFiles.push(F);
				}
			} else {
				const sourceFile = project.addSourceFileAtPath(file);

				sourceFiles.push(sourceFile);
			}
		}),
		...epPaths.map(async (file) => {
			const content = await readFile(path.resolve(epRoot, file), "utf-8");
			sourceFiles.push(
				project.createSourceFile(path.resolve(pkgRoot, file), content)
			);
		}),
	]);

	return sourceFiles;
}

async function build(sourceFiles) {
	const Tasks = sourceFiles.map(async (sourceFile) => {
		const emitOutput = sourceFile.getEmitOutput();
		const emitFiles = emitOutput.getOutputFiles();
		const subTasks = emitFiles.map(async (outputFile) => {
			const filepath = outputFile.getFilePath();
			await mkdir(path.dirname(filepath), {
				recursive: true,
			});
			await writeFile(filepath, outputFile.getText(), "utf8");
		});
		await Promise.all(subTasks);
	});
	await Promise.all(Tasks);
}

main();
