
var Geo = require('./dist/geo'),
	geo = new Geo({
		outputLengthUnits: 'km',
		outputLengthDigits: 0
	});

console.log(geo.getCenter());
