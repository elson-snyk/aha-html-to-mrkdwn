import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/aha/comment/idea.js",
  output: {
    file: "dist/comment-idea.js",
    format: "iife",
    name: "output",
  },
  plugins: [commonjs(), nodeResolve()],
};
