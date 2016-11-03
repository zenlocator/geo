
export default function formatDistance(meters) {

	let ret = meters;
	let distancePrecision;

	/* convert to proper units first */

	switch (this.settings.outputDistanceUnits) {
	case this.distanceUnits.KM:
		ret *= 0.001;
		distancePrecision = (ret < 1) ? 2 : 1;
		break;
	/* case this.distanceUnits.METER:
		ret *= 1;
		distancePrecision = 0;
		break; */
	case this.distanceUnits.LEAGUE:
		ret *= 0.000179986;
		distancePrecision = (ret < 1) ? 1 : 1;
		break;
	case this.distanceUnits.MILE:
		ret *= 0.000621371;
		distancePrecision = (ret < 1) ? 2 : 1;
		break;
	case this.distanceUnits.YARD:
		ret *= 1.09361;
		distancePrecision = 0;
		break;
	case this.distanceUnits.FOOT:
		ret *= 3.28084;
		distancePrecision = 0;
		break;
	case this.distanceUnits.INCH:
		ret *= 39.3701;
		distancePrecision = 0;
		break;
	case this.distanceUnits.NAUTICAL_MILE:
		ret *= 0.000539957;
		distancePrecision = (ret < 1) ? 2 : 1;
		break;
	case this.distanceUnits.SHEPPEY:
		ret *= 0.00071428571;
		distancePrecision = 2;
		break;
	}

	/* set the right precision */

	if (this.settings.outputDistancePrecision !== this.FLEXIBLE_DISTANCE_PRECISION) {
		distancePrecision = this.settings.outputDistancePrecision;
	}

	return ret.toFixed(distancePrecision);

}
