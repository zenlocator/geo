
export default function(coords, center, meters) {

	const originalOutputDistanceUnits = this.settings.outputDistanceUnits;

	this.settings.outputDistanceUnits = this.distanceUnits.METER;
	const ret = (this.getDistance(coords, center) <= meters);

	this.settings.outputDistanceUnits = originalOutputDistanceUnits;
	return ret;

}
