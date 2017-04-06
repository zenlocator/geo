
export default function(lng) {
	lng = this.parseCoord(lng);
	return (lng >= -180 && lng <= 180);
}
