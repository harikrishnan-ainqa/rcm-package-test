import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from "rollup-plugin-peer-deps-external";
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default {
	input: 'src/index.js',
	output: [
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'esm' }
	],
	plugins: [
		external(),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
			presets: ['@babel/preset-env', '@babel/preset-react']
		}),
		resolve(),
		commonjs(),
		terser(),
		json()
	],
	external: Object.keys(pkg.peerDependencies)
};