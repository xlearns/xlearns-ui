import fs from "fs";
import path from "path";
import * as rollup from "rollup";
import vue from "rollup-plugin-vue";
import css from "rollup-plugin-css-only";
import filesize from "rollup-plugin-filesize";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import { sync as globSync } from "fast-glob";
import { compRoot, buildOutput } from "./paths";

const outputDir = path.resolve(buildOutput, "./");

const plugins = [
  css(),
  vue({
    target: "browser",
  }),
  nodeResolve(),
  esbuild(),
];

async function getComponents() {
  const files = globSync("*", { cwd: compRoot, onlyDirectories: true });
  return files.map((file) => ({
    path: path.resolve(compRoot, file),
    name: file,
  }));
}

async function buildComponents() {
  const componentPaths = await getComponents();
  const builds = componentPaths.map(
    async ({ path: p, name: componentName }) => {
      const entry = path.resolve(p, "./index.ts");
      // 判断目录是否存在
      if (!fs.existsSync(entry)) return;

      const rollupConfig = {
        input: entry,
        plugins,
        external: ["vue"],
      };

      const bundle = await rollup.rollup(rollupConfig);

      await bundle.write({
        format: "es",
        file: `${outputDir}/es/components/${componentName}/index.js`,
      });

      await bundle.write({
        format: "cjs",
        file: `${outputDir}/lib/components/${componentName}/index.js`,
        exports: "named",
      });
    }
  );

  await Promise.all(builds);
}

// 入口
async function buildEntry() {
  const entry = path.resolve(compRoot, "index.ts");

  const config = {
    input: entry,
    plugins,
    external: () => true,
  };

  try {
    const bundle = await rollup.rollup(config);
    await bundle.write({
      format: "es",
      file: `${outputDir}/es/components/index.js`,
    });

    await bundle.write({
      format: "cjs",
      file: `${outputDir}/lib/components/index.js`,
    });
  } catch (e: any) {}
}

(async () => {
  await buildComponents();
  await buildEntry();
})();
