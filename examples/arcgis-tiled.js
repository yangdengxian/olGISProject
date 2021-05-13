import Map from '../src/ol/compenents/MapSub';
import TileLayer from '../src//ol/compenents/Layers/TileLayer';
import { OSM, TileArcGISRest } from 'ol/source.js';

const url =
	'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/' + 'Specialty/ESRI_StateCityHighway_USA/MapServer';

const layers = [
	new TileLayer({
		source: new OSM(),
	}),
	new TileLayer({
		extent: [-13884991, 2870341, -7455066, 6338219],
		source: new TileArcGISRest({
			url: url,
		}),
	}),
];
const map = new Map({
	layers: layers,
	targetId: 'map',
	center: [-10997148, 4569099],
	zoom: 4,
});
