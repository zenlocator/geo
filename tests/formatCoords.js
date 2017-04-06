
import test from 'ava';
import Geo from '../dist/geo';

test('format D coords', t => {

	const geo = new Geo({
		coordsFormat: 'D',
		coordsPrecision: 6
	});

	const coords = {
		lat: '36.823842',
		lng: 121.72744129384
	};

	t.deepEqual(geo.formatCoords(coords), {
		lat: 36.823842,
		lng: 121.727441
	});

});

test('format DMS coords', t => {

	const geo = new Geo({
		coordsFormat: 'DMS',
		coordsPrecision: 6
	});

	const coords = {
		lat: 37.787,
		lng: -122.407
	};

	t.deepEqual(geo.formatCoords(coords), {
		lat: '37° 47\' 13.2" N',
		lng: '122° 24\' 25.2" W'
	});

});
