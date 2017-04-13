
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo({
	coordsFormat: 'D',
	coordsPrecision: 6
});

test('parse bounds zimbabwe', t => {
	t.deepEqual(geo.parseBounds({
		ne: {
			lat: -15.609319,
			lng: 33.068236
		},
		sw: {
			lat: -22.422354,
			lng: 25.237368
		}
	}), {
		sw: {
			lat: -22.422354,
			lng: 25.237368
		},
		nw: {
			lat: -15.609319,
			lng: 25.237368
		},
		ne: {
			lat: -15.609319,
			lng: 33.068236
		},
		se: {
			lat: -22.422354,
			lng: 33.068236
		}
	});
});

test('parse bounds random', t => {
	t.deepEqual(geo.parseBounds({
		ne: {
			lat: 123.456192483492,
			lng: 78.9012378264
		},
		sw: {
			lat: -123.456349035839,
			lng: 67.8902878274747
		}
	}), {
		sw: {
			lat: -123.456349,
			lng: 67.890288
		},
		nw: {
			lat: 123.456192,
			lng: 67.890288
		},
		ne: {
			lat: 123.456192,
			lng: 78.901238
		},
		se: {
			lat: -123.456349,
			lng: 78.901238
		}
	});
});
