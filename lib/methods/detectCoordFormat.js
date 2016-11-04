
export default function detectCoordFormat(coord) {

	/* really rough check for the number of floats present in a string */

	if (typeof coord === 'number') {
		return this.coordFormats.D;
	} else if (typeof coord === 'string') {

		const floats = coord.match(/[+-]?\d+(\.\d+)?/g);
		if (floats) {

			if (floats.length === 3) {
				return this.coordFormats.DMS;
			} else if (floats.length === 2) {
				return this.coordFormats.DM;
			} else if (floats.length === 1) {
				return (coord.indexOf('°') === -1) ? this.coordFormats.D : this.coordFormats.DD;
			}

		}

	}

}
