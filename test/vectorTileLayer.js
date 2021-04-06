import '../src/project/mianCss.js';
import Config from '../src/ol/config/config';
// import Util from '../src/ol/utils/Util';
import TranformUtil from '../src/ol/utils/TransFormUtil';
import MapSub from '../src/ol/compenents/MapSub';

//layers
import XYZLayer from '../src/ol/compenents/Layers/tile/vector/XYZLayer';

const mapConfig = Config.mapConfig;
const mapboxLayer = new XYZLayer({
    url: 'https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/{z}/{x}/{y}.mvt?access_token=pk.eyJ1IjoiaXJpc2ppYXFpc2hpIiwiYSI6ImNqbTk1cm8zdDA1djMza21vMGVkbDRjcnQifQ.rl3QYFhlM3ra9Rb6lcJFDA'
});

//初始化地图
const map = new MapSub({
    targetId: 'map',
    projection: Config.mapConfig['projection'],
    layers: [mapboxLayer],
    transFormUtil: new TranformUtil({
        source: 'EPSG:4326',
        destination: Config.mapConfig['projection'],
    }),
});
map.getView().fit(map.getTransFormUtil().transformExtent(mapConfig['extent']));