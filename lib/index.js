
import * as funcs from './funcs/index.js';

class Geo {

	constructor() {
		this.name = 'Geo';
	}

}

Geo.prototype = {
	...Geo.prototype,
	...funcs
};

export default Geo;
