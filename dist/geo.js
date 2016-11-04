(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Geo = factory());
}(this, (function () { 'use strict';

var formatDistance = function (meters) {

	var ret = meters;
	var distancePrecision = void 0;

	/* convert to proper units first */

	switch (this.settings.outputDistanceUnits) {
		case this.distanceUnits.KM:
			ret *= 0.001;
			distancePrecision = ret < 1 ? 2 : 1;
			break;
		/* case this.distanceUnits.METER:
  	ret *= 1;
  	distancePrecision = 0;
  	break; */
		case this.distanceUnits.LEAGUE:
			ret *= 0.000179986;
			distancePrecision = ret < 1 ? 1 : 1;
			break;
		case this.distanceUnits.MILE:
			ret *= 0.000621371;
			distancePrecision = ret < 1 ? 2 : 1;
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
			distancePrecision = ret < 1 ? 2 : 1;
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

	return parseFloat(ret.toFixed(distancePrecision));
};

var formatCoord = function (coord) {
	var isLat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


	var ret = [];

	var iterations = void 0;
	var remainder = void 0;
	var direction = void 0;

	coord = this.parseCoord(coord, false);

	if (this.settings.outputCoordsFormat === this.coordFormats.D) {
		return coord;
	}

	/* split coord into digits (degrees, mins, secs) */

	if (this.settings.outputCoordsFormat === this.coordFormats.DM) {
		iterations = 1;
	} else if (this.settings.outputCoordsFormat === this.coordFormats.DMS) {
		iterations = 2;
	}

	if (iterations) {

		for (var i = 0; i !== iterations; i++) {

			ret.push(parseInt(coord, 10));

			remainder = coord % 1;
			coord = remainder * 60;
		}
	}

	ret.push(parseFloat(coord.toFixed(this.settings.outputCoordsPrecision)));

	/* adjust direction */

	if (isLat) {
		direction = ret[0] > 0 ? 'N' : 'S';
	} else {
		direction = ret[0] > 0 ? 'E' : 'W';
	}

	ret = ret.map(function (d) {
		return Math.abs(d);
	});

	/* format each digit in `ret` */

	if (ret.length === 3) {
		ret = ret[0] + '\xB0 ' + ret[1] + '\' ' + ret[2] + '" ' + direction;
	} else if (ret.length === 2) {
		ret = ret[0] + '\xB0 ' + ret[1] + '\' ' + direction;
	} else if (ret.length === 1) {
		ret = ret[0] + '\xB0 ' + direction;
	} else {
		ret = undefined;
	}

	return ret;
};

var detectCoordFormat = function (coord) {

	/* really rough check for the number of floats present in a string */

	if (typeof coord === 'number') {
		return this.coordFormats.D;
	} else if (typeof coord === 'string') {

		var floats = coord.match(/[+-]?\d+(\.\d+)?/g);
		if (floats) {

			if (floats.length === 3) {
				return this.coordFormats.DMS;
			} else if (floats.length === 2) {
				return this.coordFormats.DM;
			} else if (floats.length === 1) {
				return coord.indexOf('°') === -1 ? this.coordFormats.D : this.coordFormats.DD;
			}
		}
	}
};

var parseCoord = function (coord) {
	var usePrecision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


	var coordFormat = this.detectCoordFormat(coord);

	var digits = [];
	var ret = void 0;

	if (coordFormat) {

		if (coordFormat === this.coordFormats.D) {
			ret = parseFloat(coord);
		} else {

			/* extract floats first */

			if (typeof coord === 'string') {
				coord = coord.toLowerCase();
				digits = coord.match(/[+-]?\d+(\.\d+)?/g).map(function (d) {
					return parseFloat(d);
				});
			}

			/* test against format */

			if (digits.length === 1 && coordFormat !== this.coordFormats.DD || digits.length === 2 && coordFormat !== this.coordFormats.DM || digits.length === 3 && coordFormat !== this.coordFormats.DMS || digits.length < 1 || digits.length > 3) {

				digits = [];
			}

			/* convert to internal decimal format */

			if (digits.length) {

				var remainder = 0;

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = digits.reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						ret = _step.value;

						ret += remainder;
						remainder = ret / 60;
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}

			/* assign proper sign */

			if (ret && typeof coord === 'string' && (coord.indexOf('s') !== -1 || coord.indexOf('w') !== -1)) {
				ret *= -1;
			}
		}
	}

	if (ret && usePrecision) {
		ret = parseFloat(ret.toFixed(this.settings.outputCoordsPrecision));
	}

	return ret;
};

var getDistance = function (coords1, coords2) {

	/* haversine formula */

	var degreesToRadians = function degreesToRadians(deg) {
		return deg * (Math.PI / 180);
	};

	var lat1 = this.parseCoord(coords1.lat, false);
	var lng1 = this.parseCoord(coords1.lng, false);
	var lat2 = this.parseCoord(coords2.lat, false);
	var lng2 = this.parseCoord(coords2.lng, false);

	var earthRadiusMeters = 6371000;

	var dLat = degreesToRadians(lat2 - lat1);
	var dLng = degreesToRadians(lng2 - lng1);

	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

	return this.formatDistance(earthRadiusMeters * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

var getCenterFromCoords = function () {};

var getCenterFromBounds = function () {};

var getBounds = function () {};

var getClosest = function () {};

var isPointInBounds = function () {};

var isPointInCircle = function () {};

var isValidLat = function (lat) {
	lat = this.parseCoord(lat);
	return lat >= -90 && lat <= 90;
};

var isValidLng = function (lng) {
	lng = this.parseCoord(lng);
	return lng >= -180 && lng <= 180;
};

var orderByDistance = function () {};



var methods = Object.freeze({
	formatDistance: formatDistance,
	formatCoord: formatCoord,
	detectCoordFormat: detectCoordFormat,
	parseCoord: parseCoord,
	getDistance: getDistance,
	getCenterFromCoords: getCenterFromCoords,
	getCenterFromBounds: getCenterFromBounds,
	getBounds: getBounds,
	getClosest: getClosest,
	isPointInBounds: isPointInBounds,
	isPointInCircle: isPointInCircle,
	isValidLat: isValidLat,
	isValidLng: isValidLng,
	orderByDistance: orderByDistance
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Geo = function Geo(settings) {
	_classCallCheck(this, Geo);

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

	this.settings = _extends({
		outputDistanceUnits: this.distanceUnits.METER,
		outputDistancePrecision: this.FLEXIBLE_DISTANCE_PRECISION,
		outputCoordsFormat: this.coordFormats.DD,
		outputCoordsPrecision: 6
	}, settings);
};

Geo.prototype = _extends({}, Geo.prototype, methods);

return Geo;

})));
