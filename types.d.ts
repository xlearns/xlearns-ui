
    declare module 'vue' {
      export interface GlobalComponents {
        Button: typeof import('snowball-ui')['Button'],
Container: typeof import('snowball-ui')['Container'],
Scrollbar: typeof import('snowball-ui')['Scrollbar']
      }
    }

    export {}
  