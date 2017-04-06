
import convertDistance from './convertDistance';
import detectCoordFormat from './detectCoordFormat';
import formatBounds from './formatBounds';
import formatCoord from './formatCoord';
import formatCoords from './formatCoords';
import formatDistance from './formatDistance';
import getCenter from './getCenter';
import getClosest from './getClosest';
import getDestinationPoint from './getDestinationPoint';
import getDistance from './getDistance';
import isPointInBounds from './isPointInBounds';
import isPointInCircle from './isPointInCircle';
import isValidLat from './isValidLat';
import isValidLng from './isValidLng';
import orderByDistance from './orderByDistance';
import parseBounds from './parseBounds';
import parseCoord from './parseCoord';

class Geo {

	constructor(settings = {}) {

		/* cleanup settings */

		for (const k in settings) {
			if (settings.hasOwnProperty(k)) {

				if (typeof settings[k] === 'string') {
					settings[k] = settings[k].toUpperCase();
				}

				if (['distancePrecision', 'coordsPrecision'].indexOf(k) !== -1) {
					settings[k] = parseInt(settings[k], 10);
				}

			}
		}

		/* constants */

		this.distanceUnits = {
			KILOMETERS: 'KILOMETERS',
			KM: 'KM',
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

		/* functions */

		this.toRad = (degrees) => degrees * Math.PI / 180;
		this.toDeg = (radians) => radians * 180 / Math.PI;
		this.isPlainObject = (o) => typeof o === 'object' && o.constructor === Object;
		this.isArray = (a) => Object.prototype.toString.call(a) === '[object Array]';

		/* radius(es?) :P */

		this.RADIUS_MEAN = 6371000;
		this.RADIUS_EQUILATERAL = 6378100;
		this.RADIUS_POLAR = 6356800;

		/* assign settings */

		this.settings = {
			distanceUnits: this.distanceUnits.METER,
			distancePrecision: this.FLEXIBLE_DISTANCE_PRECISION,
			coordsFormat: this.coordFormats.D,
			coordsPrecision: 6,
			...settings
		};

	}

}

Geo.prototype = {
	...Geo.prototype,
	convertDistance,
	detectCoordFormat,
	formatBounds,
	formatCoord,
	formatCoords,
	formatDistance,
	getCenter,
	getClosest,
	getDestinationPoint,
	getDistance,
	isPointInBounds,
	isPointInCircle,
	isValidLat,
	isValidLng,
	orderByDistance,
	parseBounds,
	parseCoord
};

export default Geo;
