import OSM from 'ol/source/OSM.js';

import TileLayer from '../src/ol/compenents/Layers/TileLayer';
import Map from '../src/ol/compenents/MapSub';

const map = new Map({
	layers: [
		new TileLayer({
			source: new OSM(),
		}),
	],
	targetId: 'map',
	center: [0, 0],
	zoom: 6,
});
