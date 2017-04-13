
export default function(coords, bounds) {

	coords = {
		lat: this.parseCoord(coords.lat),
		lng: this.parseCoord(coords.lng)
	};

	bounds = this.parseBounds(bounds);

	return (
		(coords.lat >= bounds.sw.lat && coords.lat <= bounds.ne.lat) &&
		(coords.lng >= bounds.nw.lng && coords.lng <= bounds.se.lng)
	);

}
