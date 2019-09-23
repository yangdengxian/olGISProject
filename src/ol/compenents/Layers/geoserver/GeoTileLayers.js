import Config from '../../../config/config';
import { Group as LayerGroup } from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import TileLayer from '../TileLayer';
import TileWMS from 'ol/source/TileWMS';
import Utill from '../../../utils/Util';

/**
 * @classdesc 加载切片地图
 * @author ydx
 * @date 2019-08-09
 * @module Layers/geoserver/GeoTileLayers
 */
class GeoTileLayers {
    /**
     * @constructor
     * @param {*} param
     */
    constructor(param) {
        this.GeoTileLayers = [
            //administrativeLayer
            new TileLayer({
                title: "administrativeLayer",
                baseLayer: true,
                source: new XYZ({
                    url: Config.mapTileUrl.Google.Normal.Map.en,
                    crossOrigin: "Anonymous"
                })
            }),

            //imageLayer
            new TileLayer({
                title: "imageLayer",
                baseLayer: true,
                visible: false,
                source: new XYZ({
                    url: Config.mapTileUrl.Google.Satellite.Map.en,
                    crossOrigin: "Anonymous"
                })
            }),

            //哈法亚油田
            new TileLayer({
                title: "imageLayer",
                baseLayer: true,
                visible: false,
                displayInLayerSwitcher: false,
                source: new TileWMS({
                    url: Config.getMapConfig(Utill.getQueryString("App"))["mapUrl"] + "/wms",
                    params: {
                        FORMAT: 'image/png',
                        VERSION: '1.1.0',
                        tiled: true,
                        STYLES: '',
                        LAYERS: 'cpe:cpe_image_3857',
                    }
                })
            }),


            //terrainLayer
            new TileLayer({
                title: "terrainLayer",
                baseLayer: true,
                visible: false,
                source: new XYZ({
                    url: Config.mapTileUrl.A4.Terrain.Map,
                    crossOrigin: "Anonymous"
                })
            }),
        ];
    }

    /**
     * @description 获取图层集
     * @returns {Array<TileLayer>} GeoTileLayers
     */
    getTileLayers() {
        return this.GeoTileLayers;
    }

    /**
     * @description 获取图层组
     * @returns {LayerGroup} LayerGroup
     */
    getLayerGroup() {
        return new LayerGroup({
            visible: "true",
            layers: this.GeoTileLayers
        });
    }
};

export default GeoTileLayers;