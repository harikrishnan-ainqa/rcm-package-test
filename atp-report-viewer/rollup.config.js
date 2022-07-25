import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from "rollup-plugin-peer-deps-external";
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import css from "rollup-plugin-import-css";
import json from "@rollup/plugin-json";

export default {
	input:'src/index.js',
	output: [
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'esm' }
	],
	plugins: [
		css(),
        external(),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
			presets: ['@babel/preset-env','@babel/preset-react']
		}),
		json(),
		resolve(),
		commonjs(),
		terser(),
	],
	external: Object.keys(pkg.peerDependencies)
};