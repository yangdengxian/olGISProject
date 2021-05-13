import Map from '../src/ol/compenents/MapSub';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj';

import GeoImageLayer from '../src/ol/compenents/Layers/geoserver/GeoImageLayer';
import TileLayer from '../src/ol/compenents/Layers/TileLayer';

const layers = [
	new TileLayer({
		source: new OSM(),
	}),
	new GeoImageLayer({
		url: 'http://a6-geoserver.a6-dev.dev.pcep.cloud/geoserver/kqcl',
		params: { LAYERS: 'kqcl:x_mr_mining_annual_data_mv' },
		projection: 'EPSG:3857',
	}),
];
const map = new Map({
	layers: layers,
	targetId: 'map',
	center: fromLonLat([116.402962, 39.914852]),
	zoom: 11,
});
