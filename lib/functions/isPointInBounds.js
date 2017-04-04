
export default function(coords, bounds) {

	coords = {
		lat: this.parseCoord(coords.lat),
		lng: this.parseCoord(coords.lng)
	};

	bounds = this.parseBounds(bounds);

	return (
		(coords.lat >= bounds.nw.lat && coords.lat <= bounds.ne.lat) &&
		(coords.lng >= bounds.sw.lng && coords.lng <= bounds.nw.lng)
	);

}
