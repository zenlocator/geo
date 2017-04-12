
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo({
	coordsFormat: 'D',
	coordsPrecision: 6
});

test('get bounds', t => {

	const center = {
		lat: 36.82384,
		lng: 121.7274
	};

	const meters = 1234;

	t.deepEqual(geo.getBounds(center, meters), {
		ne: {
			lat: 36.831678,
			lng: 121.737193,
		},
		nw: {
			lat: 36.816001,
			lng: 121.737193,
		},
		se: {
			lat: 36.831678,
			lng: 121.717609,
		},
		sw: {
			lat: 36.816001,
			lng: 121.717609,
		}
	});

});
