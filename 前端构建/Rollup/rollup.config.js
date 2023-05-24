
// import pkg from './package.json';
// import commonjs from '@rollup/plugin-commonjs'
// import resolve from '@rollup/plugin-node-resolve'

const pkg = require('./package.json')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')

module.exports = [
    {
        input: 'src/main.js',
        output: {
            name: 'testa',
            file: pkg.browser,
            format: 'umd'
        },
        plugins: [
            resolve(), // 从node_modules中查找模块
            commonjs() // 把 CommonJS 模块转成ES6
        ]
    },
    {
        input: 'src/main.js',
        external: [
            /node_modules/
        ], // 排除node_modules下面的包
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' }
        ]
    },
    {
        input: 'src/main.js',
        output: {
            name: 'test',
            globals: 'window',
            file: 'dist/test.iife.js',
            format: 'iife',
        },
    },
    {
        input: 'src/main.js',
        output: {
            file: 'dist/test.amd.js',
            format: 'amd',
        },
        plugins: [
            resolve(), // 从node_modules中查找模块
            commonjs() // 把 CommonJS 模块转成ES6
        ]
    }
]