
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
            name: 'test',
            file: pkg.browser,
            format: 'umd'
        },
        plugins: [
            resolve(), // so Rollup can find `ms`
            commonjs() // so Rollup can convert `ms` to an ES module
        ]
    },
    {
        input: 'src/main.js',
        // external: ['lodash'],
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' }
        ]
    }
]