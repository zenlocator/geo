
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo();

test('-180', t => t.is(geo.isValidLat(-180), false));
test('-90.1', t => t.is(geo.isValidLat(-90.1), false));
test('-90', t => t.is(geo.isValidLat(-90), true));
test('-45', t => t.is(geo.isValidLat(-45), true));
test('0', t => t.is(geo.isValidLat(0), true));
test('45', t => t.is(geo.isValidLat(45), true));
test('90', t => t.is(geo.isValidLat(90), true));
test('90.1', t => t.is(geo.isValidLat(90.1), false));
test('180', t => t.is(geo.isValidLat(180), false));
