
export default function parseCoord(coord, usePrecision = true) {

	const coordFormat = this.detectCoordFormat(coord);

	let digits = [];
	let ret;

	if (coordFormat) {

		if (coordFormat === this.coordFormats.D) {
			ret = parseFloat(coord);
		} else {

			/* extract floats first */

			if (typeof coord === 'string') {
				coord = coord.toLowerCase();
				digits = coord.match(/[+-]?\d+(\.\d+)?/g).map(d => parseFloat(d));
			}

			/* test against format */

			if (digits.length === 1 && coordFormat !== this.coordFormats.DD ||
				digits.length === 2 && coordFormat !== this.coordFormats.DM ||
				digits.length === 3 && coordFormat !== this.coordFormats.DMS ||
				digits.length < 1 || digits.length > 3) {

				digits = [];

			}

			/* convert to internal decimal format */

			if (digits.length) {

				let remainder = 0;

				for (ret of digits.reverse()) {
					ret += remainder;
					remainder = ret / 60;
				}

			}

			/* assign proper sign */

			if (ret && typeof coord === 'string' && (coord.indexOf('s') !== -1 || coord.indexOf('w') !== -1)) {
				ret *= -1;
			}

		}

	}

	if (ret && usePrecision) {
		ret = parseFloat(ret.toFixed(this.settings.outputCoordsPrecision));
	}

	return ret;

}
