/**
 * 地图加载
 * @author ydx
 * @date 2019-03-22
 */
import 'ol/ol.css';
import '../../../css/common.css';
import Map from 'ol/Map';
import View from 'ol/View';

/* import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js'; */

export default class MapSub extends Map {
    constructor(param) {
        super({
            target: param.targetId,
            controls: [],
            layers: [
                /* new TileLayer({
                    source: new OSM(),
                }), */
            ],
            view: new View({
                projection: param.projection,
            }),
        });
        //坐标转换工具
        this.transFormUtil = param.transFormUtil;
    }

    getLayerById(layerId) {
        const layers = this.getLayers().getArray();
        let targetLayer = null;
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if (layer.get('id') == layerId) {
                targetLayer = layer;
                break;
            }
        }
        return targetLayer;
    }

    getTransFormUtil() {
        return this.transFormUtil;
    }
}