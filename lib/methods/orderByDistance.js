
export default function(center, coords) {

	const isPlainObject = (o) => typeof o === 'object' && o.constructor === Object;
	const isArray = (a) => Object.prototype.toString.call(a) === '[object Array]';

	if (!isPlainObject(coords) && !isArray(coords)) {
		return;
	}

	const ret = (isArray(coords)) ? [] : {};
	const distances = [];
	const orderedDistances = [];
	const getDistance = (c, k) => {

		const item = {};

		if (k) {
			item.key = k;
		}

		item.value = c;
		item.distance = this.getDistance(center, c);

		distances.push(item);
		orderedDistances.push(item.distance);

	};

	/* build `distances` */

	if (isArray(coords)) {
		for (const c of coords) {
			getDistance(c);
		}
	} else {
		for (const k in coords) {
			getDistance(coords[k], k);
		}
	}

	/* sort */

	orderedDistances.sort((a, b) => a - b);

	/* re-assemble */

	for (const i in orderedDistances) {

		const chunk = distances.filter((c) => {
			if (c.distance === orderedDistances[i]) {
				return c;
			}
		});

		for (const j in chunk) {

			const c = chunk[j];
			if (c.hasOwnProperty('key')) {
				ret[c.key] = c.value;
			} else {
				ret.push(c.value);
			}

		}

	}

	return ret;

}
