// rollup.config.mjs
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/featureCommentPayload.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "output",
  },
  plugins: [commonjs(), nodeResolve()],
};
