
import test from 'ava';
import Geo from '../dist/geo';

test('(dms) -123.456789', t => {
	const geo = new Geo({
		coordsFormat: 'dms',
		coordsPrecision: 6
	});
	t.is(geo.formatCoord(-123.456789, false), '123° 27\' 24.4404" W');
});

test('(dm) -123.456789', t => {
	const geo = new Geo({
		coordsFormat: 'dm',
		coordsPrecision: 6
	});
	t.is(geo.formatCoord(-123.456789, false), '123° 27.40734\' W');
});

test('(dd) -123.456789', t => {
	const geo = new Geo({
		coordsFormat: 'dd',
		coordsPrecision: 6
	});
	t.is(geo.formatCoord(-123.456789, false), '123.456789° W');
});

test('(d) -123.456789', t => {
	const geo = new Geo({
		coordsFormat: 'd',
		coordsPrecision: 6
	});
	t.is(geo.formatCoord(-123.456789123, false), -123.456789);
});
