const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser")
const babel = require("@rollup/plugin-babel")

module.exports = function () {
  return {
    input: "src/main.js",
    output: {
      file: "dist/bundle.iife.js",
      format: "iife", // immediately-invoked function expression — suitable for <script> tags
      globals: {
        globalThis: 'window'
      }
    //   sourcemap: true,
    },
    plugins: [
      resolve(), // tells Rollup how to find date-fns in node_modules
      commonjs(), // converts date-fns to ES modules
      babel({
        babelHelpers: 'bundled'
      }),
    //   terser(), // minify, but only in production
    ],
  };
};
