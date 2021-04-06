import '../src/project/mianCss.js';
import Config from '../src/ol/config/config';
// import Util from '../src/ol/utils/Util';
import TranformUtil from '../src/ol/utils/TransFormUtil';
import MapSub from '../src/ol/compenents/MapSub';

//layers
import XYZLayer from '../src/ol/compenents/Layers/tile/raster/XYZLayer';
import IsoLineLayer from '../src/ol/compenents/Layers/isolines/IsoLineLayer';

import pointGrid from '@turf/point-grid'

const isolineLayer = new IsoLineLayer({
    id: "isolineLayer",
    title: 'isolineLayer',
    isThmemeLayer: true,
    displayInLayerSwitcher: true,
});

var extent = [115.670389, 39.514645, 117.381338, 40.652231];
var cellWidth = 10000;
var grid = pointGrid(extent, cellWidth, { units: 'meters' });

for (var i = 0; i < grid.features.length; i++) {
    grid.features[i].properties.temperature = Math.random() * 10;
}
var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

isolineLayer.createIsoLines(
    grid, breaks, {
        zProperty: 'temperature',
    }
);
isolineLayer.addFeatures(isolineLayer.transform('EPSG:4326', 'EPSG:3857'))

const mapConfig = Config.mapConfig;
const cityRasterTilesLayer = new XYZLayer({
    id: "GLOBAL_WEBMERCATOR",
    title: "GLOBAL_WEBMERCATOR",
    url: 'http://www.pcep.cloud/ogc/wmts/Richfit_Map/GLOBAL_WEBMERCATOR/{z}/{x}/{y}.png',
});
//初始化地图
const map = new MapSub({
    targetId: 'map',
    projection: Config.mapConfig['projection'],
    layers: [cityRasterTilesLayer],
    transFormUtil: new TranformUtil({
        source: 'EPSG:4326',
        destination: Config.mapConfig['projection'],
    }),
});
map.getView().fit(map.getTransFormUtil().transformExtent(mapConfig['extent']));

map.addLayer(isolineLayer);