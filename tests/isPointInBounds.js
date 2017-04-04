
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo({
	outputCoordsFormat: 'd',
	outputCoordsPrecision: 6
});

test('is [0, 0] in bounds', t => {

	const point = {
		lat: 0,
		lng: 0
	};

	const bounds = {
		ne: {
			lat: 123.456,
			lng: 78.901
		},
		sw: {
			lat: -123.456,
			lng: -67.890
		}
	};

	t.true(geo.isPointInBounds(point, bounds));

});
