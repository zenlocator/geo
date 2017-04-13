
export default function(coords, bounds) {

	coords = {
		lat: this.parseCoord(coords.lat),
		lng: this.parseCoord(coords.lng)
	};

	bounds = this.parseBounds(bounds);

	return (
		(coords.lat >= bounds.sw.lat && coords.lat <= bounds.ne.lat) &&
		(coords.lng >= bounds.ne.lng && coords.lng <= bounds.sw.lng)
	);

}
