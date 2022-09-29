import { resolve } from "path";

export const projRoot = resolve(__dirname, "../");
export const pkgRoot = resolve(projRoot, "packages");
export const compRoot = resolve(pkgRoot, "components");
export const themeRoot = resolve(pkgRoot, "theme-chalk");
export const hookRoot = resolve(pkgRoot, "hooks");
export const localeRoot = resolve(pkgRoot, "locale");
export const directiveRoot = resolve(pkgRoot, "directives");
export const epRoot = resolve(pkgRoot, "element3");
export const utilRoot = resolve(pkgRoot, "utils");
export const buildOutput = resolve(projRoot, "dist");
export const docRoot = resolve(projRoot, "docs");
export const ePackage = resolve(epRoot, "package.json");
export const epOutput = resolve(buildOutput, "./");
