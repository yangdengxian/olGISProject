import Config from '../../../config/config';
import { Group as LayerGroup } from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import TileLayer from '../TileLayer';

/**
 * @classdesc 加载esri切片地图
 * @author ydx
 * @date 2019-04-01
 * @module Layers/arcgis/ArcGISTileLayers
 */
class ArcGISTileLayers {
    /**
     * @constructor
     * @param {*} param
     */
    constructor(param) {
        this.ArcGISTileLayers = [
            new TileLayer({
                title: "行政区划",
                baseLayer: true,
                source: new XYZ({
                    url: Config.LayersURL.TiledMapServiceLayerURL,
                    crossOrigin: "Anonymous"
                })
            }),
            new TileLayer({
                title: "行政区划",
                baseLayer: true,
                displayInLayerSwitcher: false,
                source: new XYZ({
                    url: Config.LayersURL.TDTCVALayerURL,
                    crossOrigin: "Anonymous"
                })
            }),

            //影像
            new TileLayer({
                title: "影像",
                baseLayer: true,
                visible: false,
                source: new XYZ({
                    url: Config.LayersURL.TDTIMG,
                    crossOrigin: "Anonymous"
                })
            }),
            new TileLayer({
                title: "影像",
                baseLayer: true,
                displayInLayerSwitcher: false,
                visible: false,
                source: new XYZ({
                    url: Config.LayersURL.TDTCIA,
                    crossOrigin: "Anonymous"
                })
            }),

            //地形图
            new TileLayer({
                title: "地形图",
                baseLayer: true,
                visible: false,
                source: new XYZ({
                    url: Config.LayersURL.TDTTER,
                    crossOrigin: "Anonymous"
                })
            }),
            new TileLayer({
                title: "地形图",
                baseLayer: true,
                visible: false,
                displayInLayerSwitcher: false,
                source: new XYZ({
                    url: Config.LayersURL.TDTCTA,
                    crossOrigin: "Anonymous"
                })
            }),


        ];
    }

    /**
     * @description 获取图层集
     * @returns {Array<TileLayer>} ArcGISTileLayers
     */
    getTileLayers() {
        return this.ArcGISTileLayers;
    }

    /**
     * @description 获取图层组
     * @returns {LayerGroup} LayerGroup
     */
    getLayerGroup() {
        return new LayerGroup({
            visible: "true",
            layers: this.ArcGISTileLayers
        });
    }
};

export default ArcGISTileLayers;