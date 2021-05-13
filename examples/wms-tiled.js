import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj';

import Map from '../src/ol/compenents/MapSub';
import TileLayer from '../src/ol/compenents/Layers/TileLayer';
import GeoTileLayer from '../src/ol/compenents/Layers/geoserver/GeoTileLayer';

const layers = [
	new TileLayer({
		source: new OSM(),
	}),
	new GeoTileLayer({
		source: {
			url: 'http://a6-geoserver.a6-dev.dev.pcep.cloud/geoserver/kqcl',
			params: { LAYERS: 'kqcl:x_mr_mining_annual_data_mv', TILED: true },
			serverType: 'geoserver',
			// Countries have transparency, so do not fade tiles:
			transition: 0,
		},
	}),
];
const map = new Map({
	layers: layers,
	targetId: 'map',
	center: fromLonLat([116.402962, 39.914852]),
	zoom: 11,
});
