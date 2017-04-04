
import * as functions from './functions/index.js';

class Geo {

	constructor(settings) {

		this.distanceUnits = {
			KILOMETERS: 'KILOMETERS',
			METERS: 'METERS',
			LEAGUES: 'LEAGUES',
			MILES: 'MILES',
			YARDS: 'YARDS',
			FEET: 'FEET',
			INCHES: 'INCHES',
			NAUTICAL_MILES: 'NAUTICAL_MILES',
			SHEPPEYS: 'SHEPPEYS'
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

		/* functions */

		this.toRad = (degrees) => degrees * Math.PI / 180;
		this.toDeg = (radians) => radians * 180 / Math.PI;

		/* radii */

		this.RADIUS_MEAN = 6371000;
		this.RADIUS_EQUILATERAL = 6378100;
		this.RADIUS_POLAR = 6356800;

	}

}

Geo.prototype = {
	...Geo.prototype,
	...functions
};

export default Geo;
