declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    Button: typeof import("./dist/es")["ElButton"];
    Container: typeof import("./dist/es")["ElContainer"];
    Scrollbar: typeof import("./dist/es")["ElScrollbar"];
  }
}

export {};
