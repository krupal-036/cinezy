declare const _default: import("vite").UserConfig;
export default _default;

/// <reference types="vite/client" />

declare module '*.css' {
    const content: string;
    export default content;
}
