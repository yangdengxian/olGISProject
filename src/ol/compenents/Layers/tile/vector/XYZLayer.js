import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import MVT from 'ol/format/MVT.js';
import GeoJSON from 'ol/format/GeoJSON';
/**
 * @classdesc 矢量XYZ切片服务
 * @author ydx
 * @date 2019-06-25
 * @module Layers/tile/vector/XYZLayer
 * @extends VectorTileLayer
 */
class XYZLayer extends VectorTileLayer {
    /**
     * 
     * @param {*} param 
     * @param {boolean} param.visible 是否可见，默认false
     * @param {url} param.url  http://localhost/{z}/{x}/{y}.pbf
     * @param {string} param.format 'geojson','pbf' 默认pbf（mvt）
     */
    constructor(param) {
        let format = new MVT();
        switch (param.format) {
            case 'geojson':
                format = new GeoJSON();
                break;
                //后续补充
            default:
                break;
        }
        param.source = new VectorTileSource({
            format: format,
            url: param.url
        })
        super(param);
    }
};

export default XYZLayer;