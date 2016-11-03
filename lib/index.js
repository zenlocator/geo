
import * as methods from './methods/index.js';

class Geo {

	constructor() {
		this.name = 'Geo';
	}

}

Geo.prototype = {
	...Geo.prototype,
	...methods
};

export default Geo;
