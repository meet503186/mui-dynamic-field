import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import dts from "rollup-plugin-dts";

const extensions = [".ts", ".tsx"];

export default [
  // ESM build (preserveModules)
  {
    input: "src/index.ts",
    output: {
      dir: "dist/esm",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.node.json",
        jsx: "preserve",
      }),
      babel({
        babelHelpers: "bundled",
        extensions,
        exclude: "node_modules/**",
        presets: [
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
      }),
    ],
  },

  // CJS build
  {
    input: "src/index.ts",
    output: {
      file: "dist/mui-dynamic-field.cjs",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.node.json",
        jsx: "preserve",
      }),
      babel({
        babelHelpers: "bundled",
        extensions,
        exclude: "node_modules/**",
        presets: [
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
      }),
    ],
  },

  // Types: generate .d.ts files per module
  {
    input: "src/index.ts",
    output: {
      dir: "dist/types",
      format: "es",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: [dts()],
  },
];
