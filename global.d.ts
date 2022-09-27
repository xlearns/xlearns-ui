declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ElButton: typeof import("snowball-ui")["ElButton"];
  }
}

export {};
