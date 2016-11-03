
export default function isValidLng(lng) {
	lng = this.parseCoord(lng);
	return (lng >= -180 && lng <= 180);
}
