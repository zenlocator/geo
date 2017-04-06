
import test from 'ava';
import Geo from '../dist/geo';

test('unordered coords (array)', t => {

	const geo = new Geo();
	const unorderedCoords = [
		{
			lat: '37° 34.70868\' N', /* burlingame */
			lng: '122° 20.90292\' W'
		}, {
			lat: 37.778486, /* cliff house */
			lng: -122.513963
		}, {
			lat: '37° 51\' 34.2972" N', /* sausalito */
			lng: '122° 29\' 5.2368" W'
		}, {
			lat: '37.787596', /* local edition */
			lng: '-122.403178'
		}
	];

	t.deepEqual(geo.orderByDistance({
		lat: 37.787937,
		lng: -122.407524
	}, unorderedCoords), [
		{
			lat: 37.787596, /* local edition */
			lng: -122.403178
		}, {
			lat: 37.778486, /* cliff house */
			lng: -122.513963
		}, {
			lat: 37.859527, /* sausalito */
			lng: -122.484788
		}, {
			lat: 37.578478, /* burlingame */
			lng: -122.348382
		}
	]);

});

test('unordered coords (object)', t => {

	const geo = new Geo();
	const unorderedCoords = {
		one: {
			lat: '37° 34.70868\' N', /* burlingame */
			lng: '122° 20.90292\' W'
		},
		two: {
			lat: 37.778486, /* cliff house */
			lng: -122.513963
		},
		three: {
			lat: '37° 51\' 34.2972" N', /* sausalito */
			lng: '122° 29\' 5.2368" W'
		},
		four: {
			lat: '37.787596', /* local edition */
			lng: '-122.403178'
		}
	};

	t.deepEqual(geo.orderByDistance({
		lat: 37.787937,
		lng: -122.407524
	}, unorderedCoords), {
		four: {
			lat: 37.787596, /* local edition */
			lng: -122.403178
		},
		two: {
			lat: 37.778486, /* cliff house */
			lng: -122.513963
		},
		three: {
			lat: 37.859527, /* sausalito */
			lng: -122.484788
		},
		one: {
			lat: 37.578478, /* burlingame */
			lng: -122.348382
		}
	});

});
