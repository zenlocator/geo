
export default function(coords1, coords2) {

	/* haversine formula */

	const degreesToRadians = (deg) => deg * (Math.PI / 180);

	const lat1 = this.parseCoord(coords1.lat, false);
	const lng1 = this.parseCoord(coords1.lng, false);
	const lat2 = this.parseCoord(coords2.lat, false);
	const lng2 = this.parseCoord(coords2.lng, false);

	const earthRadiusMeters = 6371000;

	const dLat = degreesToRadians(lat2 - lat1);
	const dLng = degreesToRadians(lng2 - lng1);

	const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
		Math.sin(dLng / 2) * Math.sin(dLng / 2);

	return this.formatDistance(earthRadiusMeters * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));

}
