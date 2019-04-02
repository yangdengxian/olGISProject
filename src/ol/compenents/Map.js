/**
 * 地图加载
 * @author ydx
 * @date 2019-03-22
 */
import '../../../css/ol.css';
import '../../../css/common.css';
import Config from '../config/config';
import Map from 'ol/Map';
import View from 'ol/View';

const map = new Map({
    target: 'map',
    layers: [],
    view: new View({
        center: Config.mapConfig.center,
        zoom: Config.mapConfig.zoom,
    })
});

export default map;