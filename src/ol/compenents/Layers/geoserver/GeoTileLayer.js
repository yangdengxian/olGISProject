import WMTSLayer from '../WMTSLayer';

/**
 * @classdesc geosever 栅格图层
 * @author ydx
 * @date 2019-04-13
 * @module Layers/geoserver/GeoTileLayer
 * @extends WMTSLayer
 */
class GeoTileLayer extends WMTSLayer {
    /**
     * 
     * @param {string} url 必填*
     * @param {object} param 
     * @param {string} param.title 
     * @param {string} param.layers 必填*   'localhost:global_polygon'
     */
    constructor(url, param) {
        super({
            url: url,
            title: param.title,
            params: {
                'FORMAT': 'image/png',
                'VERSION': '1.1.1',
                'tiled': true,
                "LAYERS": param.layers,
                "exceptions": 'application/vnd.ogc.se_inimage',
            }
        })
    }
};

export default GeoTileLayer;