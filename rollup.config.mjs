import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/cjs/index.js',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: 'dist/esm/index.js',
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            json({
                compact: true,
                preferConst: true,
                namedExports: false
            }),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss(),
            copy({
                targets: [{ src: 'src/fonts', dest: 'dist/' }],
            }),
            terser(),
        ],
        external: ['react', 'react-dom'],
    },
    /* {
        input: 'src/index.ts',
        output: [{ file: 'dist/types.d.ts', format: 'es' }],
        plugins: [dts()],
    }, */
]
