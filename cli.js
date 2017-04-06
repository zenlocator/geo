#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var pkg = require('./package.json');

var Geo = require('./dist/geo'),
	defaultGeo = new Geo();

function distanceUnitsRegex() {

	var distanceUnits = Object.keys(defaultGeo.distanceUnits).map(function(v) {
		return v.toLowerCase()
	}).join('|');

	return new RegExp('^('+distanceUnits+')$', 'i');

}

function formatCoords(coords) {
	coords = coords.split(',');
	return {
		lat: coords[0],
		lng: coords[1]
	};
}

function geo(options) {

	var opts = {};
	var keys = [
		'distanceUnits',
		'distancePrecision',
		'coordsFormat',
		'coordsPrecision'
	];

	var i;
	for (i = 0; i !== keys.length; i++) {
		opts[keys[i]] = options.parent[keys[i]];
	}

	return new Geo(opts);

}

program
	.version(pkg.version)
	.option('-du, --distance-units <units>', chalk.dim('output distance units: "meters", "feet", etc (eg: '+chalk.bold('-du miles')+')'), distanceUnitsRegex())
	.option('-dp, --distance-precision <format>', chalk.dim('round distance to these digits (eg: '+chalk.bold('-dp 3')+')'), /\d+/)
	.option('-cf, --coords-format <digits>', chalk.dim('output format of coordinates (eg: '+chalk.bold('-cf dms')+')'), /^(dms|dm|dd|d)$/i)
	.option('-cp, --coords-precision <digits>', chalk.dim('round coordinates to these digits (eg: '+chalk.bold('-cp 6')+')'), /\d+/);

/* convertDistance */

program
	.command('convert-distance <distance> <from-units> <to-units>')
	.description(chalk.dim('convert distance description'))
	.action(function(distance, fromUnits, toUnits, options) {
		console.log(geo(options).convertDistance(distance, fromUnits, toUnits));
	});

/* formatBounds */

program
	.command('format-bounds <coords1> <coords2>')
	.description(chalk.dim('returns 4 bounds coordinates (southwest, northeast, etc) from two specified points'))
	.option('-f, --format [mode]', 'Output format mode: json, list', /^(json|list)$/i)
	.action(function(coords1, coords2, options) {

		var bounds = geo(options).formatBounds([
			formatCoords(coords1),
			formatCoords(coords2)
		]);

		var format = options.format || 'json';
		if (format === 'list') {

			bounds = bounds.sw.lat+','+bounds.sw.lng+' '+
				bounds.nw.lat+','+bounds.nw.lng+' '+
				bounds.ne.lat+','+bounds.ne.lng+' '+
				bounds.se.lat+','+bounds.se.lng;

		}

		console.log(bounds);

	});

/* formatCoord */

program
	.command('format-coord <coord> [is-lat]')
	.description(chalk.dim('formats coordinate according to ')+'--coords-format'+chalk.dim(' option'))
	.action(function(coord, isLat, options) {

		coords = coord.split(',');

		if (isLat === 'false') {
			isLat = false;
		} else {
			isLat = !!isLat;
		}

		console.log(geo(options).formatCoord(coord, isLat));

	});

/* formatCoords */

program
	.command('format-coords <coords>')
	.description(chalk.dim('formats coordinates according to ')+'--coords-format'+chalk.dim(' option'))
	.option('-f, --format [mode]', 'Output format mode: json, list', /^(json|list)$/i)
	.action(function(coords, options) {

		coords = formatCoords(coords);
		coords = geo(options).formatCoords(coords);

		var format = options.format || 'json';
		if (format === 'list') {
			coords = coords.lat+','+coords.lng;
		}

		console.log(coords);

	});

/* formatDistance */

program
	.command('format-distance <meters> [distance-units]')
	.description(chalk.dim('formats distance according to ')+'--distance-units'+chalk.dim(' option'))
	.action(function(meters, distanceUnits, options) {
		console.log(geo(options).formatDistance(meters, distanceUnits));
	});

/* getCenter */

