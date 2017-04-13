
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo({
	coordsFormat: 'D',
	coordsPrecision: 6
});

test('2 coords as object', t => {
	t.deepEqual(geo.formatBounds({
		ne: {
			lat: 123.456,
			lng: 78.901
		},
		sw: {
			lat: -123.456,
			lng: 67.890
		}
	}), {
		sw: {
			lat: -123.456,
			lng: 67.89
		},
		nw: {
			lat: 123.456,
			lng: 67.89
		},
		ne: {
			lat: 123.456,
			lng: 78.901
		},
		se: {
			lat: -123.456,
			lng: 78.901
		}
	});
});

test('2 coords as array', t => {
	t.deepEqual(geo.formatBounds([
		{
			lat: 123.456,
			lng: 78.901
		}, {
			lat: -123.456,
			lng: 67.890
		}
	]), {
		sw: {
			lat: -123.456,
			lng: 67.89
		},
		nw: {
			lat: 123.456,
			lng: 67.89
		},
		ne: {
			lat: 123.456,
			lng: 78.901
		},
		se: {
			lat: -123.456,
			lng: 78.901
		}
	});
});

test('4 coords as object', t => {
	t.deepEqual(geo.formatBounds({
		sw: {
			lat: -123.456,
			lng: 67.89
		},
		nw: {
			lat: 123.456,
			lng: 67.89
		},
		ne: {
			lat: 123.456,
			lng: 78.901
		},
		se: {
			lat: -123.456,
			lng: 78.901
		}
	}), {
		sw: {
			lat: -123.456,
			lng: 67.89
		},
		nw: {
			lat: 123.456,
			lng: 67.89
		},
		ne: {
			lat: 123.456,
			lng: 78.901
		},
		se: {
			lat: -123.456,
			lng: 78.901
		}
	});
});

test('4 coords as array', t => {
	t.deepEqual(geo.formatBounds([
		{
			lat: -123.456,
			lng: 67.89
		}, {
			lat: 123.456,
			lng: 67.89
		}, {
			lat: 123.456,
			lng: 78.901
		}, {
			lat: -123.456,
			lng: 78.901
		}
	]), {
		sw: {
			lat: -123.456,
			lng: 67.89
		},
		nw: {
			lat: 123.456,
			lng: 67.89
		},
		ne: {
			lat: 123.456,
			lng: 78.901
		},
		se: {
			lat: -123.456,
			lng: 78.901
		}
	});
});

/* fails */

test('1 coord', t => {
	t.is(geo.formatBounds({
		coord: {
			lat: 123.456,
			lng: 78.901
		}
	}), undefined);
});
