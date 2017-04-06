
import test from 'ava';
import Geo from '../dist/geo';

test('1 meter => 1 kilometer', t => {
	const geo = new Geo({
		distanceUnits: 'KILOMETERS',
		distancePrecision: 3
	});
	t.is(geo.formatDistance(1), 0.001);
});

test('1 meter => 1 meter', t => {
	const geo = new Geo({
		distanceUnits: 'METERS',
		distancePrecision: 1
	});
	t.is(geo.formatDistance(1), 1);
});

test('1 meter => 1 league', t => {
	const geo = new Geo({
		distanceUnits: 'LEAGUES',
		distancePrecision: 9
	});
	t.is(geo.formatDistance(1), 0.000179986);
});

test('1 meter => 1 mile', t => {
	const geo = new Geo({
		distanceUnits: 'MILES',
		distancePrecision: 9
	});
	t.is(geo.formatDistance(1), 0.000621371);
});

test('1 meter => 1 yard', t => {
	const geo = new Geo({
		distanceUnits: 'YARDS',
		distancePrecision: 5
	});
	t.is(geo.formatDistance(1), 1.09361);
});

test('1 meter => 1 foot', t => {
	const geo = new Geo({
		distanceUnits: 'FEET',
		distancePrecision: 5
	});
	t.is(geo.formatDistance(1), 3.28084);
});

test('1 meter => 1 inch', t => {
	const geo = new Geo({
		distanceUnits: 'INCHES',
		distancePrecision: 4
	});
	t.is(geo.formatDistance(1), 39.3701);
});

test('1 meter => 1 nautical-mile', t => {
	const geo = new Geo({
		distanceUnits: 'NAUTICAL_MILES',
		distancePrecision: 9
	});
	t.is(geo.formatDistance(1), 0.000539957);
});

test('1 meter => 1 sheppey', t => {
	const geo = new Geo({
		distanceUnits: 'SHEPPEYS',
		distancePrecision: 11
	});
	t.is(geo.formatDistance(1), 0.00071428571);
});
