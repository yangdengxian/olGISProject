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

/* import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js'; */

const map = new Map({
    target: 'map',
    controls: [

    ],
    layers: [
        /* new TileLayer({
        	source: new OSM(),
        }), */
    ],
    view: new View({
        center: Config.mapConfig.center,
        zoom: Config.mapConfig.zoom,
        projection: Config.mapConfig.projection
    }),
});

export default map;