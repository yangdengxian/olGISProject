import Map from '../src/ol/compenents/MapSub';
import ArcGISImageLayers from '../src/ol/compenents/Layers/arcgis/ArcGISImageLayers';
import TileLayer from '../src//ol/compenents/Layers/TileLayer';
import { OSM } from 'ol/source.js';

const url =
	'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/' + 'Specialty/ESRI_StateCityHighway_USA/MapServer';

const layers = [
	new TileLayer({
		source: new OSM(),
	}),
	new ArcGISImageLayers(url, {
		params: {},
	}),
];
const map = new Map({
	layers: layers,
	targetId: 'map',
	center: [-10997148, 4569099],
	zoom: 4,
});
