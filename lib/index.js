
import * as functions from './functions/index.js';

class Geo {

	constructor(settings = {}) {

		/* cleanup settings */

		for (let k in settings) {
			if (settings.hasOwnProperty(k)) {

				if (typeof settings[k] === 'string') {
					settings[k] = settings[k].toUpperCase();
				}

				if (['distancePrecision', 'coordsPrecision'].indexOf(k) !== -1) {
					settings[k] = parseInt(settings[k], 10);
				}

			}
		}

		/* internal */

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
			DMS: 'DMS', /* degrees, minutes and seconds: (string)`DDD° MM' SS.S"` */
			DM: 'DM', /* degrees and decimal minutes: (string)`DDD° MM.MMM'` */
			DD: 'DD', /* decimal degrees: (string)`DDD.DDDDD°` */
			D: 'D' /* decimal: (float)`DDD.DDDDD` */
		};

		this.settings = {
			distanceUnits: this.distanceUnits.METER,
			distancePrecision: this.FLEXIBLE_DISTANCE_PRECISION,
			coordsFormat: this.coordFormats.D,
			coordsPrecision: 6,
			...settings
		};

		/* functions */

		this.toRad = (degrees) => degrees * Math.PI / 180;
		this.toDeg = (radians) => radians * 180 / Math.PI;
		this.isPlainObject = (o) => typeof o === 'object' && o.constructor === Object;
		this.isArray = (a) => Object.prototype.toString.call(a) === '[object Array]';

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
