
export default function(bounds) {

	bounds = {
		...this.formatBounds(bounds)
	};

	if (bounds) {
		bounds = {
			sw: {
				lat: this.parseCoord(bounds.sw.lat),
				lng: this.parseCoord(bounds.sw.lng)
			},
			nw: {
				lat: this.parseCoord(bounds.nw.lat),
				lng: this.parseCoord(bounds.nw.lng)
			},
			ne: {
				lat: this.parseCoord(bounds.ne.lat),
				lng: this.parseCoord(bounds.ne.lng)
			},
			se: {
				lat: this.parseCoord(bounds.se.lat),
				lng: this.parseCoord(bounds.se.lng)
			}
		};
	}

	return bounds;

}
