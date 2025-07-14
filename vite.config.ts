import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
      include: ["src"],
      outDir: "dist/types",
      tsconfigPath: "./tsconfig.node.json",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "MuiDynamicField",
      fileName: "mui-dynamic-field",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@mui/material",
        "@mui/icons-material",
        "@emotion/react",
        "@emotion/styled",
        "mui-file-uploader",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@mui/material": "MaterialUI",
          "@mui/icons-material": "MaterialUIIcons",
          "@emotion/react": "EmotionReact",
          "@emotion/styled": "EmotionStyled",
          "mui-file-uploader": "MuiFileUploader",
        },
      },
    },
  },
});
