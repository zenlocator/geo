
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo();

test('-270', t => t.is(geo.isValidLng(-270), false));
test('-180.1', t => t.is(geo.isValidLng(-180.1), false));
test('-180', t => t.is(geo.isValidLng(-180), true));
test('-90', t => t.is(geo.isValidLng(-90), true));
test('-45', t => t.is(geo.isValidLng(-45), true));
test('0', t => t.is(geo.isValidLng(0), true));
test('45', t => t.is(geo.isValidLng(45), true));
test('90', t => t.is(geo.isValidLng(90), true));
test('180', t => t.is(geo.isValidLng(180), true));
test('180.1', t => t.is(geo.isValidLng(180.1), false));
test('270', t => t.is(geo.isValidLng(270), false));
