(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Geo = factory());
}(this, (function () { 'use strict';

var convertDistance = function (distance, fromUnits, toUnits) {

	var meters = 0;

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

var formatBounds = function (bounds) {

	var ret = {
		sw: 0,
		nw: 0,
		ne: 0,
		se: 0
	};

	var offsetCenter = {
		lat: -90,
		lng: 1
	};

	var sorted = [];

	/* `bounds` has to be either an array, or an object */

	if (this.isArray(bounds) && bounds.length >= 2) {
		sorted = this.orderByDistance(offsetCenter, bounds);
	} else if (this.isPlainObject(bounds) && Object.keys(bounds).length >= 2) {
		sorted = this.orderByDistance(offsetCenter, this.values(bounds));
	} else {
		return;
	}

	/* assign two coordinates for bounds (first and last) */

	if (sorted.length) {

		ret.sw = this.formatCoords({
			lat: sorted[0].lat,
			lng: sorted[0].lng
		});

		var lastIndex = sorted.length - 1;

		ret.ne = this.formatCoords({
			lat: sorted[lastIndex].lat,
			lng: sorted[lastIndex].lng
		});
	} else {
		return;
	}

	/* swap them if they're backwards */

	if (this.parseCoord(ret.ne.lat) < this.parseCoord(ret.sw.lat) || this.parseCoord(ret.ne.lng) < this.parseCoord(ret.sw.lng)) {
		var _ref = [ret.ne, ret.sw];
		ret.sw = _ref[0];
		ret.ne = _ref[1];
	}

	/* generate other missing coords */

	ret.nw = this.formatCoords({
		lat: ret.ne.lat,
		lng: ret.sw.lng
	});

	ret.se = this.formatCoords({
		lat: ret.sw.lat,
		lng: ret.ne.lng
	});

	return ret;
};

var formatCoord = function (coord) {
	var isLat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


	if (typeof coord === 'undefined') {
		return coord;
	}

	var ret = [];

	var iterations = void 0;
	var remainder = void 0;
	var direction = void 0;

	coord = this.parseCoord(coord, false);

	if (this.settings.coordsFormat === this.coordFormats.D) {
		return parseFloat(coord.toFixed(this.settings.coordsPrecision));
	}

	/* split coord into digits (degrees, mins, secs) */

	if (this.settings.coordsFormat === this.coordFormats.DM) {
		iterations = 1;
	} else if (this.settings.coordsFormat === this.coordFormats.DMS) {
		iterations = 2;
	}

	if (iterations) {

		for (var i = 0; i !== iterations; i++) {

			ret.push(parseInt(coord, 10));

			remainder = coord % 1;
			coord = remainder * 60;
		}
	}

	ret.push(parseFloat(coord.toFixed(this.settings.coordsPrecision)));

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

var formatCoords = function (coords) {

	coords = {
		lat: this.parseCoord(coords.lat),
		lng: this.parseCoord(coords.lng)
	};

	/* treat [0,-180] and [0,180] as [0,0] */

	if (coords.lat === 0 && coords.lng === -180 || coords.lat === 0 && coords.lng === 180) {
		coords.lng = 0;
	}

	return {
		lat: this.formatCoord(coords.lat, true),
		lng: this.formatCoord(coords.lng, false)
	};
};

var formatDistance = function (meters) {
	var distanceUnits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.settings.distanceUnits;


	var ret = parseFloat(meters);
	var distancePrecision = void 0;

	/* convert to proper units first */

	switch (distanceUnits) {
		case this.distanceUnits.KILOMETERS:
		case this.distanceUnits.KM:
			ret *= 0.001;
			distancePrecision = ret < 1 ? 2 : 1;
			break;
		/* case this.distanceUnits.METERS:
  	ret *= 1;
  	distancePrecision = 0;
  	break; */
		case this.distanceUnits.LEAGUES:
			ret *= 0.000179986;
			distancePrecision = ret < 1 ? 1 : 1;
			break;
		case this.distanceUnits.MILES:
			ret *= 0.000621371;
			distancePrecision = ret < 1 ? 2 : 1;
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
			distancePrecision = ret < 1 ? 2 : 1;
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
};

var getBounds = function (center, meters) {

	var lat = this.parseCoord(center.lat, true);
	var lng = this.parseCoord(center.lng, false);

	center = {
		lat: lat,
		lng: lng
	};

	var sw = this.getDestinationPoint(center, meters, 225);
	var ne = this.getDestinationPoint(center, meters, 45);

	return this.formatBounds({
		sw: sw,
		ne: ne
	});
};

var getCenter = function () {
	var coordsArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];


	/* if no maths required */

	if (!coordsArray.length) {
		return;
	}

	if (coordsArray.length === 1) {
		return this.formatCoords({
			lat: coordsArray[0].lat,
			lng: coordsArray[0].lng
		});
	}

	/* otherwise, find a centroid */

	var x = 0.0;
	var y = 0.0;
	var z = 0.0;

	var lat = void 0;
	var lng = void 0;

	for (var i = 0; i !== coordsArray.length; i++) {

		var coords = coordsArray[i];

		lat = this.toRad(this.parseCoord(coords.lat));
		lng = this.toRad(this.parseCoord(coords.lng));

		x += Math.cos(lat) * Math.cos(lng);
		y += Math.cos(lat) * Math.sin(lng);
		z += Math.sin(lat);
	}

	var total = coordsArray.length;

	x /= total;
	y /= total;
	z /= total;

	lng = Math.atan2(y, x);
	var hyp = Math.sqrt(x * x + y * y);
	lat = Math.atan2(z, hyp);

	return this.formatCoords({
		lat: lat * 180 / Math.PI,
		lng: lng * 180 / Math.PI
	});
};

var getClosest = function (center) {
	var coords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


	var ret = void 0;

	var orderedCoords = this.orderByDistance(center, coords);
	if (orderedCoords.length) {
		ret = orderedCoords[0];
	}

	return ret;
};

/*
	source: `http://www.movable-type.co.uk/scripts/latlong.html`
*/

var getDestinationPoint = function (coords, distance, bearing) {
	var radius = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.RADIUS_EQUILATERAL;


	var lat = this.parseCoord(coords.lat, true);
	var lng = this.parseCoord(coords.lng, false);

	var δ = Number(distance) / radius;
	var θ = this.toRad(Number(bearing));

	var φ1 = this.toRad(Number(lat));
	var λ1 = this.toRad(Number(lng));

	var φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));

	var λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
	λ2 = (λ2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI;

	return this.formatCoords({
		lat: this.toDeg(φ2),
		lng: this.toDeg(λ2)
	});
};

var getDistance = function (coords1, coords2) {

	/* haversine formula */

	var degreesToRadians = function degreesToRadians(deg) {
		return deg * (Math.PI / 180);
	};

	var lat1 = this.parseCoord(coords1.lat, true);
	var lng1 = this.parseCoord(coords1.lng, false);
	var lat2 = this.parseCoord(coords2.lat, true);
	var lng2 = this.parseCoord(coords2.lng, false);

	var earthRadiusMeters = 6371000;

	var dLat = degreesToRadians(lat2 - lat1);
	var dLng = degreesToRadians(lng2 - lng1);

	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

	return this.formatDistance(earthRadiusMeters * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

var isPointInBounds = function (coords, bounds) {

	coords = {
		lat: this.parseCoord(coords.lat),
		lng: this.parseCoord(coords.lng)
	};

	bounds = this.parseBounds(bounds);

	return coords.lat >= bounds.sw.lat && coords.lat <= bounds.ne.lat && coords.lng >= bounds.nw.lng && coords.lng <= bounds.se.lng;
};

var isPointInCircle = function (coords, center, meters) {

	var originaldistanceUnits = this.settings.distanceUnits;

	this.settings.distanceUnits = this.distanceUnits.METER;
	var ret = this.getDistance(coords, center) <= meters;

	this.settings.distanceUnits = originaldistanceUnits;
	return ret;
};

var isValidLat = function (lat) {
	lat = this.parseCoord(lat);
	return lat >= -90 && lat <= 90;
};

var isValidLng = function (lng) {
	lng = this.parseCoord(lng);
	return lng >= -180 && lng <= 180;
};

var orderByDistance = function (center, coords) {
	var _this = this;

	if (!this.isPlainObject(coords) && !this.isArray(coords)) {
		return;
	}

	var ret = this.isArray(coords) ? [] : {};
	var distances = [];
	var orderedDistances = [];
	var getDistance = function getDistance(c, k) {

		var item = {};

		if (k) {
			item.key = k;
		}

		item.value = c;
		item.distance = _this.getDistance(center, c);

		distances.push(item);
		orderedDistances.push(item.distance);
	};

	/* build `distances` */

	if (this.isArray(coords)) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = coords[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var c = _step.value;

				getDistance(c);
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
	} else {
		for (var k in coords) {
			getDistance(coords[k], k);
		}
	}

	/* sort */

	orderedDistances.sort(function (a, b) {
		return a - b;
	});

	/* re-assemble */

	var _loop = function _loop(i) {

		var chunk = distances.filter(function (c) {
			if (c.distance === orderedDistances[i]) {
				return c;
			}
		});

		for (var j in chunk) {

			var _c = chunk[j];
			var v = _this.formatCoords(_c.value);

			if (_c.hasOwnProperty('key')) {
				ret[_c.key] = v;
			} else {
				ret.push(v);
			}
		}
	};

	for (var i in orderedDistances) {
		_loop(i);
	}

	return ret;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var parseBounds = function (bounds) {

	bounds = _extends({}, this.formatBounds(bounds));

	if (bounds) {
		bounds = {
			sw: {
				lat: this.parseCoord(bounds.sw.lat),
				lng: this.parseCoord(bounds.sw.lng)
			},
			nw: {
				lat: this.parseCoord(bounds.nw.lat),
				lng: this.parseCoord(bounds.nw.lng)
			},
			ne: {
				lat: this.parseCoord(bounds.ne.lat),
				lng: this.parseCoord(bounds.ne.lng)
			},
			se: {
				lat: this.parseCoord(bounds.se.lat),
				lng: this.parseCoord(bounds.se.lng)
			}
		};
	}

	return bounds;
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
		ret = parseFloat(ret.toFixed(this.settings.coordsPrecision));
	}

	return ret;
};

var Geo = function Geo() {
	var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	classCallCheck(this, Geo);


	/* cleanup settings */

	for (var k in settings) {
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

	this.toRad = function (degrees) {
		return degrees * Math.PI / 180;
	};
	this.toDeg = function (radians) {
		return radians * 180 / Math.PI;
	};
	this.isPlainObject = function (o) {
		return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && o.constructor === Object;
	};
	this.isArray = function (a) {
		return Object.prototype.toString.call(a) === '[object Array]';
	};
	this.values = function (o) {
		return Object.keys(o).map(function (k) {
			return o[k];
		});
	};

	/* radius(es?) :P */

	this.RADIUS_MEAN = 6371000;
	this.RADIUS_EQUILATERAL = 6378100;
	this.RADIUS_POLAR = 6356800;

	/* assign settings */

	this.settings = _extends({
		distanceUnits: this.distanceUnits.METER,
		distancePrecision: this.FLEXIBLE_DISTANCE_PRECISION,
		coordsFormat: this.coordFormats.D,
		coordsPrecision: 6
	}, settings);
};

Geo.prototype = _extends({}, Geo.prototype, {
	convertDistance: convertDistance,
	detectCoordFormat: detectCoordFormat,
	formatBounds: formatBounds,
	formatCoord: formatCoord,
	formatCoords: formatCoords,
	formatDistance: formatDistance,
	getBounds: getBounds,
	getCenter: getCenter,
	getClosest: getClosest,
	getDestinationPoint: getDestinationPoint,
	getDistance: getDistance,
	isPointInBounds: isPointInBounds,
	isPointInCircle: isPointInCircle,
	isValidLat: isValidLat,
	isValidLng: isValidLng,
	orderByDistance: orderByDistance,
	parseBounds: parseBounds,
	parseCoord: parseCoord
});

return Geo;

})));
