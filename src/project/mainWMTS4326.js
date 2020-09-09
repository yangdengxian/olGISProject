import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile';
import View from 'ol/View';
import VectorTileSource from 'ol/source/VectorTile';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import Projection from 'ol/proj/Projection';
import GeoJSON from 'ol/format/GeoJSON';

var gridsetName = 'EPSG:4326';
var gridNames = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];
var projection = new Projection({
    code: 'EPSG:4326',
    units: 'degrees',
    axisOrientation: 'neu'
});
var resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];
var params = {
    'REQUEST': 'GetTile',
    'SERVICE': 'WMTS',
    'VERSION': '1.0.0',
    'LAYER': 'localhost:planet_osm_roads',
    'STYLE': 'line',
    'TILEMATRIX': gridsetName + ':{z}',
    'TILEMATRIXSET': gridsetName,
    'FORMAT': 'application/json;type=geojson',
    'TILECOL': '{x}',
    'TILEROW': '{y}'
};

var map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
            opacity: 0.7,
        }),
        new VectorTileLayer({
            source: new VectorTileSource({
                url: (() => {
                    var url = '/geoserver/gwc/service/wmts' + '?'
                    for (var param in params) {
                        url = url + param + '=' + params[param] + '&';
                    }
                    url = url.slice(0, -1);
                    return url;
                })(),
                format: new GeoJSON({}),
                projection: projection,
                tileGrid: new WMTSTileGrid({
                    tileSize: [256, 256],
                    origin: [-180.0, 90.0],
                    resolutions: resolutions,
                    matrixIds: gridNames
                }),
                wrapX: true
            })
        }),
    ],
    target: 'map',
    view: new View({
        center: [116.231722, 39.912445],
        zoom: 12,
        resolutions: resolutions,
        projection: projection,
        extent: [-180.0, -90.0, 180.0, 90.0]
    }),
});