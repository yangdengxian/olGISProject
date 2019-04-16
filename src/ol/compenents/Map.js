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

import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

/* const map = new Map({
    target: 'map',
    controls: [

    ],
    layers: [
        new TileLayer({
            source: new OSM(),
        }),

    ],
    view: new View({
        projection: Config.mapConfig.projection
    }),
}); */

export default class MapSub extends Map {
    constructor(param) {
        super({
            target: param.targetId,
            controls: [

            ],
            layers: [
                /* new TileLayer({
                    source: new OSM(),
                }), */

            ],
            view: new View({
                projection: param.projection
            })
        })
    }

    getLayerById(layerId) {
        const layers = this.getLayers()["array_"];
        let targetLayer = {};
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if (layer["values_"] && layer["values_"]["id"] == layerId) {
                targetLayer = layer;
                break;
            }
        }
        return targetLayer;

    }
}