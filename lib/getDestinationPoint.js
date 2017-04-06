
/*
	source: `http://www.movable-type.co.uk/scripts/latlong.html`
*/

export default function(coords, distance, bearing, radius = this.RADIUS_EQUILATERAL) {

	const lat = this.parseCoord(coords.lat, true);
	const lng = this.parseCoord(coords.lng, false);

	const δ = Number(distance) / radius;
	const θ = this.toRad(Number(bearing));

	const φ1 = this.toRad(Number(lat));
	const λ1 = this.toRad(Number(lng));

	const φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));

	let λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
	λ2 = (λ2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI;

	return this.formatCoords({
		lat: this.toDeg(φ2),
		lng: this.toDeg(λ2)
	});

}
