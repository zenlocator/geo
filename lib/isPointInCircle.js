
export default function(coords, center, meters) {

	const originaldistanceUnits = this.settings.distanceUnits;

	this.settings.distanceUnits = this.distanceUnits.METER;
	const ret = (this.getDistance(coords, center) <= meters);

	this.settings.distanceUnits = originaldistanceUnits;
	return ret;

}
