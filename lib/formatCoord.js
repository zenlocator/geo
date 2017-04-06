
export default function(coord, isLat = true) {

	if (typeof coord === 'undefined') {
		return coord;
	}

	let ret = [];

	let iterations;
	let remainder;
	let direction;

	coord = this.parseCoord(coord, false);

	if (this.settings.coordsFormat === this.coordFormats.D) {
		return parseFloat(coord.toFixed(this.settings.coordsPrecision));
	}

	/* split coord into digits (degrees, mins, secs) */

	if (this.settings.coordsFormat === this.coordFormats.DM) {
		iterations = 1;
	} else if (this.settings.coordsFormat === this.coordFormats.DMS) {
		iterations = 2;
	}

	if (iterations) {

		for (let i = 0; i !== iterations; i++) {

			ret.push(parseInt(coord, 10));

			remainder = coord % 1;
			coord = remainder * 60;

		}

	}

	ret.push(parseFloat(coord.toFixed(this.settings.coordsPrecision)));

	/* adjust direction */

	if (isLat) {
		direction = (ret[0] > 0) ? 'N' : 'S';
	} else {
		direction = (ret[0] > 0) ? 'E' : 'W';
	}

	ret = ret.map(d => Math.abs(d));

	/* format each digit in `ret` */

	if (ret.length === 3) {
		ret = `${ret[0]}° ${ret[1]}' ${ret[2]}" ${direction}`;
	} else if (ret.length === 2) {
		ret = `${ret[0]}° ${ret[1]}' ${direction}`;
	} else if (ret.length === 1) {
		ret = `${ret[0]}° ${direction}`;
	} else {
		ret = undefined;
	}

	return ret;

}
