import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile';
import View from 'ol/View';
import VectorTileSource from 'ol/source/VectorTile';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {get as getProjection } from 'ol/proj';
import MVT from 'ol/format/MVT';
import { getTopLeft } from 'ol/extent';

var projection = getProjection('EPSG:3857');
var projectionExtent = projection.getExtent();
var resolutions = [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169, 0.037322767712175846, 0.018661383856087923, 0.009330691928043961, 0.004665345964021981, 0.0023326729820109904, 0.0011663364910054952, 5.831682455027476E-4, 2.915841227513738E-4, 1.457920613756869E-4];
var gridNames = ['EPSG:900913:0', 'EPSG:900913:1', 'EPSG:900913:2', 'EPSG:900913:3', 'EPSG:900913:4', 'EPSG:900913:5', 'EPSG:900913:6', 'EPSG:900913:7', 'EPSG:900913:8', 'EPSG:900913:9', 'EPSG:900913:10', 'EPSG:900913:11', 'EPSG:900913:12', 'EPSG:900913:13', 'EPSG:900913:14', 'EPSG:900913:15', 'EPSG:900913:16', 'EPSG:900913:17', 'EPSG:900913:18', 'EPSG:900913:19', 'EPSG:900913:20', 'EPSG:900913:21', 'EPSG:900913:22', 'EPSG:900913:23', 'EPSG:900913:24', 'EPSG:900913:25', 'EPSG:900913:26', 'EPSG:900913:27', 'EPSG:900913:28', 'EPSG:900913:29', 'EPSG:900913:30'];
var gridsetName = 'EPSG:900913';
var params = {
    'REQUEST': 'GetTile',
    'SERVICE': 'WMTS',
    'VERSION': '1.0.0',
    'LAYER': 'localhost:planet_osm_roads',
    'STYLE': 'line',
    'TILEMATRIX': gridsetName + ':{z}',
    'TILEMATRIXSET': gridsetName,
    'FORMAT': 'application/vnd.mapbox-vector-tile',
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
                format: new MVT({}),
                projection: projection,
                tileGrid: new WMTSTileGrid({
                    tileSize: [256, 256],
                    origin: getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: gridNames
                }),
                wrapX: true
            })
        }),
    ],
    target: 'map',
    view: new View({
        center: [12938816.14, 4853251.26],
        zoom: 12,
    }),
});