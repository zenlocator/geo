
export default function(meters, distanceUnits = this.settings.distanceUnits) {

	let ret = parseFloat(meters);
	let distancePrecision;

	/* convert to proper units first */

	switch (distanceUnits) {
	case this.distanceUnits.KILOMETERS:
	case this.distanceUnits.KM:
		ret *= 0.001;
		distancePrecision = (ret < 1) ? 2 : 1;
		break;
	/* case this.distanceUnits.METERS:
		ret *= 1;
		distancePrecision = 0;
		break; */
	case this.distanceUnits.LEAGUES:
		ret *= 0.000179986;
		distancePrecision = (ret < 1) ? 1 : 1;
		break;
	case this.distanceUnits.MILES:
		ret *= 0.000621371;
		distancePrecision = (ret < 1) ? 2 : 1;
		break;
	case this.distanceUnits.YARDS:
		ret *= 1.09361;
		distancePrecision = 0;
		break;
	case this.distanceUnits.FEET:
		ret *= 3.28084;
		distancePrecision = 0;
		break;
	case this.distanceUnits.INCHES:
		ret *= 39.3701;
		distancePrecision = 0;
		break;
	case this.distanceUnits.NAUTICAL_MILES:
		ret *= 0.000539957;
		distancePrecision = (ret < 1) ? 2 : 1;
		break;
	case this.distanceUnits.SHEPPEYS:
		ret *= 0.00071428571;
		distancePrecision = 2;
		break;
	}

	/* set the right precision */

	if (this.settings.distancePrecision !== this.FLEXIBLE_DISTANCE_PRECISION) {
		distancePrecision = this.settings.distancePrecision;
	}

	return parseFloat(ret.toFixed(distancePrecision));

}
