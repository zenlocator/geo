
import babel from 'rollup-plugin-babel';

export default {
	moduleName: 'Geo',
	format: 'umd',
	entry: 'lib/index.js',
	plugins: [
		babel()
	],
	format: 'umd'
};
