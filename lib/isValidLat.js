
export default function(lat) {
	lat = this.parseCoord(lat);
	return (lat >= -90 && lat <= 90);
}
