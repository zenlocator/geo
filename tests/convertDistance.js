
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo({
	distancePrecision: 8
});

test('10 meters to miles', t => t.deepEqual(geo.convertDistance(10, 'METERS', 'MILES'), 0.00621371));
test('10 meters to miles', t => t.deepEqual(geo.convertDistance('10', 'METERS', 'MILES'), 0.00621371));
test('37 yards to inches', t => t.deepEqual(geo.convertDistance(37, 'YARDS', 'INCHES'), 1332.01691661));
test('128 miles to kilometers', t => t.deepEqual(geo.convertDistance(128, 'MILES', 'KILOMETERS'), 205.996032));
