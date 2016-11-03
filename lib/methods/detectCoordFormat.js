
export default function detectCoordFormat(coord) {

	const degrees = ['°'];
	const minutes = ['\'', '`', '′'];
	const seconds = ['"', '″'];

	if (typeof coord === 'number') {
		return this.coordFormats.DD;
	} else if (typeof coord === 'string') {

		for (const symbol of seconds) {
			if (coord.indexOf(symbol) !== -1) {
				return this.coordFormats.DMS;
			}
		}

		for (const symbol of minutes) {
			if (coord.indexOf(symbol) !== -1) {
				return this.coordFormats.DM;
			}
		}

		for (const symbol of degrees) {
			if (coord.indexOf(symbol) !== -1) {
				return this.coordFormats.DD;
			}
		}

	}

}
