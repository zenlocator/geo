
export default function(coordsArray = []) {

	/* if no maths required */

	if (!coordsArray.length) {
		return;
	}

	if (coordsArray.length === 1) {
		return this.formatCoords({
			lat: coordsArray[0].lat,
			lng: coordsArray[0].lng
		});
	}

	/* otherwise, find a centroid */

	let x = 0.0;
	let y = 0.0;
	let z = 0.0;

	let lat;
	let lng;

	for (let i = 0; i !== coordsArray.length; i++) {

		const coords = coordsArray[i];

		lat = this.toRad(this.parseCoord(coords.lat));
		lng = this.toRad(this.parseCoord(coords.lng));

		x += Math.cos(lat) * Math.cos(lng);
		y += Math.cos(lat) * Math.sin(lng);
		z += Math.sin(lat);

	}

	const total = coordsArray.length;

	x /= total;
	y /= total;
	z /= total;

	lng = Math.atan2(y, x);
	const hyp = Math.sqrt(x * x + y * y);
	lat = Math.atan2(z, hyp);

	return this.formatCoords({
		lat: lat * 180 / Math.PI,
		lng: lng * 180 / Math.PI
	});

}
