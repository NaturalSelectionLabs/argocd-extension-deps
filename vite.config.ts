import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const groupKind = "argoproj.io/Application";
const extName = "deps";

// https://vite.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": '"development"',
  },
  build: {
    lib: {
      entry: "./src/index.tsx",
      name: "tmp.extensions",
      fileName: () => `extensions-${extName}.js`,
      formats: ["umd"],
    },
    outDir: `dist/resources/${groupKind}`,
    rollupOptions: {
      // 对应 webpack 的 externals
      external: ["react", "react-dom", "moment"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          moment: "Moment",
        },
      },
    },
  },
  // 对应 webpack 的 resolve.extensions
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".ttf"],
  },
});
