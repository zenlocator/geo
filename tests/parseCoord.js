
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo({
	outputCoordsFormat: 'd',
	outputCoordsPrecision: 6
});

test('(number) -123.456789', t => t.is(geo.parseCoord(-123.456789), -123.456789));
test('(number) 0', t => t.is(geo.parseCoord(0), 0));
test('(number) 123.456789', t => t.is(geo.parseCoord(123.456789), 123.456789));

test('(string) -123.456789', t => t.is(geo.parseCoord('-123.456789'), -123.456789));
test('(string) 0', t => t.is(geo.parseCoord('0'), 0));
test('(string) 123.456789', t => t.is(geo.parseCoord('123.456789'), 123.456789));

test('123° 27\' 24" N', t => t.is(geo.parseCoord('123° 27\' 24" N'), 123.456667));
test('123° 27\' 24" S', t => t.is(geo.parseCoord('123° 27\' 24" S'), -123.456667));

test('41° 52.73568\' N', t => t.is(geo.parseCoord('41° 52.73568\' N'), 41.878928));
