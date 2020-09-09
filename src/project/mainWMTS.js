import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import WMTSLayer from '../ol/compenents/Layers/tile/vector/WMTSLayer'

var map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
            opacity: 0.7,
        }),
        new WMTSLayer({
            url: '/geoserver/gwc/service/wmts',
            format: 'application/vnd.mapbox-vector-tile',
            // format: 'application/json;type=geojson',
            layer: 'localhost:planet_osm_roads',
            gridsetName: 'EPSG:90013',
            style: 'line'
        })
    ],
    target: 'map',
    view: new View({
        center: [12938816.14, 4853251.26],
        zoom: 12,
    }),
});