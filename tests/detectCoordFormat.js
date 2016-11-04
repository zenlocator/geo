
import test from 'ava';
import Geo from '../dist/geo';

const geo = new Geo();

test('(string) -123.456789', t => t.is(geo.detectCoordFormat('-123.456789'), geo.coordFormats.D));
test('(number) -123.456789', t => t.is(geo.detectCoordFormat(-123.456789), geo.coordFormats.D));

test('-123.456789°', t => t.is(geo.detectCoordFormat('-123.456789°'), geo.coordFormats.DD));

test('-123° 27\' S', t => t.is(geo.detectCoordFormat('-123° 27\' S'), geo.coordFormats.DM));
test('123°27′N', t => t.is(geo.detectCoordFormat('123°27′N'), geo.coordFormats.DM));

test('-123° 27\' 24" S', t => t.is(geo.detectCoordFormat('-123° 27\' 24" S'), geo.coordFormats.DMS));
test('123°27′24″N', t => t.is(geo.detectCoordFormat('123°27′24″N'), geo.coordFormats.DMS));

/* fails */

test('-123° 27\' 24" 00 S', t => t.is(geo.detectCoordFormat('-123° 27\' 24" 00 S'), undefined));
test('', t => t.is(geo.detectCoordFormat(''), undefined));
