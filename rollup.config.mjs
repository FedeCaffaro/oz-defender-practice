import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import yaml from "@rollup/plugin-yaml";
import builtins from "builtin-modules";

const config = [
  {
    input: "src/actions/detect-new-markets/index.ts",
    output: {
      file: "dist/actions/detect-new-markets/index.js",
      format: "cjs",
    },
    plugins: [
      resolve({ preferBuiltins: true }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
    external: [
      ...builtins,
      "ethers",
      "@openzeppelin/defender-sdk",
      "@openzeppelin/defender-sdk-action-client",
      "dotenv",
    ],
  },
];

export default config;
