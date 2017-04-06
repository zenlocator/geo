
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo({
	coordsFormat: 'D',
	coordsPrecision: 6
});

test('format coords', t => {

	const coords = {
		lat: '36.823842',
		lng: 121.72744129384
	};

	t.deepEqual(geo.formatCoords(coords), {
		lat: 36.823842,
		lng: 121.727441
	});

});
