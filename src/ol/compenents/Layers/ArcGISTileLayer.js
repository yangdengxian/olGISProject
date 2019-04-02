/**
 * 加载esri切片地图
 * @author ydx
 * @date 2019-04-01
 */
import Config from '../../config/config';
import { Group as LayerGroup, Tile as TileLayer } from 'ol/layer';
import XYZ from 'ol/source/XYZ';


export default class ArcGISTileLayers {
    constructor() {
        this.ArcGISTileLayers = [
            new TileLayer({
                source: new XYZ({
                    url: Config.LayersURL.TiledMapServiceLayerURL
                })
            }),
            new TileLayer({
                source: new XYZ({
                    url: Config.LayersURL.TDTCVALayerURL
                })
            }),

        ];
    }

    getTileLayers() {
        return this.ArcGISTileLayers;
    }


    getLayerGroup() {
        return new LayerGroup({
            layers: this.ArcGISTileLayers
        });
    }
};