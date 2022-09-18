import type { Plugin } from "vue";

const INSTALLED_KEY = Symbol("INSTALLED_KEY");
const version = "0.0.0";

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: any) => {
    if (app[INSTALLED_KEY]) return;
    app[INSTALLED_KEY] = true;
    components.forEach((c) => app.use(c));
  };

  return {
    version,
    install,
  };
};
