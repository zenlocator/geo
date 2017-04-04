
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo({
	outputCoordsFormat: 'd',
	outputCoordsPrecision: 6
});

test('get desination point of -45°', t => {

	const coord = geo.getDestinationPoint({
		lat: 36.82384,
		lng: -121.7274
	}, 100, -45);

	t.deepEqual(coord, {
		lat: 36.824475,
		lng: -121.728194
	});

});

test('get desination point of 90°', t => {

	const coord = geo.getDestinationPoint({
		lat: 36.82384,
		lng: -121.7274
	}, 1000, 90);

	t.deepEqual(coord, {
		lat: 36.823839,
		lng: -121.716178
	});

});
