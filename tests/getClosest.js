
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo({
	coordsFormat: 'D',
	coordsPrecision: 6
});

test('get closest', t => {

	const center = {
		lat: 0,
		lng: 0
	};

	const coords = [
		{
			lat: 12.34,
			lng: -12.34
		}, {
			lat: 0.123,
			lng: -0.123
		}, {
			lat: 123.456,
			lng: -45
		}, {
			lat: 66,
			lng: -66
		}
	];

	t.deepEqual(geo.getClosest(center, coords), {
		lat: 0.123,
		lng: -0.123
	});

});
