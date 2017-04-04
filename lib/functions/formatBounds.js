
export default function(bounds) {

	const ret = {
		sw: 0,
		nw: 0,
		ne: 0,
		se: 0
	};

	/* `bounds` has to be either an array, or an object, with exactly 2 coords */

	if (Array.isArray(bounds) && bounds.length === 2) {

		ret.sw = {
			lat: this.formatCoord(bounds[0].lat, true),
			lng: this.formatCoord(bounds[0].lng, false)
		};

		ret.ne = {
			lat: this.formatCoord(bounds[1].lat, true),
			lng: this.formatCoord(bounds[1].lng, false)
		};

	} else if (typeof bounds === 'object' && Object.keys(bounds).length === 2) {

		const keys = Object.keys(bounds);

		ret.sw = {
			lat: this.formatCoord(bounds[keys[0]].lat, true),
			lng: this.formatCoord(bounds[keys[0]].lng, false)
		};

		ret.ne = {
			lat: this.formatCoord(bounds[keys[1]].lat, true),
			lng: this.formatCoord(bounds[keys[1]].lng, false)
		};

	} else {
		return;
	}

	/* swap them if they're backwards */

	if (this.parseCoord(ret.ne.lat) < this.parseCoord(ret.sw.lat) || this.parseCoord(ret.ne.lng) < this.parseCoord(ret.sw.lng)) {
		[ret.sw, ret.ne] = [ret.ne, ret.sw];
	}

	/* generate other missing coords */

	ret.nw = {
		lat: this.formatCoord(ret.sw.lat),
		lng: this.formatCoord(ret.ne.lng)
	};

	ret.se = {
		lat: this.formatCoord(ret.ne.lat),
		lng: this.formatCoord(ret.sw.lng)
	};

	return ret;

}
