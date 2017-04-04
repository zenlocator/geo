#!/usr/bin/env node

var program = require('commander');
var pkg = require('./package.json');

var Geo = require('./dist/geo'),
	g = new Geo();

program
	.version(pkg.version)
	.command('is-valid-lat <latitude>', 'test if latitude is valid')
	.command('is-valid-lng <longitude>', 'test if longitude is valid')
	.parse(process.argv);

/* print results */

console.log(program);

if (program.hasOwnProperty('isValidLat')) {
	console.log(program.isValidLat ? 'valid' : 'invalid');
} else if (program.hasOwnProperty('isValidLng')) {
	console.log(program.isValidLng ? 'valid' : 'invalid');
} else {
	program.help();
}
