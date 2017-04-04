
export default function(coords) {

	coords = {
		lat: this.parseCoord(coords.lat, true),
		lng: this.parseCoord(coords.lng, false)
	};

	/* treat [0,-180] and [0,180] as [0,0] */

	if (coords.lat === 0 && coords.lng === -180 || coords.lat === 0 && coords.lng === 180) {
		coords.lng = 0;
	}

	return {
		lat: this.formatCoord(coords.lat),
		lng: this.formatCoord(coords.lng)
	};

}
