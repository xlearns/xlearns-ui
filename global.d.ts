declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    AbsoluteLayout: typeof import("./dist/es")["ElAbsoluteLayout"];
    Button: typeof import("./dist/es")["ElButton"];
    Col: typeof import("./dist/es")["ElCol"];
    Container: typeof import("./dist/es")["ElContainer"];
    GridLayout: typeof import("./dist/es")["ElGridLayout"];
    Layout: typeof import("./dist/es")["ElLayout"];
    Row: typeof import("./dist/es")["ElRow"];
    Scrollbar: typeof import("./dist/es")["ElScrollbar"];
  }
}

export {};
