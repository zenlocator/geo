
export default function(bounds) {

	const ret = {
		sw: 0,
		nw: 0,
		ne: 0,
		se: 0
	};

	const offsetCenter = {
		lat: -90,
		lng: 1
	};

	let sorted = [];

	/* `bounds` has to be either an array, or an object */

	if (this.isArray(bounds) && bounds.length >= 2) {
		sorted = this.orderByDistance(offsetCenter, bounds);
	} else if (this.isPlainObject(bounds) && Object.keys(bounds).length >= 2) {
		sorted = this.orderByDistance(offsetCenter, this.values(bounds));
	} else {
		return;
	}

	/* assign two coordinates for bounds (first and last) */

	if (sorted.length) {

		ret.sw = this.formatCoords({
			lat: sorted[0].lat,
			lng: sorted[0].lng
		});

		const lastIndex = sorted.length - 1;

		ret.ne = this.formatCoords({
			lat: sorted[lastIndex].lat,
			lng: sorted[lastIndex].lng
		});

	} else {
		return;
	}

	/* swap them if they're backwards */

	if (this.parseCoord(ret.ne.lat) < this.parseCoord(ret.sw.lat) || this.parseCoord(ret.ne.lng) < this.parseCoord(ret.sw.lng)) {
		[ret.sw, ret.ne] = [ret.ne, ret.sw];
	}

	/* generate other missing coords */

	ret.nw = this.formatCoords({
		lat: ret.ne.lat,
		lng: ret.sw.lng
	});

	ret.se = this.formatCoords({
		lat: ret.sw.lat,
		lng: ret.ne.lng
	});

	return ret;

}
