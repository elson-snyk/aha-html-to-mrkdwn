import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/aha/comment/feature.js",
  output: {
    file: "dist/comment-feature.js",
    format: "iife",
    name: "output",
  },
  plugins: [commonjs(), nodeResolve()],
};
