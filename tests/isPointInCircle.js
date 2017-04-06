
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo({
	coordsFormat: 'D',
	coordsPrecision: 6
});

test('point is in circle', t => {

	const coords = {
		lat: 0,
		lng: 0
	};

	const center = {
		lat: 0,
		lng: 0
	};

	const meters = 123;

	t.true(geo.isPointInCircle(coords, center, meters));

});

test('point is not in circle', t => {

	const coords = {
		lat: 0,
		lng: 0
	};

	const center = {
		lat: 123,
		lng: 45
	};

	const meters = 123;

	t.false(geo.isPointInCircle(coords, center, meters));

});
