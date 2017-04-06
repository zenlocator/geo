
export default function(center, coords = []) {

	let ret;

	const orderedCoords = this.orderByDistance(center, coords);
	if (orderedCoords.length) {
		ret = orderedCoords[0];
	}

	return ret;

}
