# Geo (@zenlocator/geo)

[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![NPM version][npm-version-image]][npm-url]
[![License][license-image]][license-url]

Awesome library with common geo functions: <https://zenlocator.com/geo>

Getting started
-------

Install geo via:

- [node.js](https://nodejs.org): `npm install --save @zenlocator/geo`
- [bower](http://bower.io/): `bower install @zenlocator/geo`

(or just use the code at `dist/geo.min.js`)

Use in the browser (wherever ES5 is supported; 5KB):

```javascript
<script type="text/javascript" src="geo.min.js"></script>
<script type="text/javascript">
    var geo = new Geo();
    console.log(geo.getDestinationPoint({ lat: 37.787, lng: -122.407 }, 1000, 45));
</script>
```

Use in Node.js:

```javascript
var Geo = require('@zenlocator/geo');
var geo = new Geo();

console.log(geo.getDestinationPoint({ lat: 37.787, lng: -122.407 }, 1000, 45));
```

Or via CLI:

```shell
geo --coords-format d --coords-precision 3 get-destination-point 37.787,-122.407 1000 45
```

API
---

@todo

License
-------

[MIT](LICENSE)

[travis-url]: https://travis-ci.org/@zenlocator/geo
[travis-image]: https://travis-ci.org/@zenlocator/geo

[coveralls-url]: https://coveralls.io/github/@zenlocator/geo
[coveralls-image]: https://coveralls.io/repos/github/@zenlocator/geo/badge.svg

[npm-downloads-image]: https://img.shields.io/npm/dm/@zenlocator/geo.svg?style=flat-square
[npm-version-image]: https://img.shields.io/npm/v/@zenlocator/geo.svg
[npm-url]: https://www.npmjs.com/package/@zenlocator/geo

[license-url]: https://github.com/zenlocator/geo/blob/master/LICENSE
[license-image]: https://img.shields.io/packagist/l/@zenlocator/geo.svg?style=flat
