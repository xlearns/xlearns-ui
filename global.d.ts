declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    Button: typeof import("./dist/es")["ElButton"];
    Container: typeof import("./dist/es")["ElContainer"];
    GridLayout: typeof import("./dist/es")["ElGridLayout"];
    Layout: typeof import("./dist/es")["ElLayout"];
    Scrollbar: typeof import("./dist/es")["ElScrollbar"];
  }
}

export {};
