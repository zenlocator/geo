
export default function(center, meters) {

	const lat = this.parseCoord(center.lat, true);
	const lng = this.parseCoord(center.lng, false);

	center = {
		lat,
		lng
	};

	const sw = this.getDestinationPoint(center, meters, 225);
	const ne = this.getDestinationPoint(center, meters, 45);

	return this.formatBounds({
		sw,
		ne
	});

}
