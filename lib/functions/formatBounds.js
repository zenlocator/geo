
export default function(bounds) {

	const ret = {
		sw: 0,
		nw: 0,
		ne: 0,
		se: 0
	};

	/* `bounds` has to be either an array, or an object, with exactly 2 coords */

	if (this.isArray(bounds) && bounds.length === 2) {

		ret.sw = this.formatCoords({
			lat: bounds[0].lat,
			lng: bounds[0].lng
		});

		ret.ne = this.formatCoords({
			lat: bounds[1].lat,
			lng: bounds[1].lng
		});

	} else if (this.isPlainObject(bounds) && Object.keys(bounds).length === 2) {

		const keys = Object.keys(bounds);

		ret.sw = this.formatCoords({
			lat: bounds[keys[0]].lat,
			lng: bounds[keys[0]].lng
		});

		ret.ne = this.formatCoords({
			lat: bounds[keys[1]].lat,
			lng: bounds[keys[1]].lng
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
		lat: ret.sw.lat,
		lng: ret.ne.lng
	});

	ret.se = this.formatCoords({
		lat: ret.ne.lat,
		lng: ret.sw.lng
	});

	return ret;

}
