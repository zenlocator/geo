# Geo (@zenlocator/geo)

Getting started
-------

Install geo via:

- [bower](http://bower.io/): `bower install @zenlocator/geo`
- [node.js](https://nodejs.org): `npm install --save @zenlocator/geo`
- as cli tool: `npm install -g @zenlocator/geo`

Use in the browser (wherever ES5 is supported):

```javascript
<script type="text/javascript" src="geo.min.js"></script>
<script type="text/javascript">

  var geo = new Geo();

  var point = geo.getDestinationPoint({ lat: 37.787, lng: -122.407 }, 1000, 45);
  console.log(point); // { lat: '38° N', lng: '122° W' }

</script>
```

Use in Node.js:

```javascript
var Geo = require('@zenlocator/geo');

var geo = new Geo();
var point = geo.getDestinationPoint({ lat: 37.787, lng: -122.407 }, 1000, 45);

console.log(point);  // { lat: '38° N', lng: '122° W' }
```

Or via CLI:

```shell
$ geo get-destination-point --format list 37.787,-122.407 1000 45
38° N,122° W
```

API
---

@todo

License
-------

[MIT](LICENSE)
