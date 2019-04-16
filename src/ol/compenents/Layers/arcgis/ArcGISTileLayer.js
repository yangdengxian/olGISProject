/**
 * 加载esri切片地图
 * @author ydx
 * @date 2019-04-01
 */
import Config from '../../../config/config';
import { Group as LayerGroup, Tile as TileLayer } from 'ol/layer';
import XYZ from 'ol/source/XYZ';


export default class ArcGISTileLayers {
    constructor() {
        this.ArcGISTileLayers = [
            new TileLayer({
                title: "行政区划",
                baseLayer: true,
                source: new XYZ({
                    url: Config.LayersURL.TiledMapServiceLayerURL
                })
            }),
            new TileLayer({
                title: "行政区划",
                baseLayer: true,
                displayInLayerSwitcher: false,
                source: new XYZ({
                    url: Config.LayersURL.TDTCVALayerURL
                })
            }),

            //影像
            new TileLayer({
                title: "影像",
                baseLayer: true,
                visible: false,
                source: new XYZ({
                    url: Config.LayersURL.TDTIMG
                })
            }),
            new TileLayer({
                title: "影像",
                baseLayer: true,
                displayInLayerSwitcher: false,
                visible: false,
                source: new XYZ({
                    url: Config.LayersURL.TDTCIA
                })
            }),

            //地形图
            new TileLayer({
                title: "地形图",
                baseLayer: true,
                visible: false,
                source: new XYZ({
                    url: Config.LayersURL.TDTTER
                })
            }),
            new TileLayer({
                title: "地形图",
                baseLayer: true,
                visible: false,
                displayInLayerSwitcher: false,
                source: new XYZ({
                    url: Config.LayersURL.TDTCTA
                })
            }),


        ];
    }

    getTileLayers() {
        return this.ArcGISTileLayers;
    }

    getLayerGroup() {
        return new LayerGroup({
            visible: "true",
            layers: this.ArcGISTileLayers
        });
    }
};