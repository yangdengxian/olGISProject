import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS';

/**
 * @classdesc 切片服务
 * @author ydx
 * @date 2019-03-22
 * @module Layers/WMTSLayer
 * @extends TileLayer
 */
class WMTSLayer extends TileLayer {
    /**
     * 
     * @param {*} param 
     * @param {boolean} param.visible 是否可见，默认true
     * @param {source} param.source  TileWMS.Options: {
        url: 'http://localhost:8083/geoserver2.15/gwc/service/wms?',
        params: {
            FORMAT: 'image/png',
            VERSION: '1.1.0',
            tiled: true,
            STYLES: '',
            LAYERS: 'localhost:global_polygon',
            //tilesOrigin: -124.73142200000001 + "," + 24.955967
        },
    },
     */
    constructor(param) {
        super({
            id: param.id,
            title: param.title,
            baseLayer: param.isBaseLayer || false,
            thmemeLayer: param.isThmemeLayer || false,
            displayInLayerSwitcher: param.displayInLayerSwitcher || false,
            visible: param.visible || true,
            source: new TileWMS(param.source)
        })
    }
};

export default WMTSLayer;