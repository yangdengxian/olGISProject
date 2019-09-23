import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import MVT from 'ol/format/MVT.js';
/**
 * @classdesc 矢量切片服务
 * @author ydx
 * @date 2019-06-25
 * @module Layers/VectorTilesLayer
 * @extends VectorTileLayer
 */
class VectorTilesLayer extends VectorTileLayer {
    /**
     * 
     * @param {*} param 
     * @param {boolean} param.visible 是否可见，默认true
     * @param {source} param.source  
     */
    constructor(param) {
        super({
            visible: param.visible || true,
            source: new VectorTileSource({
                format: new MVT(),
                url: param.url
            })
        })
    }
};

export default VectorTilesLayer;