program
	.command('get-center [coords...]')
	.description(chalk.dim('calculates center of provided coordinates'))
	.option('-f, --format [mode]', 'Output format mode: json, list', /^(json|list)$/i)
	.action(function(coords, options) {

		var coordsArray = coords.map(function(c) {
			return formatCoords(c);
		});

		var center = geo(options).getCenter(coordsArray);

		var format = options.format || 'json';
		if (format === 'list') {
			center = center.lat+','+center.lng;
		}

		console.log(center);

	});

/* getClosest */

program
	.command('get-closest <coords> [coords...]')
	.description(chalk.dim('returns closest coordinate to the ')+'coords'+chalk.dim(' point'))
	.option('-f, --format [mode]', 'Output format mode: json, list', /^(json|list)$/i)
	.action(function(center, coords, options) {

		center = formatCoords(center);

		var coordsArray = coords.map(function(c) {
			return formatCoords(c);
		});

		var closest = geo(options).getClosest(center, coordsArray);

		var format = options.format || 'json';
		if (format === 'list') {
			closest = closest.lat+','+closest.lng;
		}

		console.log(closest);

	});

/* getDestinationPoint */

program
	.command('get-destination-point <coords> <distance> <bearing> [radius]')
	.description(chalk.dim('calculates destination point given initial coordinate, distance in meters and bearing'))
	.option('-f, --format [mode]', 'Output format mode: json, list', /^(json|list)$/i)
	.action(function(coords, distance, bearing, radius, options) {

		coords = formatCoords(coords);

		distance = parseInt(distance, 10);
		bearing = parseInt(bearing, 10);

		var destinationPoint = geo(options).getDestinationPoint(coords, distance, bearing, radius);

		var format = options.format || 'json';
		if (format === 'list') {
			destinationPoint = destinationPoint.lat+','+destinationPoint.lng;
		}

		console.log(destinationPoint);

	});

/* getDistance */

program
	.command('get-distance <coords1> <coords2>')
	.description(chalk.dim('calculates distance (according to ')+'--distance-units'+chalk.dim(') between two points'))
	.action(function(coords1, coords2, options) {

		coords1 = formatCoords(coords1);
		coords2 = formatCoords(coords2);

		console.log(geo(options).getDistance(coords1, coords2));

	});

/* isPointInBounds */

program
	.command('is-point-in-bounds <coords> <bounds1> <bounds2>')
	.description(chalk.dim('returns ')+'true'+chalk.dim(' if coodinate is between provided bounds'))
	.action(function(coords, bounds1, bounds2, options) {

		coords = formatCoords(coords);
		bounds1 = formatCoords(bounds1);
		bounds2 = formatCoords(bounds2);

		console.log(geo(options).isPointInBounds(coords, [
			bounds1,
			bounds2
		]));

	});

/* isPointInCircle */

program
	.command('is-point-in-circle <coords> <center> <meters>')
	.description(chalk.dim('returns ')+'true'+chalk.dim(' if coordinate is in the circle'))
	.action(function(coords, center, meters, options) {

		coords = formatCoords(coords);
		center = formatCoords(center);

		meters = parseInt(meters, 10);

		console.log(geo(options).isPointInCircle(coords, center, meters));

	});

/* isValidLat */

program
	.command('is-valid-lat <lat>')
	.description(chalk.dim('returns ')+'true'+chalk.dim(' if coordinate is a validate latitude'))
	.action(function(lat, options) {
		console.log(geo(options).isValidLat(lat));
	});

/* isValidLng */

program
	.command('is-valid-lng <lng>')
	.description(chalk.dim('returns ')+'true'+chalk.dim(' if coordinate is a validate longitude'))
	.action(function(lng, options) {
		console.log(geo(options).isValidLng(lng));
	});

/* orderByDistance */

program
	.command('order-by-distance <center> [coords...]')
	.option('-f, --format [mode]', 'Output format mode: json, list', /^(json|list)$/i)
	.description(chalk.dim('orders points by distance, first being closest to ')+'center')
	.action(function(center, coords, options) {

		center = formatCoords(center);

		var coordsArray = coords.map(function(c) {
			return formatCoords(c);
		});

		var ordered = geo(options).orderByDistance(center, coordsArray);

		var format = options.format || 'json';
		if (format === 'list') {

			ordered = ordered.map(function(coord) {
				return coord.lat+','+coord.lng
			}).join(' ');

		}

		console.log(ordered);

	});

program.parse(process.argv);
