
export default function(distance, fromUnits, toUnits) {

	let meters = 0;

	/* basic formatting & error checking */

	distance = parseInt(distance, 10);

	fromUnits = fromUnits.toUpperCase();
	toUnits = toUnits.toUpperCase();

	/* convert distance to meters first */

	switch (fromUnits) {
	case this.distanceUnits.KILOMETERS:
	case this.distanceUnits.KM:
		meters = distance * 1000;
		break;
	case this.distanceUnits.METERS:
		meters = distance;
		break;
	case this.distanceUnits.LEAGUES:
		meters = distance * 5556;
		break;
	case this.distanceUnits.MILES:
		meters = distance * 1609.344;
		break;
	case this.distanceUnits.YARDS:
		meters = distance / 1.0936;
		break;
	case this.distanceUnits.FEET:
		meters = distance * 0.3048;
		break;
	case this.distanceUnits.INCHES:
		meters = distance * 0.0254;
		break;
	case this.distanceUnits.NAUTICAL_MILES:
		meters = distance * 1852;
		break;
	case this.distanceUnits.SHEPPEYS:
		meters = distance / 0.00071428571;
		break;
	}

	/* then return result in `toUnits` */

	return this.formatDistance(meters, toUnits);

}
