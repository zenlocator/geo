
import * as methods from './methods/index.js';

class Geo {

	constructor(settings) {

		this.distanceUnits = {
			KM: 'kilometer',
			METER: 'meter',
			LEAGUE: 'league',
			MILE: 'mile',
			YARD: 'yard',
			FOOT: 'foot',
			INCH: 'inch',
			NAUTICAL_MILE: 'nautical-mile',
			SHEPPEY: 'sheppey'
		};

		this.FLEXIBLE_DISTANCE_PRECISION = -1;

		this.coordFormats = {
			DMS: 'dms', /* degrees, minutes and seconds: (string)`DDD° MM' SS.S"` */
			DM: 'dm', /* degrees and decimal minutes: (string)`DDD° MM.MMM'` */
			DD: 'dd', /* decimal degrees: (string)`DDD.DDDDD°` */
			D: 'd' /* decimal: (float)`DDD.DDDDD` */
		};

		this.settings = {
			outputDistanceUnits: this.distanceUnits.METER,
			outputDistancePrecision: this.FLEXIBLE_DISTANCE_PRECISION,
			outputCoordsFormat: this.coordFormats.DD,
			outputCoordsPrecision: 6,
			...settings
		};

	}

}

Geo.prototype = {
	...Geo.prototype,
	...methods
};

export default Geo;
