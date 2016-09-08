(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Geo = factory());
}(this, (function () { 'use strict';

function getCenter() {
	return "getCenter says " + this.name;
}

function getDistance() {
	return "getDistance says " + this.name;
}



var funcs = Object.freeze({
	getCenter: getCenter,
	getDistance: getDistance
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Geo = function Geo() {
	_classCallCheck(this, Geo);

	this.name = 'Geo';
};

Geo.prototype = _extends({}, Geo.prototype, funcs);

return Geo;

})));