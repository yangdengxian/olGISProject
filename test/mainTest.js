import Config from '../src/ol/config/config';
import Map from '../src/ol/compenents/Map';
import XYZLayer from '../src/ol/compenents/Layers/XYZLayer';
import OSM from 'ol/source/OSM.js';

const map = new Map({
    targetId: 'map',
    projection: "EPSG:4326"
});

const xyzLayer = new XYZLayer({
    source: new OSM(),
});

map.addLayer(xyzLayer);
map.getView().fit(Config.mapConfig.extent);
/* map.getView().setCenter([116.401969, 39.913828]);
map.getView().setZoom(10); */