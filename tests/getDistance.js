
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo();

test('from: [37.787588,-122.403178] to: [40.689241,-74.044500]', t => t.is(geo.getDistance({
	lat: 37.787588,
	lng: -122.403178
}, {
	lat: 40.689241,
	lng: -74.044500
}), 4124615));
