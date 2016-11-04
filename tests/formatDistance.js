
import test from 'ava';
import Geo from '../dist/geo';

test('1 meter => 1 kilometer', t => {
	const geo = new Geo({
		outputDistanceUnits: 'kilometer',
		outputDistancePrecision: 3
	});
	t.is(geo.formatDistance(1), 0.001);
});

test('1 meter => 1 meter', t => {
	const geo = new Geo({
		outputDistanceUnits: 'meter',
		outputDistancePrecision: 1
	});
	t.is(geo.formatDistance(1), 1);
});

test('1 meter => 1 league', t => {
	const geo = new Geo({
		outputDistanceUnits: 'league',
		outputDistancePrecision: 9
	});
	t.is(geo.formatDistance(1), 0.000179986);
});

test('1 meter => 1 mile', t => {
	const geo = new Geo({
		outputDistanceUnits: 'mile',
		outputDistancePrecision: 9
	});
	t.is(geo.formatDistance(1), 0.000621371);
});

test('1 meter => 1 yard', t => {
	const geo = new Geo({
		outputDistanceUnits: 'yard',
		outputDistancePrecision: 5
	});
	t.is(geo.formatDistance(1), 1.09361);
});

test('1 meter => 1 foot', t => {
	const geo = new Geo({
		outputDistanceUnits: 'foot',
		outputDistancePrecision: 5
	});
	t.is(geo.formatDistance(1), 3.28084);
});

test('1 meter => 1 inch', t => {
	const geo = new Geo({
		outputDistanceUnits: 'inch',
		outputDistancePrecision: 4
	});
	t.is(geo.formatDistance(1), 39.3701);
});

test('1 meter => 1 nautical-mile', t => {
	const geo = new Geo({
		outputDistanceUnits: 'nautical-mile',
		outputDistancePrecision: 9
	});
	t.is(geo.formatDistance(1), 0.000539957);
});

test('1 meter => 1 sheppey', t => {
	const geo = new Geo({
		outputDistanceUnits: 'sheppey',
		outputDistancePrecision: 11
	});
	t.is(geo.formatDistance(1), 0.00071428571);
});
