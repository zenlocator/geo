
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo({
	outputCoordsFormat: 'd',
	outputCoordsPrecision: 6
});

test('get center with 1 coord', t => {

	const coords = [
		{
			lat: 36.82384,
			lng: 121.7274
		}
	];

	t.deepEqual(geo.getCenter(coords), {
		lat: 36.82384,
		lng: 121.7274
	});

});

test('get center with 2 coords', t => {

	const coords = [
		{
			lat: 36.82384,
			lng: 121.7274
		}, {
			lat: -36.82384,
			lng: -121.7274
		}
	];

	t.deepEqual(geo.getCenter(coords), {
		lat: 0,
		lng: 0
	});

});

test('get center with 3 coords', t => {

	const coords = [
		{
			lat: 36.82384,
			lng: -121.7274
		}, {
			lat: 37.778486,
			lng: -122.513963
		}, {
			lat: 38.243772,
			lng: -123.238722
		}
	];

	t.deepEqual(geo.getCenter(coords), {
		lat: 37.616979,
		lng: -122.488539
	});

});
