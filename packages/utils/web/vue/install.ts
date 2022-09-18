import type { App } from "vue";

export function withInstall(com: Record<string, any>) {
  com.install = function (app: App) {
    app.component(com.name, com);
  };
  return com;
}